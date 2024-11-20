/**
 *  Fichier principal javascript
 */
"use strict";
/*global bootstrap*/

const questions = [
    {
        modulesId: 0,
        titre: "Quels éléments sont couramment utilisés pour structurer une page web?",
        typeQuestion: "checkbox",
        retroactionPositive: "Correct ! Les éléments tels que <header>, <nav>, <main>, <footer> sont couramment utilisés pour structurer une page web.",
        retroactionNegative: "Pas tout à fait. Il y a plusieurs éléments importants pour la structure d'une page web.",
        categories: ["HTML", "Structure"],
        choixReponses: ["<header>", "<article>", "<nav>", "<footer>", "<main>"],
        reponses: [0, 2, 3], // Les index des bonnes réponses (dans ce cas, 0, 2, 3).
        pointageQuestion: 4,
        reponsesUtilisateur: "<header>"
    },
    {
        modulesId: 1,
        titre: "Quel sélecteur CSS est utilisé pour cibler les éléments de type 'p' qui sont dans un élément de classe 'article'?",
        typeQuestion: "radio",
        retroactionPositive: "Exact ! Le sélecteur '.article p' cible les éléments 'p' dans un élément de classe 'article'.",
        retroactionNegative: "Ce n'est pas la bonne réponse. Veuillez revoir les sélecteurs CSS pour les éléments imbriqués.",
        categories: ["CSS", "Sélecteurs"],
        choixReponses: ".article p, #article p, :nth-child(odd), p.article",
        reponses: [0], // L'index de la bonne réponse (dans ce cas, 0 pour ".article p").
        pointageQuestion: 4,
        reponsesUtilisateur: ".article p"
    },
    {
        modulesId: 3,
            titre: "Quelle commande Git est utilisée pour cloner un référentiel distant sur votre ordinateur local?",
            typeQuestion: "radio",
            retroactionPositive: "Correct ! La commande 'git clone' est utilisée pour cloner un référentiel distant sur votre ordinateur local.",
            retroactionNegative: "Pas tout à fait. Assurez-vous d'utiliser la commande 'git clone' pour cloner un référentiel distant.",
            categories: ["Git", "Commandes Git"],
            choixReponses: ["git pull", "git push", "git commit", "git clone"],
            reponses: [3], // L'index de la bonne réponse (dans ce cas, 3 pour "git clone").
            pointageQuestion: 4,
            reponsesUtilisateur: "git pull"
    }
];

function creerPoppover(pIdContenuPopover, pIdBoutonAssocie, pEntete){
    const contenuPoppover = document.getElementById(pIdContenuPopover).innerHTML;
    const boutonPoppover = document.getElementById(pIdBoutonAssocie);
    const titrePoppover = document.getElementById(pEntete);

    let popover = {
        container: "body",
        title: titrePoppover,
        html : true,
        content: contenuPoppover
    };
    new bootstrap.Popover(boutonPoppover, popover);
}

function calculerScore(pNbPoint, PTotalPoint){
    return Math.round((pNbPoint / PTotalPoint) * 100);
}

function creerHTMLMesReponses(){
    let titre = document.createElement("h2");
    titre.textContent = "Mes réponses";

    questions.forEach((question, index) => {
        let reponse = question.reponsesUtilisateur;
        let reponses = question.reponses;
        let pointage = question.pointageQuestion;
        let titre = question.titre;
        let retroactionPositive = question.retroactionPositive;
        let retroactionNegative = question.retroactionNegative;
        let moduleNumero = question.moduleNumero;
        let moduleTitre = question.moduleTitre;

        let div = document.createElement("div");

        let divHeader = document.createElement("div");
        divHeader.className = "toast-header";
        
        let entete = document.createElement("h2");
        
        let strong = document.createElement("strong");
        strong.textContent = `Question ${index + 1} - Module ${moduleNumero} (${moduleTitre})`;
        
        let pQuestion = document.createElement("p");
        pQuestion.textContent = titre;

        let pReponse = document.createElement("p");
        let pSReponnse = document.createElement("strong");
        pSReponse.textContent = `Votre réponse: ${reponse}`;
        
        div.appendChild(divHeader);
        divHeader.appendChild(entete);
        entete.appendChild(strong);
        divHeader.appendChild(pQuestion);
        divHeader.appendChild(pReponse);
        pReponse.appendChild(pSReponse);

        if(reponses.includes(reponse)){

            let divBody = document.createElement("div");
            let pPointage = document.createElement("p");
            pPointage.textContent = ` 1 /${pointage}`;
            pPointage.className = "text-success";
            let pBoiteTexte = document.createElement("p");
            pBoiteTexte.textContent = retroactionPositive;
            pBoiteTexte.className = "text-success";
            pNbPoint += pointage;
            PTotalPoint += 1;
            
        } else {
            let divBody = document.createElement("div");
            let pPointage = document.createElement("p");
            pPointage.textContent = ` 0 /${pointage}`;
            pPointage.className = "text-warning";
            let pBoiteTexte = document.createElement("p");
            pBoiteTexte.textContent = retroactionNegative;
            pBoiteTexte.className = "text-warning";
            PTotalPoint += 1;
        }

        div.appendChild(divBody);
        divBody.appendChild(pPointage);
        divBody.appendChild(pBoiteTexte);

        let divFooter = document.createElement("div");
        let tScore = document.createElement("h2");
        let tScoreStrong = document.createElement("strong");
        tScoreStrong.textContent = "Votre score";
        let pScore = document.createElement("p");
        pScore.textContent = `Voici le total de vos points :`;
        let pTScore = document.createElement("h3");
        let PTSScore = document.createElement("strong");
        PTSScore.textContent = `Bonne(s) réponse(s) :`;
        let Score = document.createElement("p");
        Score.textContent = `${pNbPoint} / ${PTotalPoint}`;
        let tPourcentage = document.createElement("h3");
        tSPourcentage = document.createElement("strong");
        tSPourcentage.textContent = `Score :`;
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
    let offCanvas = document.getElementById("offCanvasContent");
    let div = document.createElement("div");
    div.className = "container";

    let titre = document.createElement("h1");
    titre.textContent = "Résultats du quiz";

    let divMesReponses = creerHTMLMesReponses();
    div.appendChild(titre);
    div.appendChild(divMesReponses);
    offCanvas.appendChild(div);
}