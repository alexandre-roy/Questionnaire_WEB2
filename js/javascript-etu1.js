/* Fichier javascript pour l'étudiant 1 (Alexandre Roy) */

/*global bootstrap*/
/*global DATA_QUIZ*/

import { creerPoppover, remplirOffCanvas, telechargerReponses } from "./javascript-etu2.js";

window.telechargerReponses = telechargerReponses;

export let questionsPourQuestionnaire = [];
let nbQuestions = 0;
let score = 0;
let noModuleSelectionne = 6;
let btnCreer = document.getElementById("btncreerquestionnaire");

/**
 * Permet de créer le contenu de la rétroaction. Un symbole et une bulle d'information positive ou négative.
 *
 * @param {boolean} pEstPositive - Indique si la rétroaction est positive ou négative.
 * @param {HTMLElement} pContenu - Le contenu qui contiendra la rétroaction.
 * @author alexandre-roy
 */
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

/**
 * Perment de créer les cards pour les modules théoriques.
 *
 * @param {number} pNoModule - Le numéro du module.
 * @param {string} pImage - Le nom de l'image.
 * @param {string} pTitre - Le titre du module.
 * @param {string} pDescription - La description du module.
 * @author alexandre-roy
 */
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

/**
 * Permet de valider le formulaire des filtres.
 *
 * @returns {boolean} - Retourne vrai si le formulaire est valide, faux sinon.
 * @autor alexandre-roy
 */
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

/**
 * Permet d'afficher les modules selon le filtre appliqué.
 *
 * @param {object} pDonnees - Les données des modules.
 * @param {boolean} pEstFiltreApplique - Indique si un filtre est appliqué.
 * @autor alexandre-roy
 */
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

/**
 * Permet de créer le questionnaire avec des questions au hasard.
 *
 * @param {Event} e - L'événement du bouton pour créer le questionnaire.
 * @autor alexandre-roy
 */
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
    let selectedQuestion = questionsPourModule[hasard];
    if (questionsPourQuestionnaire.includes(selectedQuestion)) {
      continue;
    }
    questionsPourQuestionnaire.push(selectedQuestion);
  }

  validerReponse(questionsPourQuestionnaire);
}

/**
 * Permet d'afficher la question suivante.
 *
 * @param {number} pNumeroQuestion - Le numéro de la question.
 * @autor alexandre-roy
 */
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

/**
 * Permet d'afficher un toast selon les paramètres.
 *
 * @param {string} pId - L'identifiant du toast.
 * @param {string} pTitre - Le titre du toast.
 * @param {HTMLElement} pElementHTMLContenu - Le contenu du toast.
 * @param {number} pTemps - Le temps d'affichage du toast.
 * @autor alexandre-roy
 */
function afficherToast(pId, pTitre, pElementHTMLContenu, pTemps) {
  let toast = document.getElementById(pId);
  let toastTitle = document.getElementById("toast-title");
  let toasty = document.getElementById("toasty");
  let toastBody = document.getElementById("toast-body");
  let posOuNeg = pTitre;
  let check = document.getElementById("check");
  let x = document.getElementById("x");
  toasty.classList.remove("bg-success");
  toasty.classList.remove("bg-danger");
  check.classList.add("d-none");
  x.classList.add("d-none");

  let optionsToast = {
    delay: pTemps,
    animation: true,
    autohide: true,
  };

  if (posOuNeg == "retroactionPositive") {
    creerContenuRetroaction(true, toasty);
    check.classList.remove("d-none");
    toastTitle.textContent = "Rétroaction";
  } else if (posOuNeg == "retroactionNegative") {
    creerContenuRetroaction(false, toasty);
    x.classList.remove("d-none");
    toastTitle.textContent = "Rétroaction";
  } else {
    toastTitle.textContent = pTitre;
  }

  toastBody.textContent = pElementHTMLContenu;

  new bootstrap.Toast(toast, optionsToast).show();
}

/**
 * Permet de valider la réponse de l'utilisateur.
 *
 * @autor alexandre-roy
 */
