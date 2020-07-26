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
    let counter = 0;
    let previewPrice;
    let cartStorage;
    let iceProduct;
    //Wird beim Seitenaufruf gefeuert & initialisiert laden der Artikel
    async function init(_event) {
        await communicate("articles.json");
        console.log("Seite geladen");
    }
    //article.json importieren
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
        //Artikel aus .JSON einschleifen
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
            //generierte Divs in Kategorie einfügen
            if (_categories[i].category == "cone") {
                document.querySelector(".cone").append(newDiv);
            }
            if (_categories[i].category == "icecream") {
                document.querySelector(".icecream").append(newDiv);
            }
            if (_categories[i].category == "topping") {
                document.querySelector(".topping").append(newDiv);
            }
            // Zum Vorschau-Eis hinzufügen
            function addToIce(_event) {
                //Checken ob bereits ein IceProduct definiert ist
                if (iceProduct === undefined) {
                    iceProduct = {};
                }
                //Wechsel zwischen Eis-Behälter ermöglichen & zum Vorschau-Eis hinzufügen
                if (_categories[i].category == "cone") {
                    iceProduct.coneType = _categories[i].name;
                    let previewPicture = document.querySelector("#icePreviewBase");
                    //Wechsel
                    if (previewPicture != null) {
                        previewPicture.setAttribute("src", _categories[i].img);
                    }
                    //zum Vorschau-Eis hinzufügen
                    else {
                        previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewBase");
                        document.querySelector(".preview").append(previewPicture);
                        previewCounter = previewCounter + 1;
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    //Eissorte zum Vorschau-Eis hinzufügen
                }
                if (_categories[i].category == "icecream") {
                    if (iceProduct.ice === undefined) {
                        iceProduct.ice = [];
                    }
                    iceProduct.ice.push(_categories[i].name);
                    let previewPicture = document.createElement("img");
                    previewPicture.setAttribute("src", _categories[i].img);
                    previewPicture.setAttribute("id", "icePreviewIcecream");
                    document.querySelector(".preview").append(previewPicture);
                    previewCounter = previewCounter + 1;
                    cartPrice = cartPrice + _categories[i].preis;
                    pricePreview = pricePreview + _categories[i].preis;
                    console.log(cartPrice.toFixed(2));
                }
                //Toppings zum Vorschau-Eis hinzufügen
                if (_categories[i].category == "topping") {
                    if (iceProduct.topping === undefined) {
                        iceProduct.topping = [];
                    }
                    iceProduct.topping.push(_categories[i].name);
                    let previewPicture = document.createElement("img");
                    previewPicture.setAttribute("src", _categories[i].img);
                    previewPicture.setAttribute("id", "icePreviewTopping");
                    document.querySelector(".preview").append(previewPicture);
                    previewCounter = previewCounter + 1;
                    cartPrice = cartPrice + _categories[i].preis;
                    pricePreview = pricePreview + _categories[i].preis;
                    console.log(cartPrice.toFixed(2));
                }
                previewPrice.innerHTML = "Preis: " + pricePreview.toFixed(2) + " €";
            }
            document.getElementById("toCart")?.addEventListener("click", toCart);
            document.getElementById("deleteCurrentIce")?.addEventListener("click", deleteIcePreview);
            console.log(localStorage);
        }
    }
    // Vorschau-Eis in String parsen & in localStorage pushen
    function toCart(_event) {
        cartCounter = (cartCounter + 1);
        iceProduct.preis = pricePreview;
        localStorage.setItem("order" + counter, JSON.stringify(iceProduct));
        cartCounterParagraph.innerHTML = `${cartCounter}`;
        deleteIcePreview(_event);
        console.log(cartStorage);
        counter++;
        localStorage.setItem("counter", counter + "");
    }
    // Vorschau-Eis löschen & Preis festlegen
    function deleteIcePreview(_event) {
        console.log(_event.currentTarget);
        //Wenn delete-event von toCart-Button getriggert wird
        if (_event.currentTarget.id === "toCart") {
            console.log(cartPrice);
        }
        //Eis wird verworfen, Preis wiederherstellen
        else {
            cartPrice = cartPrice - pricePreview;
            console.log(cartPrice);
        }
        //Vorschau-Div leeren & Vorschau-Preis resetten
        let newPreview = document.querySelector(".preview");
        if (newPreview != null) {
            newPreview.innerHTML = "Vorschau: <br>";
            pricePreview = 0.00;
            previewPrice = document.getElementById("currentPricePreview");
            previewPrice.innerHTML = "Preis: " + pricePreview.toFixed(2) + " €";
        }
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=script_eisdiele.js.map