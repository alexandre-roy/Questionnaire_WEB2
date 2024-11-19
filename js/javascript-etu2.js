/**
 *  Fichier principal javascript
 */
"use strict";

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
    const contenuPoppover = document.getElementById(pIdContenuPopover);
    const boutonPoppover = document.getElementById(pIdBoutonAssocie);
    const popoverTitle = document.createElement("h4");
    const popoverContenu = document.createElement("p");
    const popoverContainer = document.createElement("div");

    popoverContenu.textContent = contenuPoppover.textContent;
    popoverTitle.textContent = pEntete;

    popoverContainer.appendChild(popoverTitle);
    popoverContainer.appendChild(popoverContenu);

    const poppover = new bootstrap.Popover(boutonPoppover, {
        content: popoverContainer,
        title: pEntete,
        trigger: "click",
    });
    boutonPoppover.addEventListener("click", function () {
        poppover.toggle();
    });
}
