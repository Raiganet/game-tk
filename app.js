// ========================================
// EDUKIDS ADVENTURE - ULTIMATE ENGINE
// ========================================

// ============= DATA =============
const AVATARS = ['🦊', '🐼', '🦁', '🐸', '🐵', '🐰', '🐻', '🐯', '🦄', '🐶'];
const PETS = [
    { id: 'cat', icon: '🐱', name: 'Kitty', price: 0, bonus: 5 },
    { id: 'dog', icon: '🐶', name: 'Puppy', price: 50, bonus: 8 },
    { id: 'panda', icon: '🐼', name: 'Pandy', price: 100, bonus: 12 },
    { id: 'penguin', icon: '🐧', name: 'Pingu', price: 150, bonus: 15 },
    { id: 'unicorn', icon: '🦄', name: 'Uni', price: 300, bonus: 25 },
    { id: 'dino', icon: '🦖', name: 'Dino', price: 500, bonus: 40 }
];

const WORLDS = [
    { id: 'huruf', name: 'Kota Huruf', icon: '📚', theme: 'theme-sky', 
      games: ['tebak-huruf', 'tangkap-huruf', 'susun-kata'], 
      boss: { name: 'Monster Huruf', icon: '👹', hp: 50 },
      unlockLevel: 1, color: '#6366f1' },
    { id: 'angka', name: 'Pulau Angka', icon: '🔢', theme: 'theme-ocean', 
      games: ['hitung-benda', 'balap-math', 'tangkap-ikan'], 
      boss: { name: 'Robot Math', icon: '🤖', hp: 60 },
      unlockLevel: 2, color: '#3b82f6' },
    { id: 'warna', name: 'Hutan Warna', icon: '🎨', theme: 'theme-forest', 
      games: ['cocok-warna', 'mewarnai', 'tebak-warna'], 
      boss: { name: 'Naga Warna', icon: '🐉', hp: 70 },
      unlockLevel: 3, color: '#10b981' },
    { id: 'bentuk', name: 'Kerajaan Bentuk', icon: '⚪', theme: 'theme-mountain', 
      games: ['tebak-bentuk', 'susun-balok', 'puzzle-bentuk'], 
      boss: { name: 'Raja Kristal', icon: '💎', hp: 80 },
      unlockLevel: 4, color: '#8b5cf6' },
    { id: 'sains', name: 'Hutan Sains', icon: '🔬', theme: 'theme-forest', 
      games: ['quiz-sains', 'tebak-hewan', 'memory-card'], 
      boss: { name: 'Monster Lab', icon: '🧪', hp: 90 },
      unlockLevel: 6, color: '#14b8a6' },
    { id: 'english', name: 'Planet English', icon: '🌍', theme: 'theme-space', 
      games: ['quiz-english', 'puzzle-planet', 'vocab-match'], 
      boss: { name: 'Alien English', icon: '👽', hp: 100 },
      unlockLevel: 8, color: '#ec4899' }
];

