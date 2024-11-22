/**
 *  Fichier principal javascript
 */
"use strict";
/*global bootstrap*/
/*global DATA_QUIZ*/
/*global questionsPourQuestionnaire*/


function creerPoppover(){
    const titrePoppover = document.getElementById("entetePopover").innerHTML;

    let popover = {
        container: "body",
        title: titrePoppover,
        html : true,
        content: document.getElementById("contenuPopover").innerHTML,
    };

    let boutonPoppover = document.getElementById("boutonAssocie");

    new bootstrap.Popover(boutonPoppover, popover);
}

function calculerScore(pNbPoint, PTotalPoint){
    return Math.round((pNbPoint / PTotalPoint) * 100);
}

function creerHTMLMesReponses(){
    let titre = document.createElement("h2");
    titre.textContent = "Mes réponses";

    questionsPourQuestionnaire.forEach((questionsPourQuestionnaire, index) => {

        let pNbPoint = 0;

        let PTotalPoint = 0;

        let div = document.createElement("div");

        let divHeader = document.createElement("div");
        divHeader.className = "toast-header";
        
        let entete = document.createElement("h2");
        
        let strong = document.createElement("strong");
        strong.textContent = `Question ${index + 1} - Module ${questionsPourQuestionnaire.modulesId} (${DATA_QUIZ.modules[questionsPourQuestionnaire.modulesId - 1].titre})`;
        
        let pQuestion = document.createElement("p");
        pQuestion.textContent = questionsPourQuestionnaire.titre;

        let pReponse = document.createElement("p");
        let pSReponse = document.createElement("strong");
        pSReponse.textContent = `Votre réponse: ${"skibidi"}`;
        
        div.appendChild(divHeader);
        divHeader.appendChild(entete);
        entete.appendChild(strong);
        divHeader.appendChild(pQuestion);
        divHeader.appendChild(pReponse);
        pReponse.appendChild(pSReponse);

        if(reponses.includes(reponse)){

            let divBody = document.createElement("div");
            let pPointage = document.createElement("p");
            pPointage.textContent = ` 1 / 1`;
            pPointage.className = "text-success";
            let pBoiteTexte = document.createElement("p");
            pBoiteTexte.textContent = questionsPourQuestionnaire.retroactionPositive;
            pBoiteTexte.className = "text-success";
            pNbPoint += 1;
            PTotalPoint += 1;
            div.appendChild(divBody);
            divBody.appendChild(pPointage);
            divBody.appendChild(pBoiteTexte);
            
        } else {
            let divBody = document.createElement("div");
            let pPointage = document.createElement("p");
            pPointage.textContent = " 0 / 1";
            pPointage.className = "text-warning";
            let pBoiteTexte = document.createElement("p");
            pBoiteTexte.textContent = questionsPourQuestionnaire.retroactionNegative;
            pBoiteTexte.className = "text-warning";
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
        if (pNbPoint / PTotalPoint >= 0.5){
            Score.className = "text-success";
            pPourcentage.className = "bg-success";
        }
        else
        {
            Score.className = "text-warning";
            pPourcentage.className = "bg-warning";
        }
            
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

    });
}

function remplirOffCanvas(){
    let offCanvas = document.getElementById("offcanvas");
    let div = document.createElement("div");
    div.className = "container";

    let titre = document.createElement("h1");
    titre.textContent = "Résultats du quiz";

    let divMesReponses = creerHTMLMesReponses();
    div.appendChild(titre);
    div.appendChild(divMesReponses);
    offCanvas.appendChild(div);
    creerFormulaireEnvoieReponses();
}

function creerFormulaireEnvoieReponses(){

    let pElementBodyOffCanva = document.getElementById("pElementBodyOffCanva");

    let form = document.createElement("form");
    form.method = "get";

    let titre = document.createElement("h4");
    titre.textContent = "Envoyer mes resultats";

    let divNom = document.createElement("div");
    divNom.className = "my-2";

    let nomLabel = document.createElement("label");
    nomLabel.textContent = "Nom:";
    nomLabel.for = "nom";

    let nom = document.createElement("input");
    nom.type = "text";
    nom.name = "nom";
    nom.required = true;
    nom.className ="form-control";

    let divCourriel = document.createElement("div");
    divCourriel.className = "my-2";

    let courrielLabel = document.createElement("label");
    courrielLabel.textContent = "Courriel:";
    courrielLabel.for = "courriel";

    let courriel = document.createElement("input");
    courriel.type = "email";
    courriel.name = "courriel";
    courriel.required = true;
    courriel.className ="form-control";

    let bouton = document.createElement("button");
    bouton.type = "submit";
    bouton.className = "btn btn-primary text-info py-1 w-100";
    bouton.textContent = "Envoyer";

    form.appendChild(titre);
    form.appendChild(divNom);
    divNom.appendChild(nomLabel);
    divNom.appendChild(nom);
    divCourriel.appendChild(courrielLabel);
    divCourriel.appendChild(courriel);
    form.appendChild(divNom);
    form.appendChild(divCourriel);
    form.appendChild(bouton);
    pElementBodyOffCanva.appendChild(form);
}