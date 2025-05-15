const moods = [
    "console.log('désespoir')",
    "Tu es en mode rage commit",
    "Ton bug va te suivre dans tes rêves",
    "404 Motivation Not Found",
    "Ton code sent le café froid et la défaite",
    "Tu as googlé 'comment devenir boulanger'",
    "Ton IDE te juge en silence",
    "Tu as tenté de push sur master... et tu regrettes",
    "Tu as mis un TODO dans ton CV",
    "Tu as demandé à ChatGPT de coder à ta place"
];

const posts = [
    "J’ai quitté mon job, découvert Notion et généré 25k grâce à une to-do list.",
    "J’ai codé 3 lignes et je suis maintenant CEO de moi-même.",
    "J’ai mis un filtre noir & blanc et j’ai écrit 'Tout a changé...' sur LinkedIn.",
    "J’ai appris React en 48h et lancé ma startup depuis une terrasse à Bali.",
    "J’ai vendu un NFT de mon bug préféré pour 1 ETH.",
    "J’ai lancé une app qui ne fait rien, mais elle a un dark mode.",
    "J’ai fait un thread Twitter sur la productivité, puis j’ai dormi 12h.",
    "J’ai mis 'Growth Hacker' dans ma bio après avoir gagné 2 followers.",
    "J’ai créé une startup qui automatise l’automatisation.",
    "J’ai fait un burn-out, mais en remote, donc ça compte pas."
];

const commits = [
    "fix: typo (encore)",
    "update: README pour la 12e fois",
    "commit désespéré avant le week-end",
    "ajout d’un TODO qui ne sera jamais fait",
    "refactor: tout casser pour rien",
    "debug: ça marche chez moi",
    "wip: je sais même plus ce que je fais",
    "fix: bug mystérieux (croisons les doigts)",
    "style: alignement pixel perfect (ou pas)",
    "test: commit inutile pour voir"
];

const bullshits = [
    "On va scaler le cloud en mode serverless agile disruptif.",
    "Notre stack est full AI-driven microservices blockchain.",
    "On pivote vers une synergie cross-plateforme scalable.",
    "Notre roadmap est alignée sur l’innovation disruptive.",
    "On va dockeriser l’open innovation pour plus d’impact.",
    "On booste la productivité grâce à l’IA générative low-code.",
    "On fait du DevOps as a Service pour l’ultra-agilité.",
    "On va synergiser les KPIs pour un delivery seamless.",
    "Notre MVP est déjà en hypercroissance.",
    "On va lever des fonds pour automatiser l’automatisation."
];

const cvMytho = [
    "Expert Kubernetes après 2 tutos YouTube.",
    "10 ans d’expérience en IA générative (j’ai 22 ans).",
    "Scrum Master certifié par mon chat.",
    "Déployé 42 microservices en prod (aucun ne marche).",
    "Growth Hacker sur LinkedIn, Hacker sur Among Us.",
    "DevOps ninja, mais surtout ninja.",
    "J’ai migré tout un SI sur Excel.",
    "J’ai fait du pair programming avec ChatGPT.",
    "J’ai mis ‘Agile’ dans mon CV, mais je cours pas vite.",
    "J’ai automatisé mon réveil avec une API REST."
];

const excuses = [
    "Mon chat a marché sur le clavier.",
    "J’ai glissé chef.",
    "C’est la faute du wifi.",
    "Je croyais que c’était pour demain.",
    "J’ai confondu avec un autre projet.",
    "J’ai pas entendu le réveil.",
    "J’étais en pleine méditation (devant Netflix).",
    "J’ai eu un bug dans la matrice.",
    "J’ai oublié, mais avec style.",
    "C’est pas moi, c’est la météo."
];

const proverbes = [
    "Qui dort, ne bug pas.",
    "Mieux vaut tard que jamais, sauf pour les deadlines.",
    "Un café offert est à moitié rendu.",
    "À bug insoluble, solution improbable.",
    "Qui ne tente rien... a moins de problèmes.",
    "Il n’y a pas de problème, que des features cachées.",
    "Quand le chat n’est pas là, les bugs dansent.",
    "Un commit par jour éloigne le manager pour toujours.",
    "Ce qui ne te tue pas te donne un ticket JIRA.",
    "La roue tourne, surtout en prod."
];

