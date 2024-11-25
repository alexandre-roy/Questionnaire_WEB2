/* Fichier javascript pour l'étudiant 2 (Emmanuel Xudous) */

/*global bootstrap*/
/*global DATA_QUIZ*/

import { questionsPourQuestionnaire } from "./javascript-etu1.js";

/**
 * Permet de créer un popover sur le bouton terminer le questonnaire.
 *
 * @author emmanuel-xudous
 */
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


/**
 * Permet de calculer le score de l'utilisateur pour le questionnaire.
 *
 * @param {number} pNBPoints - Nombre de point accumulé par l'utilisateur.
 * @param {number} pTotalPoint - Nombre total de point possible.
 * @author emmanuel-xudous
 */
function calculerScore(pNbPoint, pTotalPoint) {
    return Math.round((pNbPoint / pTotalPoint) * 100);
}

/**
 * Permet de cr/er le HTML pour les réponses de l'utilisateur dans le offCanvas.
 *
 * @author emmanuel-xudous
 */
function creerHTMLMesReponses() {

    let offCanvas = document.getElementById("pElementBodyOffCanva");

    let pNbPoint = 0;

    let pTotalPoint = 0;

    questionsPourQuestionnaire.forEach((questionsPourQuestionnaire, index) => {

        let div = document.createElement("div");
        div.classList.add("card", "mb-4", "border-0");

        let divHeader = document.createElement("div");

        let entete = document.createElement("h5");
        let strong = document.createElement("strong");
        strong.textContent = `Question ${index + 1} - Module ${questionsPourQuestionnaire.modulesId} (${DATA_QUIZ.modules[questionsPourQuestionnaire.modulesId].titre})`;

        let pQuestion = document.createElement("p");
        pQuestion.textContent = questionsPourQuestionnaire.titre;

        let indice;

        let reponse = [];

        let pReponse = document.createElement("p");
        let pSReponse = document.createElement("strong");
        pSReponse.textContent = "Votre réponse: ";


        for (let i = 0; i < DATA_QUIZ.banque_questions.length; i++) {
            if (DATA_QUIZ.banque_questions[i].titre == questionsPourQuestionnaire.titre) {
                indice = i;
            }
        }
        if (questionsPourQuestionnaire.repUtilisateur.length > 1){
            pSReponse.textContent = "Vos réponses: ";
            for (let i = 0; i < questionsPourQuestionnaire.repUtilisateur.length; i++) {
                reponse[i] = DATA_QUIZ.banque_questions[indice].choixReponses[questionsPourQuestionnaire.repUtilisateur[i]];
                if (i < questionsPourQuestionnaire.repUtilisateur.length - 1) {
                    pSReponse.textContent += `${reponse[i]}, `;
                } else {
                    pSReponse.textContent += `${reponse[i]}`;
                }
            }
        }
        else{
            reponse = DATA_QUIZ.banque_questions[indice].choixReponses[questionsPourQuestionnaire.repUtilisateur];
            pSReponse.textContent += `${reponse}`;
        }
        
        div.appendChild(divHeader);
        entete.appendChild(strong);
        divHeader.appendChild(entete);
        divHeader.appendChild(pQuestion);
        divHeader.appendChild(pReponse);
        pReponse.appendChild(pSReponse);
        let pPointage = document.createElement("p");
        let pBoiteTexte = document.createElement("p");
        if (questionsPourQuestionnaire.maReponse) {

            let divBody = document.createElement("div");
            pPointage.textContent = "1 / 1";
            let divc = document.createElement("div");
            divc.className = "d-flex align-items-start";
            let divs = document.createElement("div");
            divs.className = "alert alert-success";
            let icon = document.createElement("i");
            icon.className = "bi bi-check-circle-fill text-success me-3";
            icon.style.fontSize = "2rem";
            pPointage.className = "text-success";
            pBoiteTexte.textContent = questionsPourQuestionnaire.retroactionPositive;
            pBoiteTexte.className = "text-success";
            pNbPoint += 1;
            pTotalPoint += 1;
            divBody.appendChild(pPointage);
            divc.appendChild(icon);
            divc.appendChild(divs);
            divBody.appendChild(divc);
            div.appendChild(divBody);
            divs.appendChild(pBoiteTexte);
        } else {
            let divBody = document.createElement("div");
            pPointage.textContent = " 0 / 1";
            let divc = document.createElement("div");
            divc.className = "d-flex align-items-start";
            let divs = document.createElement("div");
            divs.className = "alert alert-danger";
            let icon = document.createElement("i");
            icon.className = "bi bi-x-circle-fill text-danger me-3";
            icon.style.fontSize = "2rem";
            pPointage.className = "text-danger";
            pBoiteTexte.textContent = questionsPourQuestionnaire.retroactionNegative;
            pBoiteTexte.className = "text-danger";
            pTotalPoint += 1;
            divBody.appendChild(pPointage);
            divc.appendChild(icon);
            divc.appendChild(divs);
            divBody.appendChild(divc);
            div.appendChild(divBody);
            divs.appendChild(pBoiteTexte);
        }
        offCanvas.appendChild(div);
    });

    let divFooter = document.createElement("div");

    let tScore = document.createElement("h2");
    tScore.textContent = "Votre score :";
    
    let Score = document.createElement("p");
    Score.textContent = `${pNbPoint} / ${pTotalPoint}`;
    
    let tPourcentage = document.createElement("h3");
    tPourcentage.textContent = "Score :";
    
    let pPourcentage = document.createElement("p");
    pPourcentage.textContent = `${calculerScore(pNbPoint, pTotalPoint)}%`;
        
    if (pNbPoint / pTotalPoint >= 0.5) {
        Score.className = "text-success";
        pPourcentage.className = "bg-danger text-white py-4 fs-1 d-flex justify-content-center align-items-center";
    } else {
        Score.className = "text-danger";
        pPourcentage.className = "bg-danger text-white py-4 fs-1 d-flex justify-content-center align-items-center";
    }
    
    divFooter.appendChild(tScore);
    divFooter.appendChild(Score);
    divFooter.appendChild(tPourcentage);
    divFooter.appendChild(pPourcentage);
    offCanvas.appendChild(divFooter);
}