const MINI_GAMES_DATA = {
    'tebak-huruf': {
        title: 'Tebak Huruf',
        prompt: 'Huruf apa ini?',
        generator: () => {
            const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            const answer = letters[Math.floor(Math.random() * letters.length)];
            const options = [answer];
            while (options.length < 4) {
                const r = letters[Math.floor(Math.random() * letters.length)];
                if (!options.includes(r)) options.push(r);
            }
            return { question: answer, options: options.sort(() => Math.random() - 0.5), answer };
        }
    },
    'tangkap-huruf': {
        title: 'Tangkap Huruf',
        prompt: 'Pilih huruf vokal!',
        generator: () => {
            const vowels = ['A', 'I', 'U', 'E', 'O'];
            const answer = vowels[Math.floor(Math.random() * vowels.length)];
            const consonants = 'BCDFGHJKLMNPQRSTVWXYZ'.split('');
            const options = [answer];
            while (options.length < 4) {
                const r = consonants[Math.floor(Math.random() * consonants.length)];
                if (!options.includes(r)) options.push(r);
            }
            return { question: '✨' + answer + '✨', options: options.sort(() => Math.random() - 0.5), answer };
        }
    },
    'susun-kata': {
        title: 'Susun Kata',
        prompt: 'Kata apa ini?',
        generator: () => {
            const words = [
                { display: '🍎', word: 'APEL' },
                { display: '🐟', word: 'IKAN' },
                { display: '📚', word: 'BUKU' },
                { display: '🏠', word: 'RUMAH' },
                { display: '🚗', word: 'MOBIL' }
            ];
            const w = words[Math.floor(Math.random() * words.length)];
            const distractors = ['BOLA', 'KUCING', 'PENSIL', 'SEPEDA'].filter(x => x !== w.word);
            const options = [w.word, ...distractors.slice(0, 3)].sort(() => Math.random() - 0.5);
            return { question: w.display, options, answer: w.word };
        }
    },
    'hitung-benda': {
        title: 'Hitung Benda',
        prompt: 'Ada berapa benda?',
        generator: () => {
            const count = Math.floor(Math.random() * 5) + 1;
            const emojis = ['⭐', '🍎', '🎈', '🐟', '🌸', '🍓', '🍭', '🎁'];
            const emoji = emojis[Math.floor(Math.random() * emojis.length)];
            const options = [count];
            while (options.length < 4) {
                const r = Math.floor(Math.random() * 8) + 1;
                if (!options.includes(r)) options.push(r);
            }
            return { 
                question: emoji.repeat(count), 
                questionStyle: 'font-size:40px; letter-spacing:8px;',
                options: options.sort(() => Math.random() - 0.5).map(String), 
                answer: String(count) 
            };
        }
    },
    'balap-math': {
        title: 'Balap Matematika',
        prompt: 'Hitung cepat!',
        generator: () => {
            const a = Math.floor(Math.random() * 5) + 1;
            const b = Math.floor(Math.random() * 5) + 1;
            const ops = ['+', '-'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            let answer;
            if (op === '+') answer = a + b;
            else {
                answer = a > b ? a - b : b - a;
            }
            const display = op === '+' ? `${a} + ${b}` : `${Math.max(a,b)} - ${Math.min(a,b)}`;
            const options = [answer];
            while (options.length < 4) {
                const r = Math.floor(Math.random() * 15);
                if (!options.includes(r)) options.push(r);
            }
            return { question: display, options: options.sort(() => Math.random() - 0.5).map(String), answer: String(answer) };
        }
    },
    'tangkap-ikan': {
        title: 'Tangkap Ikan',
        prompt: 'Ikan apa ini?',
        generator: () => {
            const fish = ['🐠', '🐟', '🐡', '🦈', '🐳'];
            const names = ['Ikan Tropis', 'Ikan Biasa', 'Ikan Buntal', 'Hiu', 'Paus'];
            const idx = Math.floor(Math.random() * fish.length);
            const options = [names[idx]];
            const allNames = names.filter(n => n !== names[idx]);
            while (options.length < 4) {
                const r = allNames[Math.floor(Math.random() * allNames.length)];
                if (!options.includes(r)) options.push(r);
            }
            return { question: fish[idx], options: options.sort(() => Math.random() - 0.5), answer: names[idx] };
        }
    },
    'cocok-warna': {
        title: 'Cocokkan Warna',
        prompt: 'Apa warna ini?',
        generator: () => {
            const colors = [
                { name: 'Merah', hex: '#ef4444' },
                { name: 'Biru', hex: '#3b82f6' },
                { name: 'Hijau', hex: '#10b981' },
                { name: 'Kuning', hex: '#eab308' },
                { name: 'Ungu', hex: '#a855f7' },
                { name: 'Oranye', hex: '#f97316' },
                { name: 'Pink', hex: '#ec4899' }
            ];
            const c = colors[Math.floor(Math.random() * colors.length)];
            const options = [c.name];
            const others = colors.filter(x => x.name !== c.name);
            while (options.length < 4) {
                const r = others[Math.floor(Math.random() * others.length)].name;
                if (!options.includes(r)) options.push(r);
            }
            return { 
                question: '●', 
                questionStyle: `color:${c.hex}; font-size:120px;`,
                options: options.sort(() => Math.random() - 0.5), 
                answer: c.name 
            };
        }
    },
    'mewarnai': {
        title: 'Mewarnai',
        prompt: 'Warna apa yang cocok untuk matahari?',
        generator: () => {
            const items = [
                { display: '☀️', answer: 'Kuning' },
                { display: '🌊', answer: 'Biru' },
                { display: '🌿', answer: 'Hijau' },
                { display: '🔥', answer: 'Merah' }
            ];
            const item = items[Math.floor(Math.random() * items.length)];
            const allColors = ['Kuning', 'Biru', 'Hijau', 'Merah', 'Ungu', 'Oranye'];
            const options = [item.answer];
            while (options.length < 4) {
                const r = allColors[Math.floor(Math.random() * allColors.length)];
                if (!options.includes(r)) options.push(r);
            }
            return { question: item.display, options: options.sort(() => Math.random() - 0.5), answer: item.answer };
        }
    },
    'tebak-warna': {
        title: 'Tebak Warna',
        prompt: 'Warna apa ini?',
        generator: () => {
            const colors = [
                { name: 'Merah', hex: '#ef4444' },
                { name: 'Biru', hex: '#3b82f6' },
                { name: 'Hijau', hex: '#10b981' }
            ];
            const c = colors[Math.floor(Math.random() * colors.length)];
            const options = [c.name, ...colors.filter(x => x.name !== c.name).map(x => x.name), 'Hitam'].slice(0,4).sort(() => Math.random() - 0.5);
            return { 
                question: '■', 
                questionStyle: `color:${c.hex}; font-size:120px;`,
                options, answer: c.name 
            };
        }
    },
    'tebak-bentuk': {
        title: 'Tebak Bentuk',
        prompt: 'Bentuk apa ini?',
        generator: () => {
            const shapes = [
                { icon: '⚪', name: 'Lingkaran' },
                { icon: '⬛', name: 'Kotak' },
                { icon: '🔺', name: 'Segitiga' },
                { icon: '⭐', name: 'Bintang' },
                { icon: '❤️', name: 'Hati' }
            ];
            const s = shapes[Math.floor(Math.random() * shapes.length)];
            const options = [s.name];
            while (options.length < 4) {
                const r = shapes[Math.floor(Math.random() * shapes.length)].name;
                if (!options.includes(r)) options.push(r);
            }
            return { question: s.icon, options: options.sort(() => Math.random() - 0.5), answer: s.name };
        }
    },
    'susun-balok': {
        title: 'Susun Balok',
        prompt: 'Berapa total balok?',
        generator: () => {
            const a = Math.floor(Math.random() * 3) + 1;
            const b = Math.floor(Math.random() * 3) + 1;
            const answer = a + b;
            const options = [answer];
            while (options.length < 4) {
                const r = Math.floor(Math.random() * 8) + 1;
                if (!options.includes(r)) options.push(r);
            }
            return { 
                question: '🟦'.repeat(a) + ' + ' + '🟥'.repeat(b),
                questionStyle: 'font-size:36px;',
                options: options.sort(() => Math.random() - 0.5).map(String), 
                answer: String(answer) 
            };
        }
    },
    'puzzle-bentuk': {
        title: 'Puzzle Bentuk',
        prompt: 'Bentuk mana yang hilang?',
        generator: () => {
            const shapes = ['⚪', '⬛', '🔺', '⭐'];
            const answer = shapes[Math.floor(Math.random() * shapes.length)];
            const options = [...shapes].sort(() => Math.random() - 0.5);
            return { question: '⚪ ⬛ 🔺 ?', options, answer };
        }
    },
    'quiz-sains': {
        title: 'Quiz Sains',
        prompt: 'Jawab pertanyaan ini!',
        generator: () => {
            const questions = [
                { q: '🌞 Sumber energi utama bumi?', opts: ['Matahari', 'Bulan', 'Bintang', 'Planet'], a: 'Matahari' },
                { q: '🌊 Air membeku pada suhu?', opts: ['0°C', '100°C', '-10°C', '50°C'], a: '0°C' },
                { q: '🌳 Tanaman bernapas dengan?', opts: ['Daun', 'Akar', 'Batang', 'Bunga'], a: 'Daun' },
                { q: '🌙 Benda langit di malam hari?', opts: ['Bulan', 'Matahari', 'Pelangi', 'Awan'], a: 'Bulan' }
            ];
            const q = questions[Math.floor(Math.random() * questions.length)];
            return { question: q.q, options: q.opts, answer: q.a };
        }
    },
    'tebak-hewan': {
        title: 'Tebak Hewan',
        prompt: 'Hewan apa ini?',
        generator: () => {
            const animals = [
                { icon: '🦁', name: 'Singa' },
                { icon: '🐘', name: 'Gajah' },
                { icon: '🦒', name: 'Jerapah' },
                { icon: '🐯', name: 'Harimau' },
                { icon: '🦓', name: 'Zebra' }
            ];
            const a = animals[Math.floor(Math.random() * animals.length)];
            const options = [a.name];
            while (options.length < 4) {
                const r = animals[Math.floor(Math.random() * animals.length)].name;
                if (!options.includes(r)) options.push(r);
            }
            return { question: a.icon, options: options.sort(() => Math.random() - 0.5), answer: a.name };
        }
    },
    'memory-card': {
        title: 'Memory Card',
        prompt: 'Cari pasangannya!',
        generator: () => {
            const items = ['🐶', '🐱', '🐰', '🦊'];
            const answer = items[Math.floor(Math.random() * items.length)];
            const options = [...items].sort(() => Math.random() - 0.5);
            return { question: answer, options, answer };
        }
    },
    'quiz-english': {
        title: 'Quiz English',
        prompt: 'What is this in English?',
        generator: () => {
            const items = [
                { id: '🍎', en: 'Apple' },
                { id: '🐶', en: 'Dog' },
                { id: '🐱', en: 'Cat' },
                { id: '📚', en: 'Book' },
                { id: '🏠', en: 'House' }
            ];
            const item = items[Math.floor(Math.random() * items.length)];
            const others = items.filter(x => x.en !== item.en).map(x => x.en);
            const options = [item.en, ...others.slice(0, 3)].sort(() => Math.random() - 0.5);
            return { question: item.id, options, answer: item.en };
        }
    },
    'puzzle-planet': {
        title: 'Puzzle Planet',
        prompt: 'Planet apa ini?',
        generator: () => {
            const planets = [
                { icon: '🌍', name: 'Bumi' },
                { icon: '🌙', name: 'Bulan' },
                { icon: '☀️', name: 'Matahari' },
                { icon: '⭐', name: 'Bintang' }
            ];
            const p = planets[Math.floor(Math.random() * planets.length)];
            const options = [p.name];
            while (options.length < 4) {
                const r = planets[Math.floor(Math.random() * planets.length)].name;
                if (!options.includes(r)) options.push(r);
            }
            return { question: p.icon, options: options.sort(() => Math.random() - 0.5), answer: p.name };
        }
    },
    'vocab-match': {
        title: 'Vocab Match',
        prompt: 'Match the word!',
        generator: () => {
            const pairs = [
                { en: 'One', id: 'Satu' },
                { en: 'Two', id: 'Dua' },
                { en: 'Three', id: 'Tiga' },
                { en: 'Red', id: 'Merah' },
                { en: 'Blue', id: 'Biru' }
            ];
            const p = pairs[Math.floor(Math.random() * pairs.length)];
            const options = [p.id];
            while (options.length < 4) {
                const r = pairs[Math.floor(Math.random() * pairs.length)].id;
                if (!options.includes(r)) options.push(r);
            }
            return { question: p.en, options: options.sort(() => Math.random() - 0.5), answer: p.id };
        }
    }
};

const ACHIEVEMENTS = [];
// Generate 100 achievements
const achieveTemplates = [
    { cat: 'Huruf', icon: '📚', levels: [5, 10, 20, 50, 100] },
    { cat: 'Angka', icon: '🔢', levels: [5, 10, 20, 50, 100] },
    { cat: 'Warna', icon: '🎨', levels: [5, 10, 20, 50, 100] },
    { cat: 'Bentuk', icon: '⚪', levels: [5, 10, 20, 50, 100] },
    { cat: 'Sains', icon: '🔬', levels: [5, 10, 20, 50, 100] },
    { cat: 'English', icon: '🌍', levels: [5, 10, 20, 50, 100] }
];
achieveTemplates.forEach(t => {
    t.levels.forEach((l, i) => {
        ACHIEVEMENTS.push({
            id: `${t.cat.toLowerCase()}_${l}`,
            name: `Master ${t.cat} ${i+1}`,
            icon: t.icon,
            desc: `Selesaikan ${l} game ${t.cat}`,
            target: l,
            type: `games_${t.cat.toLowerCase()}`,
            unlocked: false
        });
    });
});
// Add more achievements
const extraAchieves = [
    { id: 'first_login', name: 'Petualang Pemula', icon: '👋', desc: 'Login pertama kali', unlocked: false },
    { id: 'level_5', name: 'Anak Pintar', icon: '⭐', desc: 'Mencapai Level 5', unlocked: false },
    { id: 'level_10', name: 'Anak Hebat', icon: '🌟', desc: 'Mencapai Level 10', unlocked: false },
    { id: 'level_20', name: 'Anak Jenius', icon: '💫', desc: 'Mencapai Level 20', unlocked: false },
    { id: 'streak_7', name: 'Seminggu Penuh', icon: '🔥', desc: 'Login 7 hari berturut', unlocked: false },
    { id: 'streak_30', name: 'Sebulan Setia', icon: '🔥', desc: 'Login 30 hari berturut', unlocked: false },
    { id: 'coins_500', name: 'Kaya Raya', icon: '💰', desc: 'Kumpulkan 500 koin', unlocked: false },
    { id: 'coins_1000', name: 'Jutawan', icon: '💎', desc: 'Kumpulkan 1000 koin', unlocked: false },
    { id: 'games_50', name: 'Gamer Pro', icon: '🎮', desc: 'Mainkan 50 game', unlocked: false },
    { id: 'games_100', name: 'Gamer Master', icon: '🏆', desc: 'Mainkan 100 game', unlocked: false },
    { id: 'all_worlds', name: 'Penjelajah', icon: '🗺️', desc: 'Kunjungi semua dunia', unlocked: false },
    { id: 'perfect_game', name: 'Sempurna', icon: '🎯', desc: 'Skor 5/5 dalam satu game', unlocked: false },
    { id: 'boss_1', name: 'Pemburu Boss', icon: '👹', desc: 'Kalahkan boss pertama', unlocked: false },
    { id: 'all_bosses', name: 'Boss Slayer', icon: '⚔️', desc: 'Kalahkan semua boss', unlocked: false },
    { id: 'all_pets', name: 'Kolektor Pet', icon: '🐾', desc: 'Miliki semua pet', unlocked: false },
    { id: 'daily_30', name: 'Rajin Belajar', icon: '📅', desc: 'Selesaikan 30 misi harian', unlocked: false }
];
ACHIEVEMENTS.push(...extraAchieves);

const SHOP_ITEMS = [
    // Avatar
    { id: 'avatar_crown', cat: 'avatar', name: 'Mahkota Emas', icon: '👑', price: 100, desc: 'Avatar mahkota raja' },
    { id: 'avatar_wizard', cat: 'avatar', name: 'Penyihir', icon: '🧙', price: 150, desc: 'Avatar penyihir ajaib' },
    { id: 'avatar_robot', cat: 'avatar', name: 'Robot', icon: '🤖', price: 200, desc: 'Avatar robot canggih' },
    { id: 'avatar_astronaut', cat: 'avatar', name: 'Astronaut', icon: '👨‍🚀', price: 300, desc: 'Avatar penjelajah luar angkasa' },
    // Pet
    { id: 'pet_dog', cat: 'pet', name: 'Puppy', icon: '🐶', price: 50, desc: 'Pet anjing lucu' },
    { id: 'pet_panda', cat: 'pet', name: 'Pandy', icon: '🐼', price: 100, desc: 'Pet panda imut' },
    { id: 'pet_penguin', cat: 'pet', name: 'Pingu', icon: '🐧', price: 150, desc: 'Pet penguin' },
    { id: 'pet_unicorn', cat: 'pet', name: 'Uni', icon: '🦄', price: 300, desc: 'Pet unicorn ajaib' },
    { id: 'pet_dino', cat: 'pet', name: 'Dino', icon: '🦖', price: 500, desc: 'Pet dinosaurus' },
    // Theme
    { id: 'theme_rainbow', cat: 'theme', name: 'Tema Pelangi', icon: '🌈', price: 200, desc: 'Background pelangi' },
    { id: 'theme_galaxy', cat: 'theme', name: 'Tema Galaksi', icon: '🌌', price: 250, desc: 'Background galaksi' },
    { id: 'theme_candy', cat: 'theme', name: 'Tema Permen', icon: '🍭', price: 150, desc: 'Background permen' },
    // Boost
    { id: 'boost_xp', cat: 'boost', name: 'XP Boost', icon: '⚡', price: 75, desc: '2x XP untuk 5 game' },
    { id: 'boost_coin', cat: 'boost', name: 'Coin Boost', icon: '💰', price: 75, desc: '2x Koin untuk 5 game' },
    { id: 'boost_energy', cat: 'boost', name: 'Energy Refill', icon: '❤️', price: 50, desc: 'Refill energi penuh' }
];

const DAILY_MISSIONS = [
    { id: 'play_3', title: 'Mainkan 3 Game', icon: '🎮', target: 3, reward: 20 },
    { id: 'correct_10', title: '10 Jawaban Benar', icon: '✅', target: 10, reward: 30 },
    { id: 'visit_2', title: 'Kunjungi 2 Dunia', icon: '🗺️', target: 2, reward: 25 },
    { id: 'earn_50', title: 'Kumpulkan 50 XP', icon: '⭐', target: 50, reward: 40 },
    { id: 'boss_1', title: 'Tantang 1 Boss', icon: '👹', target: 1, reward: 50 }
];

const MASCOT_MESSAGES = {
    greeting: [
        'Halo {name}! 👋 Siap belajar hari ini?',
        'Selamat datang {name}! Ayo bermain! 🎉',
        'Hai {name}! Aku rindu kamu! 💕',
        '{name}! Mari kita petualangan! 🗺️'
    ],
    levelUp: [
        'HEBAT! Kamu naik level! 🎊',
        'LUAR BIASA! Level up! ⭐',
        'KEREN! Makin pintar! 🚀',
        'AMAZING! Level baru! 💫'
    ],
    correct: [
        'Benar! Pintar sekali! 🌟',
        'Tepat! Hebat! ✨',
        'Sempurna! Lanjutkan! 💪',
        'Wow! Kamu pintar! 🎯'
    ],
    wrong: [
        'Jangan menyerah! 💪',
        'Coba lagi ya! 🌈',
        'Hampir benar! 🤔',
        'Kamu pasti bisa! ⭐'
    ],
    idle: [
        'Ayo main game! 🎮',
        'Dunia mana mau dijelajahi? 🗺️',
        'Kumpulkan XP untuk naik level! ⭐',
        'Pet-mu menunggumu! 🐾',
        'Ada misi harian baru! 📋'
    ],
    chest: [
        'Chest-mu siap dibuka! 🎁',
        'Hadiah menantimu! 💝'
    ]
};

// ============= STATE =============
let state = {
    player: null,
    currentGame: null,
    currentWorld: null,
    gameState: {},
    bossState: {},
    musicEnabled: false,
    idleTimer: null
};

// ============= INIT =============
window.addEventListener('load', () => {
    loadState();
    showSplash();
});

function showSplash() {
    setTimeout(() => {
        document.getElementById('splash').classList.remove('active');
        if (state.player) {
            showScreen('main');
            updateMainScreen();
            startIdleMessages();
        } else {
            showScreen('login');
            initLogin();
        }
    }, 2500);
}

// ============= PWA & SERVICE WORKER =============
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => console.log('SW:', err));
}

