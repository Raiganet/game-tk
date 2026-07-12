// ============= DATA =============
const AVATARS = ['🦊', '🐼', '🦁', '🐸', '🐵', '🐰', '🐻', '🐯', '🦄', '🐶'];

const WORLDS = [
    { id: 'huruf', name: 'Kota Huruf', icon: '📚', games: ['tebak-huruf'], unlockLevel: 1, xpReward: 10 },
    { id: 'angka', name: 'Pulau Angka', icon: '🔢', games: ['hitung-benda'], unlockLevel: 1, xpReward: 10 },
    { id: 'warna', name: 'Hutan Warna', icon: '🎨', games: ['cocok-warna'], unlockLevel: 2, xpReward: 15 },
    { id: 'bentuk', name: 'Kerajaan Bentuk', icon: '⚪', games: ['tebak-bentuk'], unlockLevel: 3, xpReward: 20 },
    { id: 'sains', name: 'Hutan Sains', icon: '🔬', games: [], unlockLevel: 5, xpReward: 30 },
    { id: 'english', name: 'Planet English', icon: '🌍', games: [], unlockLevel: 7, xpReward: 40 }
];

const ACHIEVEMENTS = [
    { id: 'first_game', name: 'Petualang Pertama', icon: '🎮', desc: 'Mainkan game pertamamu', unlocked: false },
    { id: 'level_5', name: 'Anak Pintar', icon: '⭐', desc: 'Mencapai Level 5', unlocked: false },
    { id: 'streak_3', name: 'Rajin Belajar', icon: '🔥', desc: 'Login 3 hari berturut-turut', unlocked: false },
    { id: 'coins_100', name: 'Anak Kaya', icon: '💰', desc: 'Kumpulkan 100 koin', unlocked: false },
    { id: 'games_10', name: 'Master Game', icon: '🏆', desc: 'Mainkan 10 game', unlocked: false }
];

const SHOP_ITEMS = [
    { id: 'avatar_gold', name: 'Avatar Emas', icon: '✨', price: 50, desc: 'Avatar spesial emas' },
    { id: 'theme_rainbow', name: 'Tema Pelangi', icon: '🌈', price: 100, desc: 'Tema warna-warni' },
    { id: 'xp_boost', name: 'XP Boost', icon: '⚡', price: 75, desc: '2x XP untuk 5 game' }
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const COLORS = [
    { name: 'Merah', hex: '#ef4444' },
    { name: 'Biru', hex: '#3b82f6' },
    { name: 'Hijau', hex: '#10b981' },
    { name: 'Kuning', hex: '#eab308' },
    { name: 'Ungu', hex: '#a855f7' },
    { name: 'Oranye', hex: '#f97316' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Coklat', hex: '#92400e' }
];

const SHAPES = [
    { name: 'Lingkaran', icon: '⚪' },
    { name: 'Kotak', icon: '⬛' },
    { name: 'Segitiga', icon: '🔺' },
    { name: 'Bintang', icon: '⭐' },
    { name: 'Hati', icon: '❤️' }
];

// ============= STATE =============
let player = null;
let currentGame = null;
let gameState = {};

// ============= INIT =============
window.addEventListener('load', () => {
    loadPlayer();
    setTimeout(() => {
        showScreen(player ? 'main' : 'login');
    }, 2000);
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log('SW error:', err));
}

// ============= UTILITY =============
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if (id === 'login') initLogin();
    if (id === 'main') updateMainScreen();
}

function notify(msg, type = 'success') {
    const n = document.getElementById('notification');
    n.textContent = msg;
    n.className = 'notification show ' + type;
    setTimeout(() => n.classList.remove('show'), 3000);
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'id-ID';
        msg.rate = 0.9;
        msg.pitch = 1.2;
        window.speechSynthesis.speak(msg);
    }
}

function savePlayer() {
    localStorage.setItem('edukids_player', JSON.stringify(player));
}

