const mots = ["pluie", "soleil", "orage", "neige", "brouillard", "chien", "chat", "oiseau", "poisson", "tigre", "table", "chaise", "voiture", "ordinateur", "montre", "france", "espagne", "canada", "japon", "australie", "pomme", "banane", "fraise", "orange", "raisin", "rouge", "vert", "bleu", "jaune", "rose"];
const maxErreurs = 7;

let motCourant = "";
let motDevine = [];
let erreurs = 0;
let essaisRestants = maxErreurs;

const penduImage = document.querySelector(".pendu img");
const motADevinerElement = document.querySelector(".mot-a-deviner");
const historiqueListe = document.querySelector(".historique ul");
const propositionInput = document.getElementById("proposition");
const proposerBouton = document.getElementById("proposer");
const nouvellePartieBouton = document.getElementById("nouvelle-partie");
const essaisRestantsElement = document.getElementById("essais-restants");

function initialiserJeu() {
    essaisRestants = maxErreurs;
    updateEssaisRestants();

    motCourant = mots[Math.floor(Math.random() * mots.length)];
    motDevine = new Array(motCourant.length).fill("_");
    erreurs = 0;
    historique = [];

    motADevinerElement.textContent = motDevine.join(" ");
    chargerImagePendu(erreurs);

    historiqueListe.innerHTML = "";
    propositionInput.disabled = false;
    proposerBouton.disabled = false;
    propositionInput.value = "";
}

function chargerImagePendu() {
    penduImage.src = `img/pendu${erreurs}.png`;
}

function updateAffichage() {
    motADevinerElement.textContent = motDevine.join(" ");
}

function updateEssaisRestants() {
    essaisRestantsElement.textContent = essaisRestants;
}

function verifierProposition(lettre) {
    if (!motCourant.includes(lettre)) {
        erreurs++;
        essaisRestants--;
        chargerImagePendu();
        updateEssaisRestants();
    } else {
        for (let i = 0; i < motCourant.length; i++) {
            if (motCourant[i] === lettre) {
                motDevine[i] = lettre;
            }
        }
        updateAffichage();
    }
}

function mettreAJourHistorique(lettre) {
    historique.push(lettre);
    const elementListe = document.createElement("li");
    elementListe.textContent = lettre;
    historiqueListe.appendChild(elementListe);
}

function verifierVictoire() {
    if (!motDevine.includes("_")) {
        alert("Vous avez gagné !");
        desactiverJeu();
    }
}

function verifierDefaite() {
    if (erreurs === maxErreurs) {
        alert("Désolé, vous avez perdu. Le mot était : " + motCourant);
        desactiverJeu();
    }
}

function desactiverJeu() {
    propositionInput.disabled = true;
    proposerBouton.disabled = true;
}

proposerBouton.addEventListener("click", () => {
    const lettre = propositionInput.value.toLowerCase();
    if (lettre.match(/^[a-z]$/) && !motDevine.includes(lettre)) {
        verifierProposition(lettre);
        updateAffichage();
        mettreAJourHistorique(lettre);
        verifierVictoire();
        verifierDefaite();
        propositionInput.value = "";
    } else {
        alert("Lettre déjà proposée.");
    }
});

nouvellePartieBouton.addEventListener("click", initialiserJeu);

initialiserJeu();