// ============= STORAGE =============
function saveState() {
    if (state.player) {
        localStorage.setItem('edukids_state', JSON.stringify({
            player: state.player,
            missions: state.currentMissions,
            lastMissionDate: state.lastMissionDate,
            dailyChest: state.dailyChestTime,
            weeklyStats: state.weeklyStats
        }));
    }
}

function loadState() {
    const data = localStorage.getItem('edukids_state');
    if (data) {
        const parsed = JSON.parse(data);
        state.player = parsed.player;
        state.currentMissions = parsed.missions || [];
        state.lastMissionDate = parsed.lastMissionDate;
        state.dailyChestTime = parsed.dailyChest;
        state.weeklyStats = parsed.weeklyStats || [0,0,0,0,0,0,0];
        
        // Check daily reset
        const today = new Date().toDateString();
        if (state.lastMissionDate !== today) {
            resetDailyMissions();
        }
    }
}

function resetDailyMissions() {
    state.currentMissions = DAILY_MISSIONS.map(m => ({
        ...m,
        progress: 0,
        completed: false,
        claimed: false
    }));
    state.lastMissionDate = new Date().toDateString();
    saveState();
}

// ============= NAVIGATION =============
function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Update bottom nav
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.toggle('active', n.dataset.screen === id);
    });
    
    // Screen specific init
    if (id === 'shop') renderShop();
    if (id === 'pet') renderPet();
    if (id === 'collection') renderCollection();
    if (id === 'achievements') renderAchievements();
    if (id === 'profile') renderProfile();
    if (id === 'main') updateMainScreen();
}

// Bottom nav
document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.screen));
});

// ============= THEME =============
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const dark = document.body.classList.contains('dark-mode');
    localStorage.setItem('edukids_theme', dark ? 'dark' : 'light');
    document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
    document.getElementById('themeText').textContent = dark ? 'Mode Terang' : 'Mode Gelap';
}

if (localStorage.getItem('edukids_theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (document.getElementById('themeIcon')) {
        document.getElementById('themeIcon').textContent = '☀️';
        document.getElementById('themeText').textContent = 'Mode Terang';
    }
}

// ============= SOUND & SPEECH =============
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'id-ID';
        msg.rate = 0.95;
        msg.pitch = 1.2;
        window.speechSynthesis.speak(msg);
    }
}

function playSound(type) {
    // Visual feedback instead of actual audio (would need Web Audio API)
    if (type === 'success') createParticles(window.innerWidth/2, window.innerHeight/2, 15);
    if (type === 'levelup') { createConfetti(80); createFireworks(5); }
    if (type === 'coin') createParticles(window.innerWidth/2, 100, 10);
    if (type === 'chest') { createConfetti(50); createFireworks(3); }
}

// ============= EFFECTS =============
function createParticles(x, y, count = 20) {
    const container = document.getElementById('particlesContainer');
    const colors = ['#fbbf24', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#a855f7'];
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / count;
        const distance = 80 + Math.random() * 120;
        p.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        p.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        container.appendChild(p);
        setTimeout(() => p.remove(), 1500);
    }
}

