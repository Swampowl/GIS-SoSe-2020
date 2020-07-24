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
    let cartCounter = 0;
    let cartPrice = 0.00;
    async function init(_event) {
        await communicate("articles.json");
        console.log("Seite geladen");
    }
    //Artikel aus articles.json einschleifen
    async function communicate(_url) {
        let response = await fetch("articles.json");
        let _categories = await response.json();
        generateArticles(_categories);
        console.log("Response", _categories);
    }
    // Div für Artikel aufbauen
    function generateArticles(_categories) {
        coneDiv = document.querySelector(".cone");
        icecreamDiv = document.querySelector(".icecream");
        toppingDiv = document.querySelector(".toppings");
        previewDiv = document.querySelector(".preview");
        for (let i = 0; i <= _categories.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.id = _categories[i].name;
            newDiv.id = _categories[i].img;
            newDiv.id = _categories[i].infotext;
            newDiv.id = `${_categories[i].preis}`;
            newDiv.innerHTML = `
            <h3>${_categories[i].name}</h3>
            <img src=${_categories[i].img}></img>
            <p class="infotext">${_categories[i].infotext}</p>
            <p class="preis_shop">${_categories[i].preis.toFixed(2)} €</p>
            <button class="to_cart_button">hinzufügen</button>`;
            if (_categories[i].category == "cone") {
                document.querySelector(".cone").append(newDiv);
            }
            if (_categories[i].category == "icecream") {
                document.querySelector(".icecream").append(newDiv);
            }
            if (_categories[i].category == "topping") {
                document.querySelector(".topping").append(newDiv);
            }
        }
    }
    /*
        
    
        // zum LocalStorage hinzufügen
        function toStorage(_article: Article): void {
            let inhalt: string = JSON.stringify(_article);
            localStorage.setItem(_article.name, inhalt);
            console.log(localStorage);
    
        }
        // Anzahl des Warenkorbs hochzählen
    
        function handleToCartClick(this: Article, _click: MouseEvent): void {
            cartCounter++;
            cartPrice += this.preis;
            console.log(cartCounter);
            console.log(cartPrice);
            console.log(cartCounter);
            toStorage(this);
    
        }
    
        // einzelnes Item aus dem Warenkorb löschen
    
        function deleteItem(this: Article, _click: MouseEvent): void {
    
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
    
    */
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=script_eisdiele.js.map