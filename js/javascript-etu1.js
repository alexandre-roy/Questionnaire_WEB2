/**
 *  Fichier principal javascript
 */
/*global bootstrap*/
/*global DATA_QUIZ*/

import { creerPoppover, remplirOffCanvas  } from "./javascript-etu2.js";

export let questionsPourQuestionnaire = [];
let nbQuestions;
let noModuleSelectionne = 6;
let btnCreer = document.getElementById("btncreerquestionnaire");
let boolBonOuNon;
let score = 0;

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

function creerQuestionnaire(e) {
  e.preventDefault();

  btnCreer.disabled = true;

  nbQuestions = parseInt(e.target.nbquestions.value);

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

  for (let i = 0; i < questionsPourQuestionnaire.length; i++) {
    console.log(
      questionsPourQuestionnaire[i].titre +
        " | " +
        questionsPourQuestionnaire[i].modulesId
    );
  }

  validerReponse(questionsPourQuestionnaire);
}

function validerReponse() {
  let questionSuivanteBtn = document.getElementById("boutonAssocie");
  let questionnaire = document.getElementById("questionnaire");
  questionSuivanteBtn.disabled = false;

  questionSuivanteBtn.textContent = "QUESTION SUIVANTE";
  questionnaire.classList.remove("d-none");

  let index = 1;
  let noQuestion = 0;
  let nbIterations = 0;
  let bonneReponse = [];

  console.log(questionsPourQuestionnaire[index - 1].reponses);

  if (index == nbQuestions) {
    questionSuivanteBtn.textContent = "TERMINER LE TEST";
    creerPoppover();
  }

  afficherQuestionSuivante(0);

  questionSuivanteBtn.addEventListener("click", function () {
    nbIterations = questionsPourQuestionnaire[index - 1].choixReponses.length;
    bonneReponse = questionsPourQuestionnaire[index - 1].reponses;
    checkReponse(nbIterations, bonneReponse, noQuestion);
    noQuestion++;
    if (questionSuivanteBtn.textContent == "TERMINER LE TEST") {
      console.log(questionsPourQuestionnaire[index - 1].reponses);
      questionSuivanteBtn.disabled = true;
      console.log(questionsPourQuestionnaire);
      terminerQuestionnaire();
      console.log("Score: " + score);
    } else {
      afficherQuestionSuivante(index);
      index++;
      console.log(questionsPourQuestionnaire[index - 1].reponses);
      if (index == nbQuestions) {
        questionSuivanteBtn.textContent = "TERMINER LE TEST";
        creerPoppover();
      }
    }
  });
}

function checkReponse(pNbIterations, pBonneReponses, pNoQuestion) {
  let mesReponses = [];
  let repondu = false;

  for (let i = 0; i < pNbIterations; i++) {
    let option = document.getElementById(`reponse${i}`);
    if (option.checked) {
      mesReponses.push(i);
      repondu = true;
    }
  }

  if (!repondu) {
    afficherToast(
      "toast",
      "Erreur",
      "Vous devez sélectionner une réponse.",
      5000
    );
    return;
  }

  let boolBonneReponse;

  for (let i = 0; i < pBonneReponses.length; i++) {
    if (mesReponses[i] != pBonneReponses[i]) {
      boolBonneReponse = false;
      questionsPourQuestionnaire[pNoQuestion].maReponse = boolBonneReponse;
      let contenu = afficherRetroaction(
        false,
        questionsPourQuestionnaire[pNoQuestion]
      );
      afficherToast("toast", "retroactionNegative", contenu, 5000);
      break;
    }
  }

  if (boolBonneReponse != false) {
    for (let i = 0; i < pBonneReponses.length; i++) {
      if (mesReponses[i] == pBonneReponses[i]) {
        boolBonneReponse = true;
        score++;
        questionsPourQuestionnaire[pNoQuestion].maReponse = boolBonneReponse;
        let contenu = afficherRetroaction(
          true,
          questionsPourQuestionnaire[pNoQuestion]
        );
        afficherToast("toast", "retroactionPositive", contenu, 5000);
      }
    }
  }
  boolBonOuNon = boolBonneReponse;
}

function terminerQuestionnaire() {
  let btnMesReponses = document.getElementById("btnmesreponses");
  btnMesReponses.disabled = false;
  remplirOffCanvas();
}

function afficherQuestionSuivante(pNumeroQuestion) {
  let titreQuestion = document.getElementById("titrequestion");
  let choixReponses = document.getElementById("choixreponses");
  let noQuestion = document.getElementById("noquestion");

  if (questionsPourQuestionnaire.length > 0) {
    noQuestion.textContent = `Question ${pNumeroQuestion + 1}
       | MODULE 0${questionsPourQuestionnaire[pNumeroQuestion].modulesId}`;

    titreQuestion.textContent =
      questionsPourQuestionnaire[pNumeroQuestion].titre;

    choixReponses.textContent = "";

    for (
      let i = 0;
      i < questionsPourQuestionnaire[pNumeroQuestion].choixReponses.length;
      i++
    ) {
      let div = document.createElement("div");
      div.className = "form-check my-2";

      let input = document.createElement("input");
      if (questionsPourQuestionnaire[pNumeroQuestion].typeQuestion == "radio") {
        input.type = "radio";
      } else {
        input.type = "checkbox";
      }
      input.className = "form-check-input";
      input.name = "reponse";
      input.id = `reponse${i}`;
      input.value =
        questionsPourQuestionnaire[pNumeroQuestion].choixReponses[i].id;

      let label = document.createElement("label");
      label.className = "form-check-label";
      label.htmlFor = `reponse${i}`;
      label.textContent =
        questionsPourQuestionnaire[pNumeroQuestion].choixReponses[i];

      choixReponses.appendChild(div);
      div.appendChild(input);
      div.appendChild(label);
    }
  }
}

function afficherToast(pId, pTitre, pElementHTMLContenu, pTemps) {
  let toast = document.getElementById(pId);
  let toastTitle = document.getElementById("toast-title");
  let toastBody = document.getElementById("toast-body");
  let posOuNeg = pTitre;

  let optionsToast = {
    delay: pTemps,
    animation: true,
    autohide: true,
  };

  if (posOuNeg == "retroactionPositive") {
    creerContenuRetroaction(true, toastBody);
    toastTitle.textContent = "Bravo !";
  } else {
    creerContenuRetroaction(false, toastBody);
    toastTitle.textContent = "Désolé . . .";
  }

  toastBody.textContent = pElementHTMLContenu;

  new bootstrap.Toast(toast, optionsToast).show();
}

function creerContenuRetroaction(pEstPositive, pContenu) {
  if (pEstPositive) {
    pContenu.classList.remove("bg-danger");
    pContenu.classList.add("bg-success");
    pContenu.classList.add("bg-opacity-25");
  } else {
    pContenu.classList.remove("bg-success");
    pContenu.classList.add("bg-danger");
    pContenu.classList.add("bg-opacity-25");
  }
}

function afficherRetroaction(pEstPositif, pRetroaction) {
  if (pEstPositif) {
    return pRetroaction.retroactionPositive;
  } else {
    return pRetroaction.retroactionNegative;
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