const blagues = [
    "Pourquoi les plongeurs plongent-ils toujours en arrière et jamais en avant ? Parce que sinon ils tombent dans le bateau.",
    "Pourquoi les canards ont-ils autant d’amis ? Parce qu’ils sont toujours dans leur coin-coin.",
    "Quel est le comble pour un électricien ? De ne pas être au courant.",
    "Pourquoi les squelettes ne se battent-ils jamais entre eux ? Ils n’ont pas le cran.",
    "Pourquoi les développeurs aiment-ils le café ? Parce que sans Java, ils n’ont pas de classe.",
    "Pourquoi les poissons détestent l’ordinateur ? À cause du net.",
    "Pourquoi les maths sont tristes ? Parce qu’elles ont trop de problèmes.",
    "Pourquoi les bananes ne parlent jamais ? Parce qu’elles ont la peau dure.",
    "Pourquoi les poules n’ont-elles pas de seins ? Parce que les coqs n’ont pas de mains.",
    "Pourquoi les licornes ne font jamais de burn-out ? Parce qu’elles vivent dans un monde magique."
];

const premiumBlagues = [
    "Pourquoi les managers aiment les PowerPoint ? Parce que ça donne l’illusion qu’ils travaillent.",
    "Pourquoi le stagiaire ne code jamais de bug ? Parce qu’il ne code jamais.",
    "Pourquoi le café est meilleur payé que toi ? Parce qu’il est toujours chaud au boulot.",
    "Pourquoi le chef de projet ne bronze jamais ? Parce qu’il reste toujours dans l’ombre du dev.",
    "Pourquoi la réunion Zoom a planté ? Parce que c’était la seule chose qui bossait vraiment."
];

let premiumUnlocked = false;
let coffeeCount = 0;
let interactionCount = 0;
const INTERACTION_BEFORE_DON = 8;

// Système de points
let points = 0;
const POINTS_PER_ACTION = 10;
const CONFETTI_THRESHOLD = 100;

// Système d'objectifs
const objectives = {
    COLOR_MODE: {points: 50, unlocked: false, id: 'colorMode'},
    SPECIAL_SOUND: {points: 100, unlocked: false, id: 'specialSound'},
    PREMIUM_JOKES: {points: 500, unlocked: false, id: 'premiumJokes'},
    SECRET: {points: 1000, unlocked: false, id: 'secret'},
    MASTER: {points: 2000, unlocked: false, id: 'master'},
    LEGEND: {points: 5000, unlocked: false, id: 'legend'}
};

// Synchronisation des points avec userStats
function syncPointsFromStats() {
    if (typeof userStats !== "undefined" && typeof userStats.totalPoints === "number") {
        points = userStats.totalPoints;
    }
}

function syncPointsToStats() {
    if (typeof userStats !== "undefined") {
        userStats.totalPoints = points;
        saveStats && saveStats();
    }
}

function addPoints() {
    points += POINTS_PER_ACTION;
    syncPointsToStats();
    updatePointsDisplay();
    checkObjectives();
    if (points % CONFETTI_THRESHOLD === 0) {
        throwConfetti();
        playSound(sounds.special ? 'special' : 'victory');
    }
}

function markRewardAsUnlocked(points) {
    const reward = document.querySelector(`.reward-list p[data-points="${points}"]`);
    if (reward && !reward.getAttribute('data-unlocked')) {
        reward.setAttribute('data-unlocked', 'true');
        if (!reward.innerHTML.includes('✅')) reward.innerHTML += ' ✅';
    }
}

// Synchronise l'affichage des objectifs avec l'état courant
function syncObjectivesDisplay() {
    if (objectives.COLOR_MODE.unlocked) markRewardAsUnlocked(50);
    if (objectives.SPECIAL_SOUND.unlocked) markRewardAsUnlocked(100);
    if (objectives.PREMIUM_JOKES.unlocked) markRewardAsUnlocked(500);
    if (objectives.SECRET.unlocked) markRewardAsUnlocked(1000);
    if (objectives.MASTER.unlocked) {
        markRewardAsUnlocked(2000);
        document.body.classList.add('matrix-mode');
    }
    if (objectives.LEGEND.unlocked) markRewardAsUnlocked(5000);
}

function updatePointsDisplay() {
    const pointsDisplay = document.getElementById('points-display');
    if (pointsDisplay) {
        pointsDisplay.textContent = `🏆 Points: ${points}`;
        if (points > 50) {
            pointsDisplay.style.color = '#ff69b4';
            pointsDisplay.style.fontWeight = 'bold';
        }
    }
    // Mettre à jour l'affichage dans app.js si besoin
    if (typeof ui !== "undefined" && typeof ui.updatePoints === "function") {
        ui.updatePoints(points);
    }
    syncObjectivesDisplay();
}