function createConfetti(count = 50) {
    const container = document.getElementById('confettiContainer');
    const colors = ['#fbbf24', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#a855f7', '#f97316'];
    for (let i = 0; i < count; i++) {
        const c = document.createElement('div');
        c.className = 'confetti';
        c.style.left = Math.random() * 100 + '%';
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.animationDuration = (2 + Math.random() * 2) + 's';
        c.style.animationDelay = Math.random() * 0.5 + 's';
        if (Math.random() > 0.5) c.style.borderRadius = '50%';
        container.appendChild(c);
        setTimeout(() => c.remove(), 4000);
    }
}

function createFireworks(count = 5) {
    const container = document.getElementById('fireworksContainer');
    const colors = ['#fbbf24', '#ef4444', '#10b981', '#3b82f6', '#ec4899'];
    for (let f = 0; f < count; f++) {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * window.innerHeight * 0.6;
        setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                const p = document.createElement('div');
                p.className = 'firework';
                p.style.left = centerX + 'px';
                p.style.top = centerY + 'px';
                p.style.background = colors[Math.floor(Math.random() * colors.length)];
                const angle = (Math.PI * 2 * i) / 30;
                const distance = 50 + Math.random() * 100;
                p.style.setProperty('--fx', Math.cos(angle) * distance + 'px');
                p.style.setProperty('--fy', Math.sin(angle) * distance + 'px');
                container.appendChild(p);
                setTimeout(() => p.remove(), 1500);
            }
        }, f * 300);
    }
}

// ============= NOTIFICATION =============
function notify(msg, type = 'success') {
    const n = document.getElementById('notification');
    n.textContent = msg;
    n.className = 'notification show ' + type;
    setTimeout(() => n.classList.remove('show'), 3000);
}

// ============= MASCOT =============
let mascotTimeout;
function showMascotMessage(msg, duration = 4000) {
    const bubble = document.getElementById('mascotBubble');
    const text = document.getElementById('mascotText');
    text.innerHTML = msg.replace('{name}', state.player?.name || 'teman');
    bubble.classList.add('show');
    clearTimeout(mascotTimeout);
    mascotTimeout = setTimeout(() => bubble.classList.remove('show'), duration);
}

function mascotSpeak() {
    const msgs = MASCOT_MESSAGES.greeting;
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    showMascotMessage(msg);
    speak(msg.replace('{name}', state.player?.name || 'teman'));
}

function startIdleMessages() {
    if (state.idleTimer) clearInterval(state.idleTimer);
    state.idleTimer = setInterval(() => {
        if (document.getElementById('main').classList.contains('active')) {
            const msgs = MASCOT_MESSAGES.idle;
            const msg = msgs[Math.floor(Math.random() * msgs.length)];
            showMascotMessage(msg);
        }
    }, 20000);
}

// ============= LOGIN =============
function initLogin() {
    const avatarSel = document.getElementById('avatarSelector');
    avatarSel.innerHTML = '';
    AVATARS.forEach((a, i) => {
        const div = document.createElement('div');
        div.className = 'selector-item' + (i === 0 ? ' selected' : '');
        div.textContent = a;
        div.onclick = () => {
            document.querySelectorAll('#avatarSelector .selector-item').forEach(x => x.classList.remove('selected'));
            div.classList.add('selected');
        };
        avatarSel.appendChild(div);
    });
    
    const petSel = document.getElementById('petSelector');
    petSel.innerHTML = '';
    PETS.forEach((p, i) => {
        const div = document.createElement('div');
        div.className = 'selector-item' + (i === 0 ? ' selected' : '');
        div.textContent = p.icon;
        div.onclick = () => {
            document.querySelectorAll('#petSelector .selector-item').forEach(x => x.classList.remove('selected'));
            div.classList.add('selected');
        };
        petSel.appendChild(div);
    });
}

function login() {
    const name = document.getElementById('nameInput').value.trim();
    const age = parseInt(document.getElementById('ageInput').value);
    const selectedAvatar = document.querySelector('#avatarSelector .selector-item.selected');
    const selectedPet = document.querySelector('#petSelector .selector-item.selected');

    if (!name) return notify('Masukkan nama dulu ya! 📝', 'error');
    if (!age || age < 4 || age > 12) return notify('Usia harus 4-12 tahun!', 'error');

    state.player = {
        name, age,
        avatar: selectedAvatar?.textContent || '🦊',
        pet: selectedPet?.textContent || '🐱',
        xp: 0, level: 1,
        coins: 50,
        energy: 5, maxEnergy: 5,
        gamesPlayed: 0,
        correctAnswers: 0,
        achievements: ACHIEVEMENTS.map(a => ({...a})),
        ownedItems: ['avatar_fox', 'pet_cat'],
        streak: 1,
        lastLogin: new Date().toDateString(),
        xpMultiplier: 1, coinMultiplier: 1,
        boostsUsed: 0,
        bossesDefeated: [],
        worldsVisited: [],
        collections: {
            letters: [], numbers: [], colors: [], shapes: [], animals: [], planets: []
        },
        starsPerWorld: {},
        dailyMissionsCompleted: 0,
        totalStars: 0
    };

    resetDailyMissions();
    saveState();
    
    showScreen('main');
    updateMainScreen();
    startIdleMessages();
    
    notify(`Selamat datang, ${name}! 🎉`);
    speak(`Halo ${name}, selamat datang di EduKids Adventure!`);
    createConfetti(60);
    createFireworks(3);
    
    setTimeout(() => {
        showMascotMessage(MASCOT_MESSAGES.greeting[0]);
        speak(MASCOT_MESSAGES.greeting[0].replace('{name}', name));
    }, 1000);
}

// ============= MAIN SCREEN =============
function updateMainScreen() {
    if (!state.player) return;
    const p = state.player;
    
    document.getElementById('topAvatar').textContent = p.avatar;
    document.getElementById('topName').textContent = p.name;
    document.getElementById('topLevel').textContent = p.level;
    document.getElementById('energyDisplay').textContent = p.energy;
    document.getElementById('coinDisplay').textContent = p.coins;
    document.getElementById('xpDisplay').textContent = p.xp;
    
    const xpNeeded = p.level * 100;
    const percent = Math.min((p.xp / xpNeeded) * 100, 100);
    document.getElementById('xpBar').style.width = percent + '%';
    document.getElementById('xpText').textContent = `${p.xp} / ${xpNeeded} XP`;
    
    // Welcome
    const hour = new Date().getHours();
    let greeting = 'Halo';
    if (hour < 12) greeting = 'Selamat Pagi';
    else if (hour < 18) greeting = 'Selamat Siang';
    else greeting = 'Selamat Malam';
    
    document.getElementById('welcomeMessage').textContent = `${greeting}, ${p.name}!`;
    
    const subtexts = [
        'Siap belajar apa hari ini?',
        'Ayo jelajahi dunia baru!',
        'Pet-mu menunggumu bermain!',
        'Mari kita bermain sambil belajar!'
    ];
    document.getElementById('welcomeSubtext').textContent = subtexts[Math.floor(Math.random() * subtexts.length)];
    document.getElementById('mascotAvatar').textContent = '🤖';
    
    // Streak
    document.getElementById('streakCount').textContent = p.streak;
    
    // Missions
    renderMissions();
    
    // Adventure map
    renderAdventureMap();
    
    // Stats chart
    renderStatsChart();
    
    // Update chests
    updateChests();
}

function renderMissions() {
    if (!state.currentMissions || state.currentMissions.length === 0) {
        resetDailyMissions();
    }
    
    const container = document.getElementById('missionsContainer');
    container.innerHTML = '';
    
    let completedCount = 0;
    state.currentMissions.slice(0, 3).forEach(m => {
        if (m.completed) completedCount++;
        const card = document.createElement('div');
        card.className = 'mission-card' + (m.completed ? ' completed' : '');
        const progress = Math.min((m.progress / m.target) * 100, 100);
        card.innerHTML = `
            <div class="mission-icon">${m.icon}</div>
            <div class="mission-info">
                <div class="mission-title">${m.title}</div>
                <div class="mission-progress-bar">
                    <div class="mission-progress-fill" style="width:${progress}%"></div>
                </div>
                <div class="mission-reward">${m.progress}/${m.target} • +${m.reward} XP</div>
            </div>
            ${m.completed ? '<div class="mission-check">✓</div>' : ''}
        `;
        container.appendChild(card);
    });
    
    document.getElementById('missionsCompleted').textContent = `${completedCount}/3`;
}

function renderAdventureMap() {
    const nodesDiv = document.getElementById('mapNodes');
    nodesDiv.innerHTML = '';
    
    // Draw SVG path
    const svg = document.getElementById('mapPath');
    svg.innerHTML = '';
    
    const pathD = 'M 100 50 Q 300 100, 200 200 Q 100 300, 300 400 Q 200 500, 100 600 Q 300 700, 200 780';
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    path.setAttribute('class', 'active-path');
    svg.appendChild(path);
    
    WORLDS.forEach((w, i) => {
        const locked = state.player.level < w.unlockLevel;
        const visited = state.player.worldsVisited?.includes(w.id);
        const stars = state.player.starsPerWorld?.[w.id] || 0;
        const isCurrent = !locked && !visited && (i === 0 || state.player.level >= WORLDS[i-1].unlockLevel);
        
        const node = document.createElement('div');
        node.className = 'map-node';
        if (locked) node.classList.add('locked');
        if (visited) node.classList.add('completed');
        if (isCurrent) node.classList.add('active');
        
        let badge = '';
        if (visited) badge = `<div class="node-badge">${stars}⭐</div>`;
        else if (locked) badge = `<div class="node-badge">🔒</div>`;
        
        const starsDisplay = visited ? '⭐'.repeat(stars) + '☆'.repeat(3 - stars) : '';
        
        node.innerHTML = `
            ${badge}
            <div class="node-icon">${w.icon}</div>
            <div class="node-info">
                <div class="node-title">${w.name}</div>
                <div class="node-level">${locked ? `Level ${w.unlockLevel} dibutuhkan` : (visited ? 'Selesai!' : 'Mulai Petualangan')}</div>
                ${starsDisplay ? `<div class="node-stars">${starsDisplay}</div>` : ''}
            </div>
        `;
        
        if (!locked) {
            node.onclick = () => startWorld(w);
        } else {
            node.onclick = () => notify(`Butuh Level ${w.unlockLevel}!`, 'warning');
        }
        
        nodesDiv.appendChild(node);
    });
    
    // Position character at first unlocked node
    updateCharacterPosition();
}

