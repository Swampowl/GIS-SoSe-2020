"use strict";
var eisdiele;
(function (eisdiele) {
    window.addEventListener("load", init);
    //Objekte erstellen
    let iceInCart = 0;
    let totalPrice = 0;
    let coneDiv;
    let icecreamDiv;
    let toppingDiv;
    let previewDiv;
    let cartCounter;
    async function init(_event) {
        await communicate("articles.json");
        console.log("Seite geladen");
        cartCounter = document.querySelector(".flexContainer p");
    }
    async function communicate(_url) {
        let response = await fetch("articles.json");
        _categories = await response.json();
        generateArticles(_categories);
        console.log("Response", _categories);
    }
    //Artikel aus articles.json einschleifen
    function generateArticles(_categories) {
        coneDiv = document.querySelector(".cone");
        icecreamDiv = document.querySelector(".imperium");
        toppingDiv = document.querySelector(".toppings");
        previewDiv = document.querySelector(".preview");
        for (let categoryTemp of _categories) {
            let div = document.querySelector(_categories.indexOf(categoryTemp) == 0 ? "#chaos" : "#imperium");
            for (let article of categoryTemp) {
                //Div erzeugen
                div.appendChild(generateDiv(article, false));
            }
        }
    }
    // Div für Artikel aufbauen
    function generateDiv(_article, inCart) {
        let newDiv = document.createElement("div");
        //Produktbezeichnung hinzufügen
        newDiv.id = _article.name;
        let newH = document.createElement("h3");
        newH.innerHTML = _article.name;
        newDiv.appendChild(newH);
        //Produktbild hinzufügen
        let newImage = document.createElement("img");
        newImage.setAttribute("src", _article.img);
        newImage.setAttribute("class", "pic");
        newDiv.appendChild(newImage);
        //Produktbeschreibung hinzufügen
        let newP = document.createElement("p");
        newP.innerHTML = _article.infotext;
        newDiv.appendChild(newP);
        // preis hinzufügen
        let newPreis = document.createElement("h4");
        newPreis.innerHTML = _article.preis + "€";
        newDiv.appendChild(newPreis);
        // Button hinzufügen
        let newButton = document.createElement("button");
        if (!inCart) {
            newButton.innerHTML = "hinzufügen";
            newButton.addEventListener("click", handleToCartClick.bind(_article));
        }
        else {
            newButton.innerHTML = "Löschen";
            newButton.addEventListener("click", deleteItem.bind(_article));
        }
        newDiv.appendChild(newButton);
        return newDiv;
    }
    eisdiele.generateDiv = generateDiv;
    // zum LocalStorage hinzufügen
    function toStorage(_article) {
        let inhalt = JSON.stringify(_article);
        localStorage.setItem(_article.name, inhalt);
        console.log(localStorage);
    }
    // Anzahl des Warenkorbs hochzählen
    function handleToCartClick(_click) {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);
        toStorage(this);
    }
    // einzelnes Item aus dem Warenkorb löschen
    function deleteItem(_click) {
        Object.keys(localStorage).forEach(key => {
            let str = localStorage.getItem(key);
            if (str != null) {
                let item = JSON.parse(str);
                if (item.name == this.name) {
                    localStorage.removeItem(key);
                }
            }
        });
        let element = document.getElementById(this.name);
        element?.parentElement?.removeChild(element);
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=script_eisdiele.js.map