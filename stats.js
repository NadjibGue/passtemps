function saveStats() {
    localStorage.setItem('userStats', JSON.stringify(userStats));
}

function loadStats() {
    try {
        const saved = localStorage.getItem('userStats');
        if (saved) {
            Object.assign(userStats, JSON.parse(saved));
        }
        updateStreakDisplay();
    } catch (error) {
        console.error("Erreur lors du chargement des statistiques :", error);
    }
}

function updateStreakDisplay() {
    const streakElement = document.getElementById('streak-display');
    if (streakElement) {
        streakElement.textContent = `🔥 ${userStats.streakDays} jours de streak!`;
    }
}