function updateCharacterPosition() {
    const sprite = document.getElementById('characterSprite');
    sprite.textContent = state.player?.avatar || '🧒';
    // Position based on progress
    const unlockedCount = WORLDS.filter(w => state.player.level >= w.unlockLevel).length;
    const y = Math.min(30 + (unlockedCount - 1) * 120, 550);
    sprite.style.top = y + 'px';
}

function renderStatsChart() {
    const container = document.getElementById('statsChart');
    container.innerHTML = '';
    const days = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    const maxStat = Math.max(...state.weeklyStats, 1);
    
    state.weeklyStats.forEach((val, i) => {
        const bar = document.createElement('div');
        bar.className = 'stat-bar';
        bar.style.height = (val / maxStat * 100) + '%';
        bar.dataset.day = days[i];
        container.appendChild(bar);
    });
}

function updateChests() {
    const now = Date.now();
    const dailyTimer = document.getElementById('dailyChestTimer');
    if (state.dailyChestTime && state.dailyChestTime > now) {
        const remaining = Math.floor((state.dailyChestTime - now) / 60000);
        dailyTimer.textContent = `${remaining}m`;
    } else {
        dailyTimer.textContent = 'Siap!';
    }
}

// ============= DAILY REWARD =============
function claimDailyReward() {
    const today = new Date().toDateString();
    if (state.player.lastLogin === today && state.player.claimedDailyToday) {
        return notify('Sudah klaim hari ini! Kembali besok 🌅', 'warning');
    }
    
    const isConsecutive = state.player.lastLogin === new Date(Date.now() - 86400000).toDateString();
    if (isConsecutive) {
        state.player.streak++;
    } else {
        state.player.streak = 1;
    }
    
    state.player.lastLogin = today;
    state.player.claimedDailyToday = true;
    
    const coinReward = 10 + state.player.streak * 5;
    const xpReward = 20;
    
    state.player.coins += coinReward;
    state.player.xp += xpReward;
    
    saveState();
    updateMainScreen();
    
    notify(`🎁 +${coinReward} 💰 +${xpReward} ⭐ Streak ${state.player.streak} hari!`);
    speak(`Selamat! Streak ${state.player.streak} hari!`);
    playSound('chest');
    
    checkLevelUp();
    checkAchievements();
}

// ============= CHESTS =============
function openChest(type) {
    const p = state.player;
    
    if (type === 'daily') {
        const now = Date.now();
        if (state.dailyChestTime && state.dailyChestTime > now) {
            const remaining = Math.ceil((state.dailyChestTime - now) / 60000);
            return notify(`Tunggu ${remaining} menit lagi!`, 'warning');
        }
        
        const coins = 20 + Math.floor(Math.random() * 30);
        const xp = 30 + Math.floor(Math.random() * 20);
        p.coins += coins;
        p.xp += xp;
        
        state.dailyChestTime = Date.now() + 4 * 60 * 60 * 1000; // 4 hours
        saveState();
        
        notify(`🎁 +${coins} 💰 +${xp} ⭐`, 'success');
        speak(`Kamu dapat ${coins} koin dan ${xp} XP!`);
        playSound('chest');
        updateMainScreen();
        checkLevelUp();
        return;
    }
    
    if (type === 'epic') {
        if (p.level < 3) return notify('Butuh Level 3!', 'warning');
        if (p.coins < 100) return notify('Butuh 100 koin!', 'warning');
        
        p.coins -= 100;
        const coins = 50 + Math.floor(Math.random() * 50);
        const xp = 80 + Math.floor(Math.random() * 40);
        p.coins += coins;
        p.xp += xp;
        
        saveState();
        notify(`🎊 Epic! +${coins} 💰 +${xp} ⭐`, 'success');
        playSound('chest');
        updateMainScreen();
        checkLevelUp();
        return;
    }
    
    if (type === 'legend') {
        if (p.level < 5) return notify('Butuh Level 5!', 'warning');
        if (p.coins < 300) return notify('Butuh 300 koin!', 'warning');
        
        p.coins -= 300;
        const coins = 150 + Math.floor(Math.random() * 100);
        const xp = 200 + Math.floor(Math.random() * 100);
        p.coins += coins;
        p.xp += xp;
        
        saveState();
        notify(`👑 LEGENDARY! +${coins} 💰 +${xp} ⭐`, 'success');
        speak('Legendary chest! Hebat sekali!');
        playSound('chest');
        updateMainScreen();
        checkLevelUp();
    }
}

// ============= START WORLD =============
function startWorld(world) {
    if (state.player.energy < 1) {
        return notify('Energi habis! Tunggu atau beli boost ❤️', 'warning');
    }
    
    state.currentWorld = world;
    state.gameState = {
        currentGameIndex: 0,
        gamesToPlay: world.games.slice(0, 2), // 2 mini games then boss
        totalCorrect: 0,
        totalRounds: 0
    };
    
    // Apply theme
    document.getElementById('animatedBg').className = 'animated-bg ' + world.theme;
    
    // Mark visited
    if (!state.player.worldsVisited.includes(world.id)) {
        state.player.worldsVisited.push(world.id);
        updateMissionProgress('visit_2', 1);
    }
    
    startNextGame();
}

function startNextGame() {
    const gs = state.gameState;
    
    if (gs.currentGameIndex < gs.gamesToPlay.length) {
        const gameId = gs.gamesToPlay[gs.currentGameIndex];
        startMiniGame(gameId);
    } else {
        // Start boss
        startBossBattle();
    }
}

// ============= MINI GAMES =============
function startMiniGame(gameId) {
    const game = MINI_GAMES_DATA[gameId];
    if (!game) {
        notify('Game belum tersedia! 🔜', 'info');
        return;
    }
    
    state.currentGame = { id: gameId, ...game };
    state.gameState.round = 0;
    state.gameState.maxRounds = 5;
    state.gameState.score = 0;
    state.gameState.correct = 0;
    
    showScreen('game');
    document.getElementById('gameTitle').textContent = game.title;
    document.getElementById('gameScore').textContent = '0';
    
    nextRound();
}

function nextRound() {
    state.gameState.round++;
    
    if (state.gameState.round > state.gameState.maxRounds) {
        return endMiniGame();
    }
    
    document.getElementById('gameRound').textContent = state.gameState.round;
    const progress = ((state.gameState.round - 1) / state.gameState.maxRounds) * 100;
    document.getElementById('gameProgressBar').style.width = progress + '%';
    
    const data = state.currentGame.generator();
    state.gameState.currentAnswer = data.answer;
    
    const content = document.getElementById('gameContent');
    content.innerHTML = `
        <div class="game-prompt">${state.currentGame.prompt}</div>
        <div class="game-question" ${data.questionStyle ? `style="${data.questionStyle}"` : ''}>${data.question}</div>
        <div class="game-options" id="gameOptions"></div>
    `;
    
    speak(state.currentGame.prompt);
    
    const optsDiv = document.getElementById('gameOptions');
    data.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleAnswer(btn, opt);
        optsDiv.appendChild(btn);
    });
}

function handleAnswer(btn, selected) {
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.disabled = true);
    
    const correct = String(selected) === String(state.gameState.currentAnswer);
    
    if (correct) {
        btn.classList.add('correct');
        state.gameState.score++;
        state.gameState.correct++;
        state.player.correctAnswers++;
        document.getElementById('gameScore').textContent = state.gameState.score;
        
        const msgs = MASCOT_MESSAGES.correct;
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        showMascotMessage(msg);
        speak(msg);
        playSound('success');
        
        updateMissionProgress('correct_10', 1);
    } else {
        btn.classList.add('wrong');
        // Highlight correct
        buttons.forEach(b => {
            if (b.textContent === String(state.gameState.currentAnswer)) {
                b.classList.add('correct');
            }
        });
        
        const msgs = MASCOT_MESSAGES.wrong;
        const msg = msgs[Math.floor(Math.random() * msgs.length)];
        showMascotMessage(msg);
        speak(`Jawabannya adalah ${state.gameState.currentAnswer}`);
    }
    
    setTimeout(nextRound, 2000);
}