/**
 * Permet de remplir le offCanvas avec les réponses de l'utilisateur.
 *
 * @author emmanuel-xudous
 */

export function remplirOffCanvas() {
    let offCanvas = document.getElementById("pElementBodyOffCanva");
    let bdiv = document.createElement("div");
    bdiv.className = "container";
    offCanvas.appendChild(bdiv);
    creerHTMLMesReponses();
    creerFormulaireEnvoieReponses();
}

/**
 * Permet de créer le formulaire pour envoyer les réponses de l'utilisateur.
 *
 * @author emmanuel-xudous
 */
function creerFormulaireEnvoieReponses() {

    document.getElementById("boutonEnvoyer").addEventListener("click", function (event) {
        event.preventDefault();

        if (validerFormulaireEnvoiReponses(nom, courriel)) {

            let mailtoLink = `mailto:${courriel.value}?subject=Quiz%20web2&body=${document.getElementById("pElementBodyOffCanva").textContent}`;

            window.location.href = mailtoLink;
        }
    });
    nom.addEventListener("blur", function () {
        validerFormulaireEnvoiReponses(nom, courriel);
    });
    courriel.addEventListener("blur", function () {
        validerFormulaireEnvoiReponses(nom, courriel);
    });
}

/**
 * Valide le formulaire pour envoyer les réponses de l'utilisateur.
 *
 * @param {string} nom - nom de l'utilisateur.
 * @param {string} courriel - courriel de l'utilisateur.
 * @author emmanuel-xudous
 */

function validerFormulaireEnvoiReponses(nom, courriel) {

    let nomValid = false;

    if (nom.value.trim() != "") {
        if (nom.value.length >= 2) {
            if (nom.value[0] == nom.value[0].toUpperCase()) {
                nom.classList.add("is-valid");
                nom.classList.remove("is-invalid");
                nomValid = true;
            }
            else {
                nom.classList.add("is-invalid");
                nom.classList.remove("is-valid");
            }
        }
        else {
            nom.classList.add("is-invalid");
            nom.classList.remove("is-valid"); 
        }
    }
    else {
        nom.classList.add("is-invalid");
        nom.classList.remove("is-valid");
    }

    let courielvalid= false;
    let regexCourriel = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regexCourriel.test(courriel.value)) {
        courriel.classList.add("is-valid");
        courriel.classList.remove("is-invalid");
        courielvalid = true;
    } else {
        courriel.classList.add("is-invalid");
        courriel.classList.remove("is-valid");
    }
    console.log(nomValid && courielvalid);
    return nomValid && courielvalid;
}

/**
 * Telecharge les réponses de l'utilisateur dans une nouvelle page HTML.
 *
 * @author emmanuel-xudous
 */
export function telechargerReponses() {

    let offCanvasHTML = document.getElementById("pElementBodyOffCanva").outerHTML;

    let fichier = new File(["\ufeff"+offCanvasHTML], "MesReponses.html", {type: "text/plain:charset=UTF-8"});

    let url = window.URL.createObjectURL(fichier);
    let a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "MesReponses.html";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
}