// Initialisation au chargement
window.addEventListener('DOMContentLoaded', () => {
    // Charger les stats et synchroniser les points
    if (typeof loadStats === "function") loadStats();
    syncPointsFromStats();
    updatePointsDisplay();
    displayRewards();
    checkObjectives(); // Pour synchroniser l'état au chargement
    syncObjectivesDisplay(); // Ajouté pour appliquer matrix-mode au chargement si besoin
});

// Easter eggs
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konami[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konami.length) {
            activateSecretMode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateSecretMode() {
    document.body.style.transform = 'rotate(180deg)';
    setTimeout(() => document.body.style.transform = '', 3000);
    throwConfetti();
    playSound('secret');
    points += 1000;
    updatePointsDisplay();
    showCustomAlert('🎉 Mode secret activé ! +1000 points !');
}

// Confetti
function throwConfetti() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
    script.onload = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    };
    document.body.appendChild(script);
}

function showApp(id) {
    document.querySelectorAll('.app').forEach(el => el.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

function shakeElement(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('shake');
    setTimeout(() => el.classList.remove('shake'), 500);
}

function generateMood() {
    const random = moods[Math.floor(Math.random() * moods.length)];
    document.getElementById('mood-result').textContent = random;
    shakeElement('mood-result');
    addPoints();
    playSound('click');
}

function generatePost() {
    const post = posts[Math.floor(Math.random() * posts.length)];
    document.getElementById("post-result").textContent = post;
    shakeElement('post-result');
    addPoints(); // Ajout des points
    playSound('click');
}

function calculerProductivite() {
    const heures = parseFloat(document.getElementById('heures').value);
    const taches = parseFloat(document.getElementById('taches').value);
    const result = (taches / heures * 100).toFixed(2);
    let message = `Productivité calculée : ${result}%`;
    if (result < 20) message += " - Tu fais illusion, c'est déjà ça.";
    else if (result < 50) message += " - Acceptable si t'es payé en exposure.";
    else if (result <= 100) message += " - Trop efficace, t'es suspect.";
    else message += " - Tu es officiellement une IA ou un mythe LinkedIn.";
    document.getElementById('prod-result').textContent = message;
    shakeElement('prod-result');
    addPoints(); // Ajout des points
}

function lancerReunion() {
    const audio = document.getElementById("call-audio");
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
    document.getElementById("call-result").textContent = "Cette réunion aurait pu être un SMS. (Ou un meme Slack)";
    shakeElement('call-result');
    addPoints(); // Ajout des points
}

function generateCommit() {
    const commit = commits[Math.floor(Math.random() * commits.length)];
    document.getElementById("commit-result").textContent = commit;
    shakeElement('commit-result');
    addPoints(); // Ajout des points
    playSound('click');
}

function generateBullshit() {
    const phrase = bullshits[Math.floor(Math.random() * bullshits.length)];
    document.getElementById("bullshit-result").textContent = phrase;
    shakeElement('bullshit-result');
    addPoints(); // Ajout des points
    playSound('click');
}

function generateCV() {
    interactionCount++;
    const line = cvMytho[Math.floor(Math.random() * cvMytho.length)];
    document.getElementById("cv-result").textContent = line;
    shakeElement('cv-result');
    addPoints(); // Ajout des points
    playSound('click');
    checkDonMessage();
}

function generateExcuse() {
    interactionCount++;
    const excuse = excuses[Math.floor(Math.random() * excuses.length)];
    document.getElementById("excuse-result").textContent = excuse;
    shakeElement('excuse-result');
    addPoints(); // Ajout des points
    playSound('click');
    checkDonMessage();
}

function generateProverbe() {
    interactionCount++;
    const prov = proverbes[Math.floor(Math.random() * proverbes.length)];
    document.getElementById("proverbe-result").textContent = prov;
    shakeElement('proverbe-result');
    addPoints(); // Ajout des points
    playSound('click');
    checkDonMessage();
}

function generateBlague() {
    interactionCount++;
    const blague = blagues[Math.floor(Math.random() * blagues.length)];
    document.getElementById("blague-result").textContent = blague;
    document.getElementById("premium-blague").style.display = "none";
    shakeElement('blague-result');
    addPoints(); // Ajout des points
    playSound('click');
    showIncitation();
    checkDonMessage();
}

function clickCoffee() {
    coffeeCount++;
    interactionCount++;
    document.getElementById('coffee-count').textContent = `Cafés offerts : ${coffeeCount}`;
    let msg = "";
    if (coffeeCount < 5) msg = "Merci ! Mais j'ai encore soif...";
    else if (coffeeCount < 10) msg = "Wow, tu veux me rendre insomniaque ?";
    else if (coffeeCount < 20) msg = "Arrête, je vais finir en caféine pure !";
    else msg = "Tu es officiellement mon sponsor ☕🚀";
    document.getElementById('coffee-message').textContent = msg;
    addPoints(); // Ajout des points
    playSound('click');
    checkDonMessage();
}

// Système de récompenses
const rewards = [
    { points: 50, message: "Bravo ! Tu as débloqué 50 points.", type: "points" },
    { points: 100, message: "Super ! 100 points atteints.", type: "points" },
    { points: 500, message: "Impressionnant ! 500 points, c'est pas du café tiède.", type: "points" },
    { points: 1000, message: "Merveilleux ! Le mode secret t'attend.", type: "mode" },
    { points: 2000, message: "Éblouissant ! Bienvenue dans la matrice.", type: "mode" },
    { points: 5000, message: "Légendaire ! Tu es une véritable légende.", type: "mode" }
];

// Affichage des récompenses débloquées
function displayRewards() {
    const rewardsContainer = document.querySelector('.reward-list');
    if (!rewardsContainer) return;
    rewardsContainer.innerHTML = `
        <p data-points="50">50 points - Débloquer le mode coloré 🌈</p>
        <p data-points="100">100 points - Débloquer un son spécial 🔊</p>
        <p data-points="500">500 points - Débloquer toutes les blagues premium ⭐</p>
        <p data-points="1000">1000 points - Débloquer un secret... 🤫</p>
        <p data-points="2000">2000 points - Mode Matrix 🕶️</p>
        <p data-points="5000">5000 points - Devenir une LÉGENDE 👑</p>
    `;
    // Synchronise l'affichage dès l'affichage des rewards
    syncObjectivesDisplay();
}

// Appel de la fonction pour afficher les récompenses au chargement
window.addEventListener('load', () => {
    displayRewards();
});

// Achievements system
const achievements = {
    FIRST_VISIT: "Premier pas vers l'infinutilité 🎉",
    STREAK_3_DAYS: "Accro à l'inutile depuis 3 jours 🔥",
    POINTS_100: "Maître du temps perdu 🏆",
    ALL_FEATURES: "Explorateur de l'absurde 🗺️"
};

function checkAchievements() {
    if (!userStats.achievements.includes(achievements.FIRST_VISIT)) {
        unlockAchievement(achievements.FIRST_VISIT);
    }
    if (points >= 100 && !userStats.achievements.includes(achievements.POINTS_100)) {
        unlockAchievement(achievements.POINTS_100);
    }
}

function unlockAchievement(achievement) {
    userStats.achievements.push(achievement);
    showAchievementPopup(achievement);
    saveStats();
}

function showAchievementPopup(achievement) {
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
        <h3>🎉 Achievement débloqué !</h3>
        <p>${achievement}</p>
    `;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 3000);
}

// Sons amusants
const sounds = {
    click: new Audio('https://www.soundjay.com/button/button-19.mp3'),
    victory: new Audio('https://www.soundjay.com/misc/coins-1.mp3'),
    secret: new Audio('https://www.soundjay.com/misc/magic-chime-01.mp3'),
    special: new Audio('https://www.soundjay.com/misc/magic-chime-02.mp3')
};

function playSound(type) {
    try {
        if (sounds[type]) {
            sounds[type].currentTime = 0;
            sounds[type].play().catch(() => console.warn("Son désactivé ou non supporté."));
        }
    } catch (error) {
        console.error("Erreur lors de la lecture du son :", error);
    }
}

function resetPoints() {
    points = 0;
    syncPointsToStats();
    updatePointsDisplay();
    saveStats();
    showCustomAlert("Points réinitialisés !");
}

function roulette() {
    const rouletteBtn = document.querySelector('button[onclick*="roulette"]');
    const apps = [
        'mood', 'productivite', 'call', 'linkedin',
        'commit', 'bullshit', 'clicker', 'cvmytho', 
        'excuse', 'proverbe', 'blague'
    ];
    if (!rouletteBtn) return;
    rouletteBtn.style.transform = 'rotate(1080deg)';
    rouletteBtn.style.transition = 'transform 1s cubic-bezier(0.2, 0.8, 0.3, 1)';
    playSound('special');
    setTimeout(() => {
        const randomApp = apps[Math.floor(Math.random() * apps.length)];
        showApp(randomApp);
        shakeElement('app-container');
        rouletteBtn.style.transform = 'rotate(0deg)';
        points += POINTS_PER_ACTION * 2;
        syncPointsToStats();
        updatePointsDisplay();
        showCustomAlert("🎲 Tu as gagné un bonus de points !");
    }, 1000);
}

function partagerLinkedin() {
    const post = document.getElementById("post-result").textContent;
    const url = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(window.location.href);
    if (post) {
        // Copier le post dans le presse-papiers puis ouvrir LinkedIn
        copierTexte(post, "Post copié ! Ouvre LinkedIn pour le coller.");
        window.open(url, "_blank");
    } else {
        showCustomAlert("Génère un post avant de partager !");
    }
}

function partagerSite() {
    const url = window.location.href;
    const text = "Viens perdre du temps et rigoler sur ce site inutile 👉 " + url + " 😜";
    if (navigator.share) {
        navigator.share({
            title: 'DevSaitRienFaire.com',
            text: text,
            url: url
        }).catch(() => {
            copierTexte(text, "Lien copié ! Partage-le à tes amis, collègues, famille, même à ton boss !");
        });
    } else {
        copierTexte(text, "Lien copié ! Partage-le à tes amis, collègues, famille, même à ton boss !");
    }
}

function toggleHelp() {
    const helpContent = document.querySelector('.help-content');
    const helpButton = document.querySelector('.help-button');
    if (!helpContent || !helpButton) return;
    if (helpContent.style.display === 'none' || !helpContent.style.display) {
        helpContent.style.display = 'block';
        helpButton.textContent = '❌ Fermer';
        helpContent.classList.add('help-active');
    } else {
        helpContent.style.display = 'none';
        helpButton.textContent = '❓ Aide';
        helpContent.classList.remove('help-active');
    }
}

// Rappel pour les icônes manifest :
// Placez icon-192x192.png et icon-512x512.png à la racine du projet pour éviter les erreurs 404.

// S'assurer que toutes les fonctions sont globales
window.showApp = showApp;
window.generateMood = generateMood;
window.generatePost = generatePost;
window.generateCommit = generateCommit;
window.generateBullshit = generateBullshit;
window.generateCV = generateCV;
window.generateExcuse = generateExcuse;
window.generateProverbe = generateProverbe;
window.generateBlague = generateBlague;
window.clickCoffee = clickCoffee;
window.calculerProductivite = calculerProductivite;
window.lancerReunion = lancerReunion;
window.roulette = roulette;
window.toggleRetro = toggleRetro;
window.partagerSite = partagerSite;
window.copierPost = copierPost;
window.copierCommit = copierCommit;
window.copierBullshit = copierBullshit;
window.copierCV = copierCV;
window.copierExcuse = copierExcuse;
window.copierProverbe = copierProverbe;
window.copierBlague = copierBlague;
window.showPremiumBlague = showPremiumBlague;
window.toggleHelp = toggleHelp;
window.resetPoints = resetPoints;
window.showCustomAlert = showCustomAlert;
window.copierTexte = copierTexte;
window.showIncitation = showIncitation;
window.checkDonMessage = checkDonMessage;

function checkObjectives() {
    if (points >= 50 && !objectives.COLOR_MODE.unlocked) {
        objectives.COLOR_MODE.unlocked = true;
        document.body.classList.add('color-mode');
        showCustomAlert("🌈 Mode coloré débloqué !");
        playSound('victory');
        markRewardAsUnlocked(50);
    }
    if (points >= 100 && !objectives.SPECIAL_SOUND.unlocked) {
        objectives.SPECIAL_SOUND.unlocked = true;
        showCustomAlert("🔊 Son spécial débloqué !");
        playSound('special');
        markRewardAsUnlocked(100);
    }
    if (points >= 500 && !objectives.PREMIUM_JOKES.unlocked) {
        objectives.PREMIUM_JOKES.unlocked = true;
        premiumUnlocked = true;
        showCustomAlert("⭐ Toutes les blagues premium débloquées !");
        throwConfetti();
        markRewardAsUnlocked(500);
    }
    if (points >= 1000 && !objectives.SECRET.unlocked) {
        objectives.SECRET.unlocked = true;
        showCustomAlert("🤫 Mode secret débloqué ! Utilise le code Konami (↑↑↓↓←→←→BA) !");
        markRewardAsUnlocked(1000);
    }
    if (points >= 2000 && !objectives.MASTER.unlocked) {
        objectives.MASTER.unlocked = true;
        document.body.classList.add('matrix-mode');
        showCustomAlert("🎖️ Mode Matrix débloqué !");
        playSound('special');
        throwConfetti();
        markRewardAsUnlocked(2000);
    }
    if (points >= 5000 && !objectives.LEGEND.unlocked) {
        objectives.LEGEND.unlocked = true;
        document.body.classList.add('legend-mode');
        showCustomAlert("👑 Mode Légende débloqué ! Tu es une légende vivante !");
        markRewardAsUnlocked(5000);
    }
    syncObjectivesDisplay();
}

function toggleRetro() {
    document.body.classList.toggle('retro');
    if (document.body.classList.contains('retro')) {
        showCustomAlert("🕹️ Mode rétro activé ! Bienvenue en 1990 !");
        playSound('special');
        // Charger la police VT323 si besoin
        if (!document.querySelector('link[href*="VT323"]')) {
            const link = document.createElement('link');
            link.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    } else {
        showCustomAlert("👋 Au revoir les années 90 !");
    }
}

function showCustomAlert(message) {
    // Supprime les alertes existantes
    document.querySelectorAll('.custom-alert').forEach(e => e.remove());
    const alert = document.createElement('div');
    alert.className = 'custom-alert';
    alert.innerHTML = `
        <div class="custom-alert-content">${message}</div>
        <button class="custom-alert-button" onclick="this.closest('.custom-alert').remove()">OK</button>
    `;
    document.body.appendChild(alert);
    playSound('click');
}

function copierTexte(texte, message) {
    if (!texte) {
        showCustomAlert("Rien à copier !");
        return;
    }
    if (navigator.clipboard) {
        navigator.clipboard.writeText(texte)
            .then(() => showCustomAlert(message))
            .catch(() => showCustomAlert("Erreur lors de la copie !"));
    } else {
        const textarea = document.createElement("textarea");
        textarea.value = texte;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        showCustomAlert(message);
    }
}

function showIncitation() {
    if (!premiumUnlocked && Math.random() < 0.3) {
        showCustomAlert("🌟 Psst ! Il existe des blagues premium... Offre-moi un café pour les débloquer !");
    }
}

function checkDonMessage() {
    if (interactionCount === INTERACTION_BEFORE_DON) {
        const donMessage = document.getElementById('don-message');
        if (donMessage) {
            donMessage.style.display = 'block';
            showCustomAlert("☕ Hey ! Tu as l'air d'aimer ce site. Un petit café ? 😊");
        }
    }
}

function showPremiumBlague() {
    if (!premiumUnlocked) {
        showCustomAlert("⭐ Les blagues premium sont verrouillées. Offre-moi un café pour les débloquer !");
        return;
    }
    const premiumBlague = premiumBlagues[Math.floor(Math.random() * premiumBlagues.length)];
    const premiumBlagueElement = document.getElementById("premium-blague");
    if (premiumBlagueElement) {
        premiumBlagueElement.textContent = premiumBlague;
        premiumBlagueElement.style.display = "block";
        shakeElement("premium-blague");
        playSound("click");
    }
}

function copierPost() {
    const post = document.getElementById("post-result").textContent;
    copierTexte(post, "Post LinkedIn copié !");
}
function copierCommit() {
    const commit = document.getElementById("commit-result").textContent;
    copierTexte(commit, "Commit copié !");
}
function copierBullshit() {
    const bullshit = document.getElementById("bullshit-result").textContent;
    copierTexte(bullshit, "Bullshit copié !");
}
function copierCV() {
    const cv = document.getElementById("cv-result").textContent;
    copierTexte(cv, "Ligne de CV copiée !");
}
function copierExcuse() {
    const excuse = document.getElementById("excuse-result").textContent;
    copierTexte(excuse, "Excuse copiée !");
}
function copierProverbe() {
    const proverbe = document.getElementById("proverbe-result").textContent;
    copierTexte(proverbe, "Proverbe copié !");
}
function copierBlague() {
    const blague = document.getElementById("blague-result").textContent;
    copierTexte(blague, "Blague copiée !");
}

window.partagerLinkedin = partagerLinkedin;
