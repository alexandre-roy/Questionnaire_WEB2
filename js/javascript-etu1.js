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
  let noModule = document.getElementById("filtresSelect").value;
  let cards = document.getElementById("modules-theoriques");
  let msgErreur = document.getElementById("msg-filtres");

  if (pEstFiltreApplique) {
    let noModule = document.getElementById("filtresSelect").value;
    cards.textContent = "";
    if (validerFormulaireFiltres()) {
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
        `MODULE 0${String(noModule)} | ` + pDonnees[i].titre,
        pDonnees[i].description
      );
    }
  }
}

function afficherModules() {
    let btnFiltrer = document.getElementById("btnfiltrer");
    let btnAfficherTout = document.getElementById("btnaffichertout");
  
    btnFiltrer.addEventListener("click", function () {
      afficherModulesSelonFiltre(DATA_QUIZ.modules, true);
    });
  
    btnAfficherTout.addEventListener("click", function () {
      afficherModulesSelonFiltre(DATA_QUIZ.modules, false);
    });
  }

/*************
    Cette fonction est rattachée à l'événement "Load". 
    C'est la première fonction qui va s'executer lorsque 
    la page sera entièrement chargée.
**************/

function initialisation() {
  afficherModules();
}

window.addEventListener("load", initialisation, false);
