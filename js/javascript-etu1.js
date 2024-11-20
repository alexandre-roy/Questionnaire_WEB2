/**
 *  Fichier principal javascript
 */
"use strict";

/*global DATA_QUIZ*/


function creerCards(pNoModule, pImage, pTitre, pDescription) {
  let rowDiv = document.getElementById("modules-theoriques");
  rowDiv.className = "row";

  let colDiv = document.createElement("div");
  colDiv.className = "col-lg-4 col-sm-6 p-3";

  let cardDiv = document.createElement("div");
  cardDiv.className = "card";

  let img = document.createElement("img");
  img.src = `images/modules/${pImage}`;
  img.alt = `Module ${pNoModule}`;
  img.className = "card-img-top card-title";

  let cardBody = document.createElement("div");
  cardBody.className =
    "card-body card-size d-flex justify-content-center flex-column";

  let cardTitle = document.createElement("h5");
  cardTitle.className = "card-title text-center";
  cardTitle.textContent = pTitre;

  let cardText = document.createElement("p");
  cardText.className = "card-text text-center";
  cardText.textContent = pDescription;

  rowDiv.appendChild(colDiv);
  colDiv.appendChild(cardDiv);
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
}

function validerFormulaireFiltres() {
  let msgErreur = document.getElementById("msg-filtres");
  let noModule = document.getElementById("filtresSelect").value;

  if (noModule == -1) {
    msgErreur.textContent =
      "Erreur - Vous devez sélectionner une des options valides.";
    msgErreur.classList.remove("d-none");
    return false;
  } else {
    msgErreur.classList.add("d-none");
    return true;
  }
}

function afficherModulesSelonFiltre(pDonnees, pEstFiltreApplique) {
  let cards = document.getElementById("modules-theoriques");
  let msgErreur = document.getElementById("msg-filtres");

  if (pEstFiltreApplique) {
    let noModule = document.getElementById("filtresSelect").value;
    if (validerFormulaireFiltres()) {
      cards.textContent = "";
      pEstFiltreApplique = true;
      creerCards(
        noModule,
        pDonnees[noModule].imgModule,
        `MODULE 0${String(noModule)} | ` + pDonnees[noModule].titre,
        pDonnees[noModule].description
      );
    }
  } else {
    msgErreur.classList.add("d-none");
    cards.textContent = "";

    for (let i = 0; i < pDonnees.length; i++) {
      creerCards(
        pDonnees[i],
        pDonnees[i].imgModule,
        `MODULE 0${String(i)} | ` + pDonnees[i].titre,
        pDonnees[i].description
      );
    }
  }
}

let noModuleSelectionne;

function afficherModules() {
  let btnFiltrer = document.getElementById("btnfiltrer");
  let btnAfficherTout = document.getElementById("btnaffichertout");

  afficherModulesSelonFiltre(DATA_QUIZ.modules, false);

  btnFiltrer.addEventListener("click", function () {
    afficherModulesSelonFiltre(DATA_QUIZ.modules, true);
  });

  btnAfficherTout.addEventListener("click", function () {
    afficherModulesSelonFiltre(DATA_QUIZ.modules, false);
  });
}

function creerQuestionnaire(e){
    
    e.preventDefault();

    let nbQuestions = e.target.nbquestions.value;
    let noModule = document.getElementById("filtresSelect").value;

    console.log(nbQuestions);

    if (afficherModules) {

    console.log(noModule);
    }
}

/*************
    Cette fonction est rattachée à l'événement "Load". 
    C'est la première fonction qui va s'executer lorsque 
    la page sera entièrement chargée.
**************/

function initialisation() {
  let creer = document.getElementById("formCreer");
  creer.addEventListener("submit", creerQuestionnaire);

  afficherModules();  
}

window.addEventListener("DOMContentLoaded", initialisation);
