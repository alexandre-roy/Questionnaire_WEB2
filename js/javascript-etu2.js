/* Fichier javascript pour l'étudiant 2 (Emmanuel Xudous) */

/*global bootstrap*/
/*global DATA_QUIZ*/

import { questionsPourQuestionnaire } from "./javascript-etu1.js";

export function creerPoppover() {
    const titrePoppover = document.getElementById("entetePopover").innerHTML;

    let popover = {
        container: "body",
        title: titrePoppover,
        html: true,
        content: document.getElementById("contenuPopover").innerHTML,
    };

    let boutonPoppover = document.getElementById("boutonAssocie");

    let popoverFin = new bootstrap.Popover(boutonPoppover, popover);
    popoverFin.show();
}

function calculerScore(pNbPoint, PTotalPoint) {
    return Math.round((pNbPoint / PTotalPoint) * 100);
}

function creerHTMLMesReponses() {

    let titre = document.createElement("h2");
    titre.textContent = "Mes réponses";
    titre.classList.add("text-center", "mb-4");
    let textFinal = document.createElement("p");
    textFinal.className = "d-none";
    let offCanvas = document.getElementById("pElementBodyOffCanva");

    questionsPourQuestionnaire.forEach((questionsPourQuestionnaire, index) => {

        let pNbPoint = 0;

        let PTotalPoint = 0;

        let div = document.createElement("div");
        div.classList.add("card", "mb-4", "border-0");

        let divHeader = document.createElement("div");

        let entete = document.createElement("h5");
        let strong = document.createElement("strong");
        strong.textContent = `Question ${index + 1} - Module ${questionsPourQuestionnaire.modulesId} (${DATA_QUIZ.modules[questionsPourQuestionnaire.modulesId].titre})`;

        let pQuestion = document.createElement("p");
        pQuestion.textContent = questionsPourQuestionnaire.titre;

        let pReponse = document.createElement("p");
        let pSReponse = document.createElement("strong");
        pSReponse.textContent = `Votre réponse: ${questionsPourQuestionnaire.mesReponses}`;

        div.appendChild(divHeader);
        divHeader.appendChild(entete);
        entete.appendChild(strong);
        divHeader.appendChild(pQuestion);
        divHeader.appendChild(pReponse);
        pReponse.appendChild(pSReponse);
        let pPointage = document.createElement("p");
        let pBoiteTexte = document.createElement("p");
        if (questionsPourQuestionnaire.bonneReponse) {

            let divBody = document.createElement("div");
            pPointage.textContent = "1 / 1";
            pPointage.className = "text-success";
            pBoiteTexte.textContent = questionsPourQuestionnaire.retroactionPositive;
            pBoiteTexte.className = "text-success";
            pNbPoint += 1;
            PTotalPoint += 1;
            div.appendChild(divBody);
            divBody.appendChild(pPointage);
            divBody.appendChild(pBoiteTexte);

        } else {
            let divBody = document.createElement("div");
            pPointage.textContent = " 0 / 1";
            pPointage.className = "text-error";
            pBoiteTexte.textContent = questionsPourQuestionnaire.retroactionNegative;
            pBoiteTexte.className = "text-red";
            PTotalPoint += 1;
            div.appendChild(divBody);
            divBody.appendChild(pPointage);
            divBody.appendChild(pBoiteTexte);
        }

        let divFooter = document.createElement("div");
        let tScore = document.createElement("h2");
        let tScoreStrong = document.createElement("strong");
        tScoreStrong.textContent = "Votre score";
        let pScore = document.createElement("p");
        pScore.textContent = "Voici le total de vos points :";
        let pTScore = document.createElement("h3");
        let PTSScore = document.createElement("strong");
        PTSScore.textContent = "Bonne(s) réponse(s) :";
        let Score = document.createElement("p");
        Score.textContent = `${pNbPoint} / ${PTotalPoint}`;
        let tPourcentage = document.createElement("h3");
        let tSPourcentage = document.createElement("strong");
        tSPourcentage.textContent = "Score :";
        let pPourcentage = document.createElement("p");
        pPourcentage.textContent = `${calculerScore(pNbPoint, PTotalPoint)}%`;
        if (pNbPoint / PTotalPoint >= 0.5) {
            Score.className = "text-success";
            pPourcentage.className = "bg-success";
        }
        else {
            Score.className = "text-warning";
            pPourcentage.className = "bg-warning";
        }

        textFinal.textContent += `${strong.textContent} ${pQuestion.textContent} ${pSReponse.textContent} ${pPointage.textContent} ${pBoiteTexte.textContent} ${tScoreStrong.textContent} ${pScore.textContent} ${PTSScore.textContent} ${Score.textContent} ${tSPourcentage.textContent} ${pPourcentage.textContent}`;

        div.appendChild(divFooter);
        divFooter.appendChild(tScore);
        tScore.appendChild(tScoreStrong);
        divFooter.appendChild(pScore);
        divFooter.appendChild(pTScore);
        pTScore.appendChild(PTSScore);
        divFooter.appendChild(Score);
        divFooter.appendChild(tPourcentage);
        tPourcentage.appendChild(tSPourcentage);
        divFooter.appendChild(pPourcentage);
        offCanvas.appendChild(div);
    });

}

export function remplirOffCanvas() {
    let offCanvas = document.getElementById("pElementBodyOffCanva");
    let bdiv = document.createElement("div");
    bdiv.className = "container";

    let titre = document.createElement("h2");
    titre.textContent = "Mes réponses";

    bdiv.prepend(titre);
    offCanvas.appendChild(bdiv);
    creerHTMLMesReponses();
    creerFormulaireEnvoieReponses();
}

function creerFormulaireEnvoieReponses() {

    document.getElementById("boutonEnvoyer").addEventListener("click", function (event) {
        event.preventDefault();

        if (validerFormulaireEnvoiReponses(nom, courriel)) {

            let mailtoLink = `mailto:${courriel}?subject=Quiz%20web2&body=${textFinal.textContent}`;

            window.location.href = mailtoLink;
        }
    });
}

function validerFormulaireEnvoiReponses(nom, courriel) {

    let nomValid = false;

    if (nom.value.trim() != "") {
        if (nom.length >= 2) {
            if (nom[0] != nom[0].toUpperCase()) {
                nom.classList.add("is-valid");
                nomValid = true;

            }
            else {
                nom.classList.add("is-invalid");
            }
        }
        else {
            nom.classList.add("is-invalid");
        }

    }
    else {
        nom.classList.add("is-invalid");
    }

    let regexCourriel = /^.+@.+/.test(courriel.value);
    if (regexCourriel) {
        courriel.classList.add("is-valid");
    }
    else {
        courriel.classList.add("is-invalid");
    }
    return nomValid && regexCourriel;
}