function loadPlayer() {
    const data = localStorage.getItem('edukids_player');
    if (data) player = JSON.parse(data);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============= LOGIN =============
function initLogin() {
    const grid = document.getElementById('avatarGrid');
    grid.innerHTML = '';
    AVATARS.forEach((a, i) => {
        const div = document.createElement('div');
        div.className = 'avatar-option' + (i === 0 ? ' selected' : '');
        div.textContent = a;
        div.onclick = () => {
            document.querySelectorAll('.avatar-option').forEach(x => x.classList.remove('selected'));
            div.classList.add('selected');
        };
        grid.appendChild(div);
    });
}

function login() {
    const name = document.getElementById('nameInput').value.trim();
    const age = parseInt(document.getElementById('ageInput').value);
    const selectedAvatar = document.querySelector('.avatar-option.selected');

    if (!name) return notify('Masukkan nama dulu ya! 📝', 'error');
    if (!age || age < 4 || age > 12) return notify('Usia harus 4-12 tahun!', 'error');

    player = {
        name: name,
        age: age,
        avatar: selectedAvatar ? selectedAvatar.textContent : '🦊',
        xp: 0,
        level: 1,
        coins: 20,
        gamesPlayed: 0,
        achievements: JSON.parse(JSON.stringify(ACHIEVEMENTS)),
        ownedItems: [],
        streak: 1,
        lastLogin: new Date().toDateString(),
        xpMultiplier: 1
    };

    savePlayer();
    notify(`Selamat datang, ${name}! 🎉`);
    speak(`Halo ${name}, selamat datang di EduKids Adventure!`);
    showScreen('main');
}

// ============= MAIN SCREEN =============
function updateMainScreen() {
    if (!player) return;

    document.getElementById('mainAvatar').textContent = player.avatar;
    document.getElementById('playerName').textContent = player.name;
    document.getElementById('playerLevel').textContent = player.level;
    document.getElementById('xpDisplay').textContent = player.xp;
    document.getElementById('coinDisplay').textContent = player.coins;

    const xpNeeded = player.level * 100;
    const percent = Math.min((player.xp / xpNeeded) * 100, 100);
    document.getElementById('xpBar').style.width = percent + '%';
    document.getElementById('xpText').textContent = `${player.xp} / ${xpNeeded} XP`;

    // Render worlds
    const grid = document.getElementById('worldGrid');
    grid.innerHTML = '';
    WORLDS.forEach(w => {
        const locked = player.level < w.unlockLevel;
        const card = document.createElement('div');
        card.className = 'world-card' + (locked ? ' locked' : '');
        card.innerHTML = `
            <div class="world-icon">${w.icon}</div>
            <div class="world-name">${w.name}</div>
            <div class="world-level">${locked ? '🔒 Level ' + w.unlockLevel : '✨ Buka'}</div>
        `;
        if (!locked) card.onclick = () => openWorld(w);
        grid.appendChild(card);
    });

    checkDailyStreak();
}

function openWorld(world) {
    const games = world.games;
    if (games.length === 0) {
        notify('Game di dunia ini belum tersedia 🔜', 'info');
        return;
    }
    startGame(games[0], world);
}

// ============= DAILY REWARD =============
function claimDailyReward() {
    const today = new Date().toDateString();
    if (player.lastLogin === today) {
        notify('Sudah klaim hari ini! Kembali besok 🌅', 'info');
        return;
    }
    player.streak += 1;
    player.lastLogin = today;
    const reward = 10 + player.streak * 5;
    player.coins += reward;
    player.xp += 10;
    savePlayer();
    updateMainScreen();
    notify(`🎁 +${reward} koin & 10 XP! Streak: ${player.streak} hari`);
    checkAchievements();
}

function checkDailyStreak() {
    const today = new Date().toDateString();
    const last = new Date(player.lastLogin);
    const diff = Math.floor((new Date(today) - last) / (1000 * 60 * 60 * 24));
    if (diff > 1) {
        player.streak = 1;
        player.lastLogin = today;
        savePlayer();
    }
}

// ============= GAMES =============
function startGame(gameId, world) {
    currentGame = { id: gameId, world: world };
    gameState = { score: 0, round: 0, maxRounds: 5 };
    showScreen('game');
    document.getElementById('gameTitle').textContent = world.name;
    document.getElementById('gameScore').textContent = '0';

    switch(gameId) {
        case 'tebak-huruf': startLetterGame(); break;
        case 'hitung-benda': startCountGame(); break;
        case 'cocok-warna': startColorGame(); break;
        case 'tebak-bentuk': startShapeGame(); break;
    }
}

function startLetterGame() {
    gameState.round++;
    if (gameState.round > gameState.maxRounds) return endGame();

    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    document.getElementById('gameContent').innerHTML = `
        <h2>Huruf apa ini?</h2>
        <div class="game-question" style="color:white;">${letter}</div>
        <div class="game-options" id="options"></div>
    `;

    speak(`Huruf apa ini?`);

    const options = [letter];
    while (options.length < 4) {
        const r = LETTERS[Math.floor(Math.random() * LETTERS.length)];
        if (!options.includes(r)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    const optDiv = document.getElementById('options');
    options.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = o;
        btn.onclick = () => checkAnswer(btn, o === letter, letter);
        optDiv.appendChild(btn);
    });
}

function startCountGame() {
    gameState.round++;
    if (gameState.round > gameState.maxRounds) return endGame();

    const count = Math.floor(Math.random() * 5) + 1;
    const emojis = ['⭐', '🍎', '🎈', '🐟', '🌸', '🍓'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];

    document.getElementById('gameContent').innerHTML = `
        <h2>Ada berapa benda?</h2>
        <div class="game-question" style="font-size:3rem; letter-spacing:10px;">${emoji.repeat(count)}</div>
        <div class="game-options" id="options"></div>
    `;

    speak(`Ada berapa bendanya?`);

    const options = [count];
    while (options.length < 4) {
        const r = Math.floor(Math.random() * 10) + 1;
        if (!options.includes(r)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    const optDiv = document.getElementById('options');
    options.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = o;
        btn.onclick = () => checkAnswer(btn, o === count, count);
        optDiv.appendChild(btn);
    });
}

function startColorGame() {
    gameState.round++;
    if (gameState.round > gameState.maxRounds) return endGame();

    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    document.getElementById('gameContent').innerHTML = `
        <h2>Apa warna ini?</h2>
        <div class="game-question" style="font-size:10rem; color:${color.hex};">●</div>
        <div class="game-options" id="options"></div>
    `;

    speak(`Apa warna ini?`);

    const options = [color.name];
    while (options.length < 4) {
        const r = COLORS[Math.floor(Math.random() * COLORS.length)].name;
        if (!options.includes(r)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    const optDiv = document.getElementById('options');
    options.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = o;
        btn.onclick = () => checkAnswer(btn, o === color.name, color.name);
        optDiv.appendChild(btn);
    });
}

function startShapeGame() {
    gameState.round++;
    if (gameState.round > gameState.maxRounds) return endGame();

    const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];

    document.getElementById('gameContent').innerHTML = `
        <h2>Bentuk apa ini?</h2>
        <div class="game-question">${shape.icon}</div>
        <div class="game-options" id="options"></div>
    `;

    speak(`Bentuk apa ini?`);

    const options = [shape.name];
    while (options.length < 4) {
        const r = SHAPES[Math.floor(Math.random() * SHAPES.length)].name;
        if (!options.includes(r)) options.push(r);
    }
    options.sort(() => Math.random() - 0.5);

    const optDiv = document.getElementById('options');
    options.forEach(o => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = o;
        btn.onclick = () => checkAnswer(btn, o === shape.name, shape.name);
        optDiv.appendChild(btn);
    });
}

