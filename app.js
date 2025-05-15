class UIManager {
    constructor() {
        this.loadingStates = new Map();
    }

    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('loading');
            this.loadingStates.set(elementId, true);
        }
    }

    hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('loading');
            this.loadingStates.delete(elementId);
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    updatePoints(points) {
        const display = document.getElementById('points-display');
        if (display) {
            display.textContent = `🏆 ${points} points`;
            display.style.transform = 'scale(1.1)';
            setTimeout(() => display.style.transform = 'scale(1)', 200);
        }
    }

    initializeEventListeners() {
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', () => {
                playSound('click');
                button.classList.add('clicked');
                setTimeout(() => button.classList.remove('clicked'), 200);
            });
        });
    }
}

// Initialize UI Manager
const ui = new UIManager();
window.addEventListener('load', () => ui.initializeEventListeners());

// Export for use in other files
window.ui = ui;

const userStats = {
    visitsCount: 0,
    totalPoints: 0,
    achievements: [],
    lastVisit: null,
    streakDays: 0
};

function checkDailyStreak() {
    const now = new Date();
    const last = userStats.lastVisit ? new Date(userStats.lastVisit) : null;
    
    if (last) {
        const timeDiff = now - last;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        if (daysDiff === 1) {
            userStats.streakDays++;
            showCustomAlert(`🔥 ${userStats.streakDays} jours de streak! Continue comme ça!`);
        } else if (daysDiff > 1) {
            userStats.streakDays = 1;
        }
    } else {
        userStats.streakDays = 1;
    }
    
    userStats.lastVisit = now.toISOString();
    saveStats();
    updateStreakDisplay();
}

function updateStreakDisplay() {
    const streakElement = document.getElementById('streak-display');
    if (streakElement) {
        streakElement.textContent = `🔥 ${userStats.streakDays} jours de streak!`;
    }
}

class TutorialManager {
    constructor() {
        this.steps = [
            {
                element: '#points-display',
                message: '🎯 Gagne des points en interagissant avec le site!',
                position: 'bottom'
            },
            {
                element: '.rewards',
                message: '🎁 Débloque des récompenses avec tes points!',
                position: 'top'
            },
            {
                element: 'button[onclick*="roulette"]',
                message: '🎲 Clique ici pour découvrir une fonction au hasard!',
                position: 'left'
            }
        ];
        this.currentStep = 0;
        this.currentTooltip = null;
    }

    start() {
        if (!localStorage.getItem('tutorialDone')) {
            this.showNextStep();
        }
    }

    showNextStep() {
        // Supprimer le tooltip précédent s'il existe
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }

        if (this.currentStep >= this.steps.length) {
            localStorage.setItem('tutorialDone', 'true');
            return;
        }

        const step = this.steps[this.currentStep];
        this.showTooltip(step);
        this.currentStep++;
    }

    showTooltip(step) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tutorial-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">${step.message}</div>
            <button onclick="tutorial.showNextStep()">Suivant</button>
        `;
        
        const element = document.querySelector(step.element);
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        
        // Positionnement
        switch(step.position) {
            case 'bottom':
                tooltip.style.position = 'fixed';
                tooltip.style.top = `${rect.bottom + 10}px`;
                tooltip.style.left = `${rect.left + (rect.width/2)}px`;
                tooltip.style.transform = 'translateX(-50%)';
                break;
            case 'top':
                tooltip.style.position = 'fixed';
                tooltip.style.bottom = `${window.innerHeight - rect.top + 10}px`;
                tooltip.style.left = `${rect.left + (rect.width/2)}px`;
                tooltip.style.transform = 'translateX(-50%)';
                break;
            case 'left':
                tooltip.style.position = 'fixed';
                tooltip.style.top = `${rect.top + (rect.height/2)}px`;
                tooltip.style.left = `${rect.left - 10}px`;
                tooltip.style.transform = 'translate(-100%, -50%)';
                break;
        }
        
        document.body.appendChild(tooltip);
        this.currentTooltip = tooltip;
    }
}

// Initialisation
const tutorial = new TutorialManager();
window.addEventListener('load', () => {
    ui.initializeEventListeners();
    tutorial.start();
});

class AppGuide {
    constructor() {
        this.guideSteps = {
            mood: "Découvre ton état d'esprit dev du jour 😶‍🌫️",
            productivite: "Calcule ton niveau de procrastination 📈",
            roulette: "Tente ta chance avec la roulette ! 🎲",
            premium: "Débloque des contenus exclusifs ⭐"
        };
        this.seen = new Set();
    }

    show(appId) {
        if (this.seen.has(appId)) return;
        
        const message = this.guideSteps[appId];
        if (!message) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'feature-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">${message}</div>
            <button onclick="this.parentElement.remove()">Compris !</button>
        `;
        
        const app = document.getElementById(appId);
        if (app) {
            app.appendChild(tooltip);
            this.seen.add(appId);
        }
    }
}

const guide = new AppGuide();

// Amélioration du feedback utilisateur
function showFeedback(message, type = 'success') {
    const feedback = document.createElement('div');
    feedback.className = `feedback ${type}`;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 3000);
}

// Ajouter à la fin du fichier
function updateVisitCounter() {
    const visits = parseInt(localStorage.getItem('totalVisits') || '0') + 1;
    localStorage.setItem('totalVisits', visits);
    const counter = document.getElementById('counter');
    if (counter) {
        counter.textContent = visits;
    }
}

window.addEventListener('load', () => {
    // ...existing code...
    updateVisitCounter();
});
