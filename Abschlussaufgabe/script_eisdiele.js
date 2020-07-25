"use strict";
var eisdiele;
(function (eisdiele) {
    window.addEventListener("load", init);
    //Objekte erstellen
    let coneDiv;
    let icecreamDiv;
    let toppingDiv;
    let cartCounter = 0;
    let cartCounterParagraph;
    let cartPrice = 0.00;
    let pricePreview = 0.00;
    let previewCounter = 0;
    let previewPrice;
    let coneCounter = 0;
    let storageTemp = localStorage;
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
        previewPrice = document.getElementById("currentPricePreview");
        cartCounterParagraph = document.getElementById("cartCounter");
        for (let i = 0; i <= _categories.length; i++) {
            let newDiv = document.createElement("div");
            newDiv.id = _categories[i].name;
            newDiv.id = _categories[i].img;
            newDiv.id = _categories[i].infotext;
            newDiv.id = `${_categories[i].preis}`;
            newDiv.id = _categories[i].category;
            newDiv.innerHTML = `
            <h3>${_categories[i].name}</h3>
            <img src=${_categories[i].img}></img>
            <p class="infotext">${_categories[i].infotext}</p>
            <p class="preis_shop">${_categories[i].preis.toFixed(2)} €</p>`;
            let buttonAddElement = document.createElement("Button");
            buttonAddElement.innerHTML = `hinzufügen`;
            newDiv.appendChild(buttonAddElement);
            buttonAddElement.addEventListener("click", addToIce);
            if (_categories[i].category == "cone") {
                document.querySelector(".cone").append(newDiv);
            }
            if (_categories[i].category == "icecream") {
                document.querySelector(".icecream").append(newDiv);
            }
            if (_categories[i].category == "topping") {
                document.querySelector(".topping").append(newDiv);
            }
            // hinzufügen AddToIce
            // hinzufügen AddToIce
            function addToIce(_event) {
                console.log("Button gedrückt");
                if (coneCounter < 1 && _categories[i].category == "cone") {
                    coneCounter = coneCounter + 1;
                    if (_categories[i].category == "cone") {
                        let previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewBase");
                        document.querySelector(".preview").append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "icecream") {
                        let previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewIcecream");
                        document.querySelector(".preview").append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "topping") {
                        let previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewTopping");
                        document.querySelector(".preview").append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    previewPrice.innerHTML = "Preis: " + pricePreview.toFixed(2);
                }
                if (_categories[i].category != "cone") {
                    if (_categories[i].category == "cone") {
                        let previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewBase");
                        document.querySelector(".preview").append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "icecream") {
                        let previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewIcecream");
                        document.querySelector(".preview").append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "topping") {
                        let previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewTopping");
                        document.querySelector(".preview").append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    previewPrice.innerHTML = "Preis: " + pricePreview.toFixed(2);
                }
                else{}
            }
            document.getElementById("deleteCurrentIce")?.addEventListener("click", deleteIcePreview);
            // DELETE PREVIEW ICE
            function deleteIcePreview(_event) {
                document.getElementById("icePreviewTopping")?.remove();
                document.getElementById("icePreviewIcecream")?.remove();
                document.getElementById("icePreviewBase")?.remove();
                pricePreview = 0.00;
                coneCounter = 0;
                previewPrice.innerHTML = "Preis: " + pricePreview.toFixed(2);
            }
            document.getElementById("toCart")?.addEventListener("click", toCart);
            function toCart(_event) {
                cartCounter = (cartCounter + 1);
                document.getElementById("icePreviewTopping")?.remove();
                document.getElementById("icePreviewIcecream")?.remove();
                document.getElementById("icePreviewBase")?.remove();
                pricePreview = 0.00;
                coneCounter = 0;
                previewPrice.innerHTML = "Preis: " + pricePreview.toFixed(2);
                cartCounterParagraph.innerHTML = `${cartCounter / 12}`;
            }
        }
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=script_eisdiele.js.map