function endMiniGame() {
    const gs = state.gameState;
    const score = gs.score;
    const max = gs.maxRounds;
    
    // Calculate rewards
    const xpBase = score * 15;
    const coinBase = score * 5;
    const stars = score === max ? 3 : score >= max - 1 ? 2 : score >= max/2 ? 1 : 0;
    
    const xp = xpBase * state.player.xpMultiplier;
    const coins = coinBase * state.player.coinMultiplier;
    
    state.player.xp += xp;
    state.player.coins += coins;
    state.player.gamesPlayed++;
    state.player.totalStars += stars;
    
    // Mission progress
    updateMissionProgress('play_3', 1);
    updateMissionProgress('earn_50', xp);
    
    // World stats
    const worldId = state.currentWorld.id;
    if (!state.player.starsPerWorld) state.player.starsPerWorld = {};
    state.player.starsPerWorld[worldId] = Math.max(state.player.starsPerWorld[worldId] || 0, stars);
    
    // Collections
    addToCollection();
    
    // Perfect game achievement
    if (score === max) {
        unlockAchievement('perfect_game');
    }
    
    // Save
    state.gameState.totalCorrect += score;
    state.gameState.totalRounds += max;
    
    saveState();
    
    // Show result
    showScreen('result');
    document.getElementById('resultTitle').textContent = 
        stars === 3 ? 'SEMPURNA! 🎯' : 
        stars === 2 ? 'HEBAT! 🌟' : 
        stars === 1 ? 'BAGUS! 👍' : 'COBA LAGI!';
    document.getElementById('resultSubtitle').textContent = 
        `Skor: ${score}/${max}`;
    document.getElementById('resultXP').textContent = '+' + xp;
    document.getElementById('resultCoins').textContent = '+' + coins;
    
    // Stars
    const starsDiv = document.getElementById('resultStars');
    starsDiv.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('div');
        star.className = 'star' + (i < stars ? ' earned' : '');
        star.textContent = '⭐';
        star.style.animationDelay = (i * 0.2) + 's';
        starsDiv.appendChild(star);
    }
    
    playSound('coin');
    if (stars === 3) createConfetti(60);
    
    // Move to next
    state.gameState.currentGameIndex++;
    
    checkLevelUp();
    checkAchievements();
}

function addToCollection() {
    // Simple collection based on world
    const worldId = state.currentWorld?.id;
    const c = state.player.collections;
    if (worldId === 'huruf' && !c.letters.includes('A')) {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const newLetter = letters.find(l => !c.letters.includes(l));
        if (newLetter) c.letters.push(newLetter);
    }
    // Similar for others...
}

function continueAfterResult() {
    // Continue to next game or boss
    const gs = state.gameState;
    if (gs.currentGameIndex < gs.gamesToPlay.length) {
        startNextGame();
    } else if (state.currentWorld) {
        // Show boss option
        const modal = document.getElementById('modal');
        document.getElementById('modalBody').innerHTML = `
            <h2 style="text-align:center; margin-bottom:16px;">⚔️ Tantang Boss?</h2>
            <p style="text-align:center; margin-bottom:24px;">Kalahkan ${state.currentWorld.boss.name} untuk reward besar!</p>
            <div style="text-align:center; font-size:80px; margin:20px 0;">${state.currentWorld.boss.icon}</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                <button class="btn-primary" onclick="closeModal(); startBossBattle();">⚔️ Lawan!</button>
                <button class="btn-secondary" onclick="closeModal(); exitWorld();">🏠 Selesai</button>
            </div>
        `;
        modal.classList.add('active');
    } else {
        exitWorld();
    }
}

function exitWorld() {
    document.getElementById('animatedBg').className = 'animated-bg';
    showScreen('main');
    updateMainScreen();
}

function continuePlaying() {
    // Find next available world
    const nextWorld = WORLDS.find(w => state.player.level >= w.unlockLevel && !state.player.worldsVisited?.includes(w.id));
    if (nextWorld) {
        startWorld(nextWorld);
    } else {
        // Replay any world
        const visited = WORLDS.filter(w => state.player.worldsVisited?.includes(w.id));
        if (visited.length > 0) {
            startWorld(visited[0]);
        }
    }
}

// ============= BOSS BATTLE =============
function startBossBattle() {
    if (!state.currentWorld?.boss) {
        exitWorld();
        return;
    }
    
    const boss = state.currentWorld.boss;
    state.bossState = {
        bossHp: boss.hp,
        maxBossHp: boss.hp,
        playerHp: 100,
        maxPlayerHp: 100,
        boss: boss
    };
    
    showScreen('boss');
    document.getElementById('bossName').textContent = boss.name;
    document.getElementById('bossSprite').textContent = boss.icon;
    document.getElementById('bossPlayerName').textContent = state.player.name;
    document.getElementById('battleLog').textContent = `⚔️ ${boss.name} muncul!`;
    
    updateBossUI();
    setTimeout(nextBossQuestion, 1500);
}

function updateBossUI() {
    const bs = state.bossState;
    document.getElementById('bossHpFill').style.width = (bs.bossHp / bs.maxBossHp * 100) + '%';
    document.getElementById('playerHpFill').style.width = (bs.playerHp / bs.maxPlayerHp * 100) + '%';
}

function nextBossQuestion() {
    // Random mini game for boss
    const games = Object.keys(MINI_GAMES_DATA);
    const gameId = games[Math.floor(Math.random() * games.length)];
    const game = MINI_GAMES_DATA[gameId];
    const data = game.generator();
    
    state.bossState.currentAnswer = data.answer;
    
    const question = document.getElementById('battleQuestion');
    question.innerHTML = `
        <h3>${game.prompt}</h3>
        <div class="game-question" ${data.questionStyle ? `style="${data.questionStyle}"` : ''}>${data.question}</div>
    `;
    
    const optionsDiv = document.getElementById('battleOptions');
    optionsDiv.innerHTML = '';
    data.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = opt;
        btn.onclick = () => handleBossAnswer(btn, opt);
        optionsDiv.appendChild(btn);
    });
}

function handleBossAnswer(btn, selected) {
    const buttons = document.querySelectorAll('#battleOptions .option-btn');
    buttons.forEach(b => b.disabled = true);
    
    const correct = String(selected) === String(state.bossState.currentAnswer);
    const log = document.getElementById('battleLog');
    const bossSprite = document.getElementById('bossSprite');
    
    if (correct) {
        btn.classList.add('correct');
        const damage = 10 + Math.floor(Math.random() * 10);
        state.bossState.bossHp = Math.max(0, state.bossState.bossHp - damage);
        bossSprite.classList.add('hit');
        setTimeout(() => bossSprite.classList.remove('hit'), 500);
        log.textContent = `💥 ${state.player.name} menyerang! -${damage} HP`;
        speak(`Serangan berhasil! ${damage} damage!`);
        playSound('success');
    } else {
        btn.classList.add('wrong');
        buttons.forEach(b => {
            if (b.textContent === String(state.bossState.currentAnswer)) b.classList.add('correct');
        });
        const damage = 15;
        state.bossState.playerHp = Math.max(0, state.bossState.playerHp - damage);
        log.textContent = `😱 Kamu salah! Boss menyerang -${damage} HP`;
        speak('Kamu salah, hati-hati!');
    }
    
    updateBossUI();
    
    // Check end conditions
    if (state.bossState.bossHp <= 0) {
        setTimeout(bossVictory, 1500);
    } else if (state.bossState.playerHp <= 0) {
        setTimeout(bossDefeat, 1500);
    } else {
        setTimeout(nextBossQuestion, 2000);
    }
}

function bossVictory() {
    const boss = state.bossState.boss;
    const xpReward = 100 + state.player.level * 20;
    const coinReward = 100 + state.player.level * 10;
    
    state.player.xp += xpReward;
    state.player.coins += coinReward;
    
    if (!state.player.bossesDefeated.includes(state.currentWorld.id)) {
        state.player.bossesDefeated.push(state.currentWorld.id);
    }
    
    updateMissionProgress('boss_1', 1);
    unlockAchievement('boss_1');
    
    if (state.player.bossesDefeated.length === WORLDS.length) {
        unlockAchievement('all_bosses');
    }
    
    saveState();
    
    document.getElementById('battleLog').textContent = `🏆 ${boss.name} KALAH!`;
    speak(`Selamat! Kamu mengalahkan ${boss.name}!`);
    createConfetti(100);
    createFireworks(8);
    
    setTimeout(() => {
        showScreen('result');
        document.getElementById('resultTitle').textContent = 'VICTORY! 🏆';
        document.getElementById('resultSubtitle').textContent = `${boss.name} dikalahkan!`;
        document.getElementById('resultXP').textContent = '+' + xpReward;
        document.getElementById('resultCoins').textContent = '+' + coinReward;
        document.getElementById('resultBonus').style.display = 'block';
        
        const starsDiv = document.getElementById('resultStars');
        starsDiv.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const star = document.createElement('div');
            star.className = 'star earned';
            star.textContent = '⭐';
            star.style.animationDelay = (i * 0.2) + 's';
            starsDiv.appendChild(star);
        }
        
        checkLevelUp();
        checkAchievements();
    }, 3000);
}

function bossDefeat() {
    document.getElementById('battleLog').textContent = '😢 Kamu kalah...';
    speak('Jangan menyerah! Coba lagi nanti!');
    
    setTimeout(() => {
        notify('Kalah! Coba lagi nanti 💪', 'error');
        exitWorld();
    }, 2000);
}