function checkAnswer(btn, correct, answer) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);

    if (correct) {
        btn.classList.add('correct');
        gameState.score++;
        document.getElementById('gameScore').textContent = gameState.score;
        speak(`Benar! Pintar sekali!`);
        notify('✅ Benar! +1 skor', 'success');
        setTimeout(() => {
            switch(currentGame.id) {
                case 'tebak-huruf': startLetterGame(); break;
                case 'hitung-benda': startCountGame(); break;
                case 'cocok-warna': startColorGame(); break;
                case 'tebak-bentuk': startShapeGame(); break;
            }
        }, 1500);
    } else {
        btn.classList.add('wrong');
        speak(`Salah, jawabannya adalah ${answer}`);
        notify(`❌ Salah. Jawabannya: ${answer}`, 'error');
        setTimeout(() => {
            switch(currentGame.id) {
                case 'tebak-huruf': startLetterGame(); break;
                case 'hitung-benda': startCountGame(); break;
                case 'cocok-warna': startColorGame(); break;
                case 'tebak-bentuk': startShapeGame(); break;
            }
        }, 2000);
    }
}

function endGame() {
    const xpGained = gameState.score * (currentGame.world.xpReward || 10) * (player.xpMultiplier || 1);
    const coinsGained = gameState.score * 5;

    player.xp += xpGained;
    player.coins += coinsGained;
    player.gamesPlayed++;

    // Level up
    const xpNeeded = player.level * 100;
    while (player.xp >= xpNeeded) {
        player.xp -= xpNeeded;
        player.level++;
        notify(`🎊 Level Up! Sekarang Level ${player.level}!`, 'success');
        speak(`Selamat! Kamu naik ke level ${player.level}`);
    }

    savePlayer();
    checkAchievements();

    const modal = document.getElementById('modal');
    document.getElementById('modalBody').innerHTML = `
        <h2>🎉 Selesai!</h2>
        <div style="margin:20px 0;">
            <div class="dashboard-card">
                <h3>${gameState.score} / ${gameState.maxRounds}</h3>
                <p>Jawaban Benar</p>
            </div>
            <div class="dashboard-card" style="margin-top:10px;">
                <h3>+${xpGained} XP</h3>
                <p>Pengalaman Didapat</p>
            </div>
            <div class="dashboard-card" style="margin-top:10px;">
                <h3>+${coinsGained} 💰</h3>
                <p>Koin Didapat</p>
            </div>
        </div>
        <button class="btn-primary" onclick="closeModal(); showScreen('main');">Kembali ke Menu</button>
    `;
    modal.classList.add('active');
}

