/**
 *  Fichier principal javascript
 */
"use strict";

function creerCards(pNoModule, pImage, pTitre, pDescription) {   
    const rowDiv = document.getElementById("modules-theoriques");
    rowDiv.className = "row";
    
    const colDiv = document.createElement("div");
    colDiv.className = "col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";

    const cardDiv = document.createElement("div");
    cardDiv.className = "card";

    const img = document.createElement("img");
    img.src = pImage;
    img.alt = `Module ${pNoModule}`;
    img.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body card-size";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title text-center";
    cardTitle.textContent = pTitre;

    const cardText = document.createElement("p");
    cardText.className = "card-text text-center";
    cardText.textContent = pDescription;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);
    rowDiv.appendChild(colDiv);
}

function validerFormulaireFiltres() {
    let btnFiltrer = document.getElementById("btnfiltrer");

    btnFiltrer.addEventListener("click", function() {

        let filtre = document.getElementById("filtres").value;

        console.log(filtre);
    });
}

/*************
    Cette fonction est rattachée à l'événement "Load". 
    C'est la première fonction qui va s'executer lorsque 
    la page sera entièrement chargée.
**************/

 function initialisation() { 
    creerCards(0, "images/Logo-05B-dev-web-client.png", "MODULE X", "DESCRIPTION COURTE");
    validerFormulaireFiltres(); 
}

window.addEventListener("load", initialisation, false);