// ============= LEVEL UP =============
function checkLevelUp() {
    const p = state.player;
    let leveledUp = false;
    let newLevel = p.level;
    
    while (p.xp >= p.level * 100) {
        p.xp -= p.level * 100;
        p.level++;
        newLevel = p.level;
        leveledUp = true;
    }
    
    if (leveledUp) {
        showLevelUp(newLevel);
        // Restore energy
        p.energy = p.maxEnergy;
        saveState();
    }
}

function showLevelUp(level) {
    const overlay = document.getElementById('levelUpOverlay');
    document.getElementById('levelUpNumber').textContent = `Level ${level}`;
    const msgs = MASCOT_MESSAGES.levelUp;
    document.getElementById('levelUpMessage').textContent = msgs[Math.floor(Math.random() * msgs.length)];
    overlay.classList.add('active');
    
    createConfetti(100);
    createFireworks(8);
    playSound('levelup');
    speak(`Selamat! Kamu naik ke level ${level}!`);
}

function closeLevelUp() {
    document.getElementById('levelUpOverlay').classList.remove('active');
    updateMainScreen();
}

// ============= MISSIONS PROGRESS =============
function updateMissionProgress(missionId, amount) {
    if (!state.currentMissions) return;
    const mission = state.currentMissions.find(m => m.id === missionId);
    if (mission && !mission.completed) {
        mission.progress += amount;
        if (mission.progress >= mission.target) {
            mission.completed = true;
            mission.claimed = true;
            state.player.xp += mission.reward;
            state.player.dailyMissionsCompleted++;
            
            notify(`✅ Misi: ${mission.title} +${mission.reward} XP`, 'success');
            playSound('chest');
            
            if (state.player.dailyMissionsCompleted >= 30) {
                unlockAchievement('daily_30');
            }
            
            saveState();
            renderMissions();
            checkLevelUp();
        } else {
            saveState();
            renderMissions();
        }
    }
}

// ============= ACHIEVEMENTS =============
function checkAchievements() {
    const p = state.player;
    p.achievements.forEach(a => {
        if (a.unlocked) return;
        let unlock = false;
        
        if (a.id === 'first_login') unlock = true;
        else if (a.id === 'level_5') unlock = p.level >= 5;
        else if (a.id === 'level_10') unlock = p.level >= 10;
        else if (a.id === 'level_20') unlock = p.level >= 20;
        else if (a.id === 'streak_7') unlock = p.streak >= 7;
        else if (a.id === 'streak_30') unlock = p.streak >= 30;
        else if (a.id === 'coins_500') unlock = p.coins >= 500;
        else if (a.id === 'coins_1000') unlock = p.coins >= 1000;
        else if (a.id === 'games_50') unlock = p.gamesPlayed >= 50;
        else if (a.id === 'games_100') unlock = p.gamesPlayed >= 100;
        else if (a.id === 'all_worlds') unlock = p.worldsVisited?.length >= WORLDS.length;
        else if (a.id === 'all_bosses') unlock = p.bossesDefeated?.length >= WORLDS.length;
        else if (a.id === 'all_pets') unlock = PETS.every(pet => p.ownedItems.includes('pet_' + pet.id));
        else if (a.type && a.type.startsWith('games_')) {
            // Category-based
            const cat = a.type.split('_')[1];
            unlock = p.gamesPlayed >= a.target; // Simplified
        }
        
        if (unlock) {
            a.unlocked = true;
            notify(`🏆 ${a.name}!`, 'success');
            speak(`Selamat! Kamu mendapat prestasi ${a.name}!`);
            playSound('chest');
            p.coins += 50; // Bonus
        }
    });
    saveState();
}

function unlockAchievement(id) {
    const a = state.player.achievements.find(x => x.id === id);
    if (a && !a.unlocked) {
        a.unlocked = true;
        notify(`🏆 ${a.name}!`, 'success');
        speak(`Selamat! ${a.name}!`);
        state.player.coins += 50;
        playSound('chest');
        saveState();
    }
}

// ============= SHOP =============
let currentShopTab = 'avatar';

function renderShop() {
    document.getElementById('shopCoins').textContent = state.player.coins;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.onclick = () => {
            currentShopTab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderShopItems();
        };
    });
    
    renderShopItems();
}

function renderShopItems() {
    const content = document.getElementById('shopContent');
    content.innerHTML = '';
    
    const items = SHOP_ITEMS.filter(i => i.cat === currentShopTab);
    items.forEach(item => {
        const owned = state.player.ownedItems.includes(item.id);
        const canBuy = state.player.coins >= item.price && !owned;
        
        const div = document.createElement('div');
        div.className = 'shop-item' + (owned ? ' owned' : '');
        div.innerHTML = `
            <div class="shop-icon">${item.icon}</div>
            <div class="shop-name">${item.name}</div>
            <div class="shop-desc">${item.desc}</div>
            ${owned ? 
                '<div class="shop-price disabled">✓ Dimiliki</div>' :
                `<button class="shop-price ${!canBuy ? 'disabled' : ''}" 
                    onclick="buyItem('${item.id}')" ${!canBuy ? 'disabled' : ''}>
                    💰 ${item.price}
                </button>`
            }
        `;
        content.appendChild(div);
    });
}

function buyItem(id) {
    const item = SHOP_ITEMS.find(i => i.id === id);
    if (!item) return;
    if (state.player.coins < item.price) return notify('Koin tidak cukup! 💰', 'error');
    if (state.player.ownedItems.includes(id)) return;
    
    state.player.coins -= item.price;
    state.player.ownedItems.push(id);
    
    // Apply boost
    if (item.id === 'boost_xp') {
        state.player.xpMultiplier = 2;
        state.player.boostsUsed++;
    }
    if (item.id === 'boost_coin') {
        state.player.coinMultiplier = 2;
        state.player.boostsUsed++;
    }
    if (item.id === 'boost_energy') {
        state.player.energy = state.player.maxEnergy;
    }
    if (item.id.startsWith('pet_')) {
        const petId = item.id.replace('pet_', '');
        state.player.pet = PETS.find(p => p.id === petId)?.icon || state.player.pet;
    }
    
    saveState();
    notify(`✅ ${item.name} dibeli!`, 'success');
    speak(`Kamu membeli ${item.name}!`);
    playSound('coin');
    renderShop();
    updateMainScreen();
    checkAchievements();
}

// ============= PET =============
function renderPet() {
    const content = document.getElementById('petContent');
    const p = state.player;
    const currentPet = PETS.find(pet => pet.icon === p.pet) || PETS[0];
    const petLevel = Math.floor(p.gamesPlayed / 10) + 1;
    
    content.innerHTML = `
        <div class="pet-showcase">
            <div class="pet-big">${currentPet.icon}</div>
            <div class="pet-name">${currentPet.name}</div>
            <div class="pet-level">Level ${petLevel}</div>
            <div class="pet-stats">
                <div class="pet-stat">
                    <div class="pet-stat-value">+${currentPet.bonus}%</div>
                    <div class="pet-stat-label">XP Bonus</div>
                </div>
                <div class="pet-stat">
                    <div class="pet-stat-value">❤️</div>
                    <div class="pet-stat-label">Happy</div>
                </div>
                <div class="pet-stat">
                    <div class="pet-stat-value">Lv.${petLevel}</div>
                    <div class="pet-stat-label">Level</div>
                </div>
            </div>
        </div>
        
        <div class="section-header">
            <h2>🐾 Pilih Pet Lain</h2>
        </div>
        <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
            ${PETS.map(pet => `
                <div class="shop-item ${p.pet === pet.icon ? 'owned' : ''}" onclick="changePet('${pet.id}')">
                    <div class="shop-icon">${pet.icon}</div>
                    <div class="shop-name">${pet.name}</div>
                    <div class="shop-desc">+${pet.bonus}% XP</div>
                </div>
            `).join('')}
        </div>
    `;
}

function changePet(petId) {
    const pet = PETS.find(p => p.id === petId);
    if (!pet) return;
    if (pet.price > 0 && !state.player.ownedItems.includes('pet_' + petId)) {
        return notify(`Beli ${pet.name} di Toko dulu!`, 'warning');
    }
    state.player.pet = pet.icon;
    saveState();
    renderPet();
    updateMainScreen();
    notify(`Pet diganti ke ${pet.name}!`, 'success');
    speak(`Pet barumu adalah ${pet.name}!`);
}