function exitGame() {
    if (confirm('Keluar dari game? Progress akan hilang.')) {
        showScreen('main');
    }
}

// ============= ACHIEVEMENTS =============
function checkAchievements() {
    player.achievements.forEach(a => {
        if (a.unlocked) return;
        let unlock = false;
        switch(a.id) {
            case 'first_game': unlock = player.gamesPlayed >= 1; break;
            case 'level_5': unlock = player.level >= 5; break;
            case 'streak_3': unlock = player.streak >= 3; break;
            case 'coins_100': unlock = player.coins >= 100; break;
            case 'games_10': unlock = player.gamesPlayed >= 10; break;
        }
        if (unlock) {
            a.unlocked = true;
            notify(`🏆 Achievement Unlocked: ${a.name}!`, 'success');
            speak(`Selamat! Kamu mendapatkan pencapaian ${a.name}`);
        }
    });
    savePlayer();
}

function showAchievements() {
    const modal = document.getElementById('modal');
    let html = '<h2>🏆 Pencapaian</h2>';
    player.achievements.forEach(a => {
        html += `
            <div class="achievement-item">
                <div class="achievement-icon">${a.icon}</div>
                <div style="flex:1;">
                    <strong>${a.name}</strong>
                    <div style="font-size:0.9rem; opacity:0.7;">${a.desc}</div>
                    <span class="${a.unlocked ? 'unlocked-badge' : 'locked-badge'}">
                        ${a.unlocked ? '✅ Terbuka' : '🔒 Terkunci'}
                    </span>
                </div>
            </div>
        `;
    });
    document.getElementById('modalBody').innerHTML = html;
    modal.classList.add('active');
}

// ============= SHOP =============
function showShop() {
    const modal = document.getElementById('modal');
    let html = `<h2>🛒 Toko</h2><p>💰 Koin kamu: ${player.coins}</p>`;
    SHOP_ITEMS.forEach(item => {
        const owned = player.ownedItems.includes(item.id);
        const canBuy = player.coins >= item.price && !owned;
        html += `
            <div class="shop-item">
                <div class="shop-icon">${item.icon}</div>
                <div style="flex:1;">
                    <strong>${item.name}</strong>
                    <div style="font-size:0.9rem; opacity:0.7;">${item.desc}</div>
                    <div style="font-size:0.9rem;">💰 ${item.price} koin</div>
                </div>
                ${owned ? '<span class="unlocked-badge">Dimiliki</span>' :
                  `<button class="btn-primary" style="padding:8px 15px; font-size:0.9rem; width:auto; margin:0;" 
                    ${!canBuy ? 'disabled style="opacity:0.5;"' : ''} 
                    onclick="buyItem('${item.id}')">Beli</button>`}
            </div>
        `;
    });
    document.getElementById('modalBody').innerHTML = html;
    modal.classList.add('active');
}

