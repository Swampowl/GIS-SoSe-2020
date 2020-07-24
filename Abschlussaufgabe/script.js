"use strict";
var SwampowlShop;
(function (SwampowlShop) {
    window.addEventListener("load", init);
    let cartCounter = 0;
    let cartPrice = 0;
    let counterP;
    let coneDiv;
    let icecreamDiv;
    let toppingDiv;
    let url = "Data.json";
    SwampowlShop.categories = [];
    SwampowlShop.category = [];
    function communicate(_url) {
        let response = await fetch("articles.json");
        SwampowlShop.categories = await response.json();
        generateArticles(SwampowlShop.categories);
        console.log("Response", SwampowlShop.categories);
    }
    async function init(_event) {
        await communicate("articles.json");
        console.log("Seite geladen");
        counterP = document.querySelector(".navbar .a .cart_counter");
    }
    function handleToCartClick(_click) {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);
        toStorage(this);
    }
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
    function toStorage(_article) {
        let inhalt = JSON.stringify(_article);
        localStorage.setItem(_article.name, inhalt);
        console.log(localStorage);
    }
    function generateArticles(_categories) {
        coneDiv = document.querySelector(".content .cone");
        icecreamDiv = document.querySelector(".content .icecream");
        toppingDiv = document.querySelector(".content .toppings");
        for (let categoryTemp of SwampowlShop.categories) {
            let div = document.querySelector(SwampowlShop.categories.indexOf(categoryTemp) == 0 ? ".content .cone" : ".content .icecream", ".content .toppings");
            for (let article of categoryTemp) {
                //Div erzeugen
                div.appendChild(generateDiv(article, false));
            }
        }
    }
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
        newP.innerHTML = _article.beschreibung;
        newDiv.appendChild(newP);
        // preis hinzufügen
        let newPreis = document.createElement("h4");
        newPreis.innerHTML = _article.preis + "€";
        newDiv.appendChild(newPreis);
        // Button hinzufügen
        let newButton = document.createElement("button");
        if (!inCart) {
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(_article));
        }
        else {
            newButton.innerHTML = "Löschen";
            newButton.addEventListener("click", deleteItem.bind(_article));
        }
        newDiv.appendChild(newButton);
        return newDiv;
    }
    SwampowlShop.generateDiv = generateDiv;
})(SwampowlShop || (SwampowlShop = {}));
//# sourceMappingURL=script.js.map