// ============= COLLECTION =============
function renderCollection() {
    const content = document.getElementById('collectionContent');
    const c = state.player.collections;
    
    const categories = [
        { id: 'letters', name: 'Huruf', icon: '📚', items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), collected: c.letters },
        { id: 'numbers', name: 'Angka', icon: '🔢', items: Array.from({length: 20}, (_, i) => String(i+1)), collected: c.numbers },
        { id: 'colors', name: 'Warna', icon: '🎨', items: ['Merah','Biru','Hijau','Kuning','Ungu','Oranye','Pink'], collected: c.colors },
        { id: 'animals', name: 'Hewan', icon: '🐾', items: ['🦁','🐯','🐘','🦒','🦓','🐻','🐼'], collected: c.animals },
        { id: 'planets', name: 'Planet', icon: '🌍', items: ['☀️','🌙','⭐','🌍','🪐'], collected: c.planets }
    ];
    
    content.innerHTML = categories.map(cat => `
        <div class="collection-category">
            <div class="collection-header">
                <div class="collection-title">${cat.icon} ${cat.name}</div>
                <div class="collection-progress">${cat.collected?.length || 0}/${cat.items.length}</div>
            </div>
            <div class="collection-grid">
                ${cat.items.map(item => `
                    <div class="collection-item ${!cat.collected?.includes(item) ? 'locked' : ''}">
                        ${cat.collected?.includes(item) ? item : '❓'}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ============= ACHIEVEMENTS SCREEN =============
function renderAchievements() {
    const content = document.getElementById('achievementsContent');
    const unlocked = state.player.achievements.filter(a => a.unlocked).length;
    document.getElementById('achieveCount').textContent = `${unlocked}/${state.player.achievements.length}`;
    
    content.innerHTML = state.player.achievements.map(a => `
        <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
            <div class="achieve-icon">${a.icon}</div>
            <div class="achieve-info">
                <div class="achieve-name">${a.name}</div>
                <div class="achieve-desc">${a.desc}</div>
            </div>
            <div class="achieve-status ${a.unlocked ? 'unlocked' : 'locked'}">
                ${a.unlocked ? '✓' : '🔒'}
            </div>
        </div>
    `).join('');
}

// ============= PROFILE =============
function renderProfile() {
    const content = document.getElementById('profileContent');
    const p = state.player;
    
    content.innerHTML = `
        <div class="profile-card">
            <div class="profile-avatar">${p.avatar}</div>
            <div class="profile-name">${p.name}</div>
            <div class="profile-level">Level ${p.level} • ${p.age} tahun</div>
            <div class="profile-stats">
                <div class="profile-stat">
                    <div class="profile-stat-value">⭐ ${p.xp}</div>
                    <div class="profile-stat-label">Total XP</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">💰 ${p.coins}</div>
                    <div class="profile-stat-label">Koin</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">🎮 ${p.gamesPlayed}</div>
                    <div class="profile-stat-label">Games</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">🔥 ${p.streak}</div>
                    <div class="profile-stat-label">Streak</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">✅ ${p.correctAnswers}</div>
                    <div class="profile-stat-label">Jawaban Benar</div>
                </div>
                <div class="profile-stat">
                    <div class="profile-stat-value">⭐ ${p.totalStars}</div>
                    <div class="profile-stat-label">Total Bintang</div>
                </div>
            </div>
        </div>
        
        <button class="btn-secondary" onclick="downloadReport()" style="width:100%; margin-bottom:10px;">
            📄 Download Rapor (PDF)
        </button>
        <button class="btn-secondary" onclick="toggleTheme()" style="width:100%; margin-bottom:10px;">
            🌙 Mode Gelap/Terang
        </button>
        <button class="btn-secondary" onclick="logout()" style="width:100%; margin-bottom:10px; color:var(--danger);">
            🚪 Keluar Akun
        </button>
        <button class="btn-secondary" onclick="resetAll()" style="width:100%; color:var(--danger);">
            🗑️ Reset Semua Data
        </button>
    `;
}

function logout() {
    if (confirm('Yakin ingin keluar?')) {
        showScreen('login');
        initLogin();
    }
}

function resetAll() {
    if (confirm('Yakin hapus SEMUA data? Tidak bisa dikembalikan!')) {
        localStorage.removeItem('edukids_state');
        location.reload();
    }
}

function showProfile() {
    showScreen('profile');
}

// ============= PARENT DASHBOARD =============
function showParentDashboard() {
    const p = state.player;
    const modal = document.getElementById('modal');
    const totalGames = p.gamesPlayed;
    const accuracy = totalGames > 0 ? Math.round((p.correctAnswers / (totalGames * 5)) * 100) : 0;
    
    document.getElementById('modalBody').innerHTML = `
        <h2 style="text-align:center; margin-bottom:8px;">👨‍👩‍👧 Dashboard Orang Tua</h2>
        <p style="text-align:center; opacity:0.7; margin-bottom:20px;">Laporan perkembangan ${p.name}</p>
        
        <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-bottom:20px;">
            <div style="background:linear-gradient(135deg,#6366f1,#4f46e5); padding:16px; border-radius:16px; color:white;">
                <div style="font-size:28px; font-weight:800;">⭐ ${p.xp}</div>
                <div style="font-size:12px;">Total XP</div>
            </div>
            <div style="background:linear-gradient(135deg,#ec4899,#db2777); padding:16px; border-radius:16px; color:white;">
                <div style="font-size:28px; font-weight:800;">📊 Lv.${p.level}</div>
                <div style="font-size:12px;">Level Saat Ini</div>
            </div>
            <div style="background:linear-gradient(135deg,#10b981,#059669); padding:16px; border-radius:16px; color:white;">
                <div style="font-size:28px; font-weight:800;">✅ ${accuracy}%</div>
                <div style="font-size:12px;">Akurasi</div>
            </div>
            <div style="background:linear-gradient(135deg,#f59e0b,#d97706); padding:16px; border-radius:16px; color:white;">
                <div style="font-size:28px; font-weight:800;">🔥 ${p.streak}</div>
                <div style="font-size:12px;">Hari Streak</div>
            </div>
        </div>
        
        <div style="background:var(--bg-glass); padding:16px; border-radius:16px; margin-bottom:20px;">
            <h3 style="margin-bottom:12px;">📈 Statistik Belajar</h3>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Game Dimainkan</span>
                <strong>${totalGames}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Jawaban Benar</span>
                <strong>${p.correctAnswers}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Dunia Dijelajahi</span>
                <strong>${p.worldsVisited?.length || 0}/${WORLDS.length}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                <span>Boss Dikalahkan</span>
                <strong>${p.bossesDefeated?.length || 0}/${WORLDS.length}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <span>Pencapaian</span>
                <strong>${p.achievements.filter(a => a.unlocked).length}/${p.achievements.length}</strong>
            </div>
        </div>
        
        <div style="background:var(--bg-glass); padding:16px; border-radius:16px; margin-bottom:20px;">
            <h3 style="margin-bottom:12px;">💡 Rekomendasi</h3>
            <p style="font-size:14px; line-height:1.5;">
                ${p.level < 3 ? 'Fokus pada Kota Huruf dan Pulau Angka untuk dasar yang kuat.' :
                  p.level < 5 ? 'Coba Hutan Warna dan Kerajaan Bentuk untuk memperluas pengetahuan.' :
                  p.level < 8 ? 'Anak siap untuk Hutan Sains! Dorong eksplorasi.' :
                  'Anak Anda sudah mahir! Lanjutkan dengan Planet English dan tantangan tingkat tinggi.'}
            </p>
        </div>
        
        <button class="btn-primary" onclick="downloadReport()">📄 Download Rapor PDF</button>
    `;
    modal.classList.add('active');
}

function downloadReport() {
    const p = state.player;
    const report = `
RAPOR BELAJAR EDUKIDS ADVENTURE
================================
Nama: ${p.name}
Usia: ${p.age} tahun
Tanggal: ${new Date().toLocaleDateString('id-ID')}

PROGRESS BELAJAR
- Level: ${p.level}
- Total XP: ${p.xp}
- Koin: ${p.coins}
- Streak: ${p.streak} hari

STATISTIK
- Game Dimainkan: ${p.gamesPlayed}
- Jawaban Benar: ${p.correctAnswers}
- Akurasi: ${p.gamesPlayed > 0 ? Math.round((p.correctAnswers / (p.gamesPlayed * 5)) * 100) : 0}%
- Dunia Dijelajahi: ${p.worldsVisited?.length || 0}/${WORLDS.length}
- Boss Dikalahkan: ${p.bossesDefeated?.length || 0}/${WORLDS.length}
- Total Bintang: ${p.totalStars}

PENCAPAIAN
${p.achievements.filter(a => a.unlocked).map(a => `✓ ${a.name}`).join('\n') || 'Belum ada'}

REKOMENDASI
${p.level < 3 ? 'Fokus pada dasar-dasar: huruf dan angka.' :
  p.level < 5 ? 'Perluas pengetahuan: warna dan bentuk.' :
  'Lanjut ke materi sains dan bahasa Inggris.'}

---
Dibuat oleh EduKids Adventure
    `.trim();
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Rapor_${p.name}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    notify('📄 Rapor berhasil diunduh!', 'success');
}

// ============= MODAL =============
function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

// ============= MUSIC =============
function toggleMusic() {
    state.musicEnabled = !state.musicEnabled;
    const btn = document.getElementById('musicToggle');
    btn.textContent = state.musicEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !state.musicEnabled);
    notify(state.musicEnabled ? '🔊 Musik dinyalakan' : '🔇 Musik dimatikan', 'info');
}

// ============= EXIT GAME =============
function exitGame() {
    if (confirm('Keluar dari game?')) {
        exitWorld();
    }
}

// ============= KEYBOARD SHORTCUTS =============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        document.getElementById('levelUpOverlay').classList.remove('active');
    }
});

// ============= VISIBILITY HANDLING =============
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        saveState();
    }
});

console.log('🎓 EduKids Adventure - Ultimate Edition loaded!');