function buyItem(id) {
    const item = SHOP_ITEMS.find(i => i.id === id);
    if (player.coins < item.price) return;
    player.coins -= item.price;
    player.ownedItems.push(item.id);
    if (item.id === 'xp_boost') player.xpMultiplier = 2;
    savePlayer();
    updateMainScreen();
    notify(`✅ Berhasil membeli ${item.name}!`);
    showShop();
}

// ============= PARENT DASHBOARD =============
function showParentDashboard() {
    const modal = document.getElementById('modal');
    document.getElementById('modalBody').innerHTML = `
        <h2>👨‍👩‍👧 Dashboard Orang Tua</h2>
        <p style="opacity:0.7;">Progres belajar ${player.name}</p>
        <div class="dashboard-grid">
            <div class="dashboard-card">
                <h3>⭐ ${player.xp}</h3>
                <p>Total XP</p>
            </div>
            <div class="dashboard-card">
                <h3>📊 Level ${player.level}</h3>
                <p>Level Saat Ini</p>
            </div>
            <div class="dashboard-card">
                <h3>🎮 ${player.gamesPlayed}</h3>
                <p>Game Dimainkan</p>
            </div>
            <div class="dashboard-card">
                <h3>🔥 ${player.streak}</h3>
                <p>Streak Login</p>
            </div>
            <div class="dashboard-card">
                <h3>💰 ${player.coins}</h3>
                <p>Koin Terkumpul</p>
            </div>
            <div class="dashboard-card">
                <h3>🏆 ${player.achievements.filter(a => a.unlocked).length}</h3>
                <p>Pencapaian</p>
            </div>
        </div>
        <div style="margin-top:20px;">
            <h3>📚 Rekomendasi:</h3>
            <p>${player.level < 3 ? 'Fokus pada Kota Huruf dan Pulau Angka untuk dasar yang kuat.' : 
                player.level < 5 ? 'Coba dunia baru seperti Hutan Warna dan Kerajaan Bentuk!' : 
                'Anak sudah siap untuk materi yang lebih kompleks.'}</p>
        </div>
        <button class="btn-primary" style="background:var(--danger);" onclick="resetProgress()">🔄 Reset Progress</button>
    `;
    modal.classList.add('active');
}

function resetProgress() {
    if (confirm('Yakin ingin reset? Semua progress akan hilang!')) {
        localStorage.removeItem('edukids_player');
        player = null;
        closeModal();
        showScreen('login');
    }
}

// ============= MODAL & SETTINGS =============
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function toggleSettings() {
    const modal = document.getElementById('modal');
    document.getElementById('modalBody').innerHTML = `
        <h2>⚙️ Pengaturan</h2>
        <div class="achievement-item">
            <div class="achievement-icon">🌙</div>
            <div style="flex:1;"><strong>Mode Gelap</strong></div>
            <button class="btn-primary" style="padding:8px 15px; width:auto; margin:0;" onclick="toggleDarkMode()">Toggle</button>
        </div>
        <div class="achievement-item">
            <div class="achievement-icon">🔊</div>
            <div style="flex:1;"><strong>Suara</strong></div>
            <button class="btn-primary" style="padding:8px 15px; width:auto; margin:0;" onclick="speak('Halo!')">Test</button>
        </div>
        <div class="achievement-item">
            <div class="achievement-icon">📱</div>
            <div style="flex:1;"><strong>Install Aplikasi</strong></div>
            <button class="btn-primary" style="padding:8px 15px; width:auto; margin:0;" onclick="installApp()">Install</button>
        </div>
        <button class="btn-primary" style="background:var(--danger); margin-top:20px;" onclick="logout()">🚪 Keluar</button>
    `;
    modal.classList.add('active');
}

function logout() {
    if (confirm('Keluar dari akun?')) {
        localStorage.removeItem('edukids_player');
        player = null;
        closeModal();
        showScreen('login');
    }
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(r => {
            if (r.outcome === 'accepted') notify('Aplikasi berhasil diinstall! 🎉');
            deferredPrompt = null;
        });
    } else {
        notify('Gunakan menu browser untuk install 📱', 'info');
    }
}