function validerReponse() {
  let questionSuivanteBtn = document.getElementById("boutonAssocie");
  let questionnaire = document.getElementById("questionnaire");
  questionSuivanteBtn.disabled = false;

  questionSuivanteBtn.textContent = "QUESTION SUIVANTE";
  questionnaire.classList.remove("d-none");

  let noQuestion = 0;
  let nbIterations = 0;
  let nbIterationsRepondu = 0;
  let bonneReponse = [];
  let index = 1;

  if (index == nbQuestions) {
    questionSuivanteBtn.textContent = "TERMINER LE TEST";
  }

  afficherQuestionSuivante(0);

  questionSuivanteBtn.addEventListener("click", function () {
    let repondu = false;
    nbIterationsRepondu =
      questionsPourQuestionnaire[index - 1].choixReponses.length;

    for (let i = 0; i < nbIterationsRepondu; i++) {
      let option = document.getElementById(`reponse${i}`);
      if (option.checked) {
        repondu = true;
      }
    }

    if (!repondu) {
      afficherToast(
        "toast",
        "Avertissement",
        "Vous devez répondre à la question.",
        5000
      );
      return;
    }

    nbIterations = questionsPourQuestionnaire[index - 1].choixReponses.length;
    bonneReponse = questionsPourQuestionnaire[index - 1].reponses;
    checkReponse(nbIterations, bonneReponse, noQuestion);
    noQuestion++;
    if (questionSuivanteBtn.textContent == "TERMINER LE TEST") {
      creerPoppover();
      questionSuivanteBtn.disabled = true;
      terminerQuestionnaire();
      console.log(questionsPourQuestionnaire);
      console.log("Score: " + score);
    } else {
      afficherQuestionSuivante(index);
      index++;
      if (index == nbQuestions) {
        questionSuivanteBtn.textContent = "TERMINER LE TEST";
      }
    }
  });
}

/**
 * Permet d'afficher la rétroaction selon si la réponse est positive ou négative.
 *
 * @param {boolean} pEstPositif - Indique si la rétroaction est positive ou négative.
 * @param {HTMLElement} pRetroaction - La rétroaction à afficher.
 * @returns {HTMLElement} - Retourne la rétroaction à afficher.
 * @autor alexandre-roy
 */
function afficherRetroaction(pEstPositif, pRetroaction) {
  if (pEstPositif) {
    return pRetroaction.retroactionPositive;
  } else {
    return pRetroaction.retroactionNegative;
  }
}

/**
 * Permet d'afficher le offcanvas quand le questionnaire est terminé.
 *
 * @autor alexandre-roy
 */
function terminerQuestionnaire() {
  let btnMesReponses = document.getElementById("btnmesreponses");
  btnMesReponses.disabled = false;
  remplirOffCanvas();
}

/**
 * Permet d'afficher les modules théoriques en tant que cards.
 *
 * @autor alexandre-roy
 */
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

/**
 * Permet de vérifier si la réponse de l'utilisateur est bonne ou non et de donner un score.
 *
 * @param {number} pNbIterations - Le nombre d'itérations qui équivaut au nombre de réponses.
 * @param {objet} pBonneReponses - Les bonnes réponses.
 * @param {number} pNoQuestion - Le numéro de la question.
 * @autor alexandre-roy
 */
function checkReponse(pNbIterations, pBonneReponses, pNoQuestion) {
  let mesReponses = [];

  for (let i = 0; i < pNbIterations; i++) {
    let option = document.getElementById(`reponse${i}`);
    if (option.checked) {
      mesReponses.push(i);
    }
  }
  questionsPourQuestionnaire[pNoQuestion].repUtilisateur = mesReponses;

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
}

/**
 * Permet d'initialiser le contenu de la page.
 *
 * @autor alexandre-roy
 */
function initialisation() {
  let creer = document.getElementById("formCreer");
  creer.addEventListener("submit", creerQuestionnaire);
  afficherModules();
}

window.addEventListener("DOMContentLoaded", initialisation);
