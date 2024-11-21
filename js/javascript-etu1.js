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

let noModuleSelectionne = 6;

function afficherModules() {
  let btnFiltrer = document.getElementById("btnfiltrer");
  let btnAfficherTout = document.getElementById("btnaffichertout");

  afficherModulesSelonFiltre(DATA_QUIZ.modules, false);

  btnFiltrer.addEventListener("click", function () {
    noModuleSelectionne = document.getElementById("filtresSelect").value;
    afficherModulesSelonFiltre(DATA_QUIZ.modules, true);
  });

  btnAfficherTout.addEventListener("click", function () {
    noModuleSelectionne = 6;
    afficherModulesSelonFiltre(DATA_QUIZ.modules, false);
  });
}

let questionsPourQuestionnaire = [];

function creerQuestionnaire(e) {
  e.preventDefault();

  let nbQuestions = parseInt(e.target.nbquestions.value);

  questionsPourQuestionnaire = [];

  let questionsPourModule;

  if (noModuleSelectionne == 6) {
    questionsPourModule = DATA_QUIZ.banque_questions;
  } else {
    questionsPourModule = DATA_QUIZ.banque_questions.filter(
      (question) => question.modulesId == noModuleSelectionne
    );
  }

  if (nbQuestions > questionsPourModule.length) {
    nbQuestions = questionsPourModule.length;
  }

  while (questionsPourQuestionnaire.length < nbQuestions) {
    let hasard = Math.floor(Math.random() * questionsPourModule.length);
    let selectedQuestion = questionsPourModule.splice(hasard, 1)[0];
    questionsPourQuestionnaire.push(selectedQuestion);
  }

  let titreQuestion = document.getElementById("titrequestion");
  let choixReponses = document.getElementById("choixreponses");

  if (questionsPourQuestionnaire.length > 0) {
    titreQuestion.textContent =
      questionsPourQuestionnaire[0].titre +
      ` | MODULE 0${questionsPourQuestionnaire[0].modulesId}`;

    choixReponses.textContent = "";

    if (questionsPourQuestionnaire[0].typeQuestion == "radio") {
      for (
        let i = 0;
        i < questionsPourQuestionnaire[0].choixReponses.length;
        i++
      ) {
        let div = document.createElement("div");
        div.className = "form-check my-2";

        let input = document.createElement("input");
        input.type = "radio";
        input.className = "form-check-input";
        input.name = "reponse";
        input.id = `reponse${i}`;
        input.value = questionsPourQuestionnaire[0].choixReponses[i].id;

        let label = document.createElement("label");
        label.className = "form-check-label";
        label.htmlFor = `reponse${i}`;
        label.textContent = questionsPourQuestionnaire[0].choixReponses[i];

        choixReponses.appendChild(div);
        div.appendChild(input);
        div.appendChild(label);
      } 
    } else {
      console.log("checkbox");
    }
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
