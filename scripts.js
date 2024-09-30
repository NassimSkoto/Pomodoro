let minute = 0;
let seconde = 0;
let travailler = true;
let interval;
let pause = true;

const settingsButton = document.getElementById("settingsButton");
const settings = document.getElementById("settings");
const body = document.body;

settingsButton.addEventListener("click", function () {
    settings.classList.toggle("hidden");
});

// Fonction pour démarrer le timer
function start(tempsTravaille, tempsRepos) {
    clearInterval(interval);
    interval = setInterval(() => {
        afficheTime();
    }, 1000);
}

// Fonction pour afficher le temps
function afficheTime() {
    if (!pause) {
        if (minute <= 0 && seconde <= 0) {
            travailler = !travailler;
            minute = travailler ? parseInt(document.getElementById("workTime").value) : parseInt(document.getElementById("breakTime").value);
            seconde = 0;
            updateStatusText(); // Mettre à jour le texte de statut
            updateBackground(); // Mettre à jour la couleur de fond
        }
        if (seconde === 0 && minute > 0) {
            minute--;
            seconde = 59;
        } else if (seconde > 0) {
            seconde--;
        }
        updateDisplay();
    }
}

// Met à jour l'affichage du timer
function updateDisplay() {
    document.getElementById("timerID").textContent =
        minute + ":" + (seconde < 10 ? "0" + seconde : seconde);
}

// Met à jour l'affichage du statut (travail/pause)
function updateStatusText() {
    const statusText = document.getElementById("statusText");
    statusText.textContent = travailler ? "Mode : Travail" : "Mode : Pause";
}

// Met à jour la couleur de fond
function updateBackground() {
    body.style.backgroundColor = travailler ? "#ff2600" : "#00ccff"; // Rouge pour travail, bleu pour pause
}

// Fonction pour démarrer ou mettre en pause le timer
document.getElementById("startButton").addEventListener("click", function () {
    const tempsTravaille = parseInt(document.getElementById("workTime").value);
    const tempsRepos = parseInt(document.getElementById("breakTime").value);
    
    if (isNaN(tempsTravaille) || isNaN(tempsRepos) || tempsTravaille <= 0 || tempsRepos <= 0) {
        alert("Veuillez entrer des valeurs valides pour le travail et le repos.");
        return;
    }
    minute = tempsTravaille;
    seconde = 0;
    travailler = true;
    updateDisplay();
    updateStatusText(); // Mettre à jour le texte de statut au démarrage
    updateBackground(); // Mettre à jour la couleur de fond au démarrage
    start(tempsTravaille, tempsRepos);
    pause = !pause;
    this.innerHTML = pause ? "&#9654;" : "&#x2B6F;";
});
