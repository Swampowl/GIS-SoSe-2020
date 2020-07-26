"use strict";
var eisdiele;
(function (eisdiele) {
    // import * as _ from "./script_eisdiele";
    window.addEventListener("load", init);
    let container;
    let article;
    let prodctCount = 0;
    let counter = parseFloat(localStorage.getItem("counter"));
    let finalPrice = 0;
    let sendOrderButton;
    let cartOrderConfirmationParagraph;
    let priceParagraph;
    let element;
    function init(_event) {
        sendOrderButton = document.getElementById("cartOrderConfirmation");
        cartOrderConfirmationParagraph = document.getElementById("orderConfirmationParagraph");
        container = document.querySelector("#costumerOrders");
        document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
        sendOrderButton.addEventListener("click", orderMessage);
        buildArticles();
        if (localStorage.length == 0) {
            container.innerHTML = "Der Warenkorb enthält noch keine Produkte.";
        }
    }
    function orderMessage() {
        if (localStorage.length != 0) {
            cartOrderConfirmationParagraph.innerHTML = "Ihre Bestellung wird nun bearbeitet!<br>Ihr Eis wird Sie in Kürze erreichen!";
            sendData();
        }
        else {
            cartOrderConfirmationParagraph.innerHTML = "Es befinden sich keine Artikel im Warenkorb!<br>Eine Bestellung ist nicht möglich!";
        }
    }
    async function sendData() {
        console.log("TEst");
        let formData;
        formData = new FormData(document.forms[0]);
        let _url = "https://swampowl.herokuapp.com";
        //let _url: string = "http://localhost";
        let query = new URLSearchParams(formData);
        _url = _url + "/send" + "?" + query.toString();
        await fetch(_url);
    }
    //einzelne Eis in Warenkorb anzeigen
    function buildArticles() {
        console.log(localStorage);
        function generateArticles(article) {
            let cartOrderDiv = document.createElement("div");
            cartOrderDiv.innerHTML = `<p>Eis ${prodctCount + 1}: ${article.coneType} ${article.ice} ${article.topping}: ${article.preis?.toFixed(2)} €<br>
      <button id="deleteSingleOrder">Eis löschen</button></p>`;
            // cartOrderDiv.setAttribute("key", article.key);
            prodctCount = prodctCount + 1;
            updateFinalPrice();
            return cartOrderDiv;
        }
        for (let index = 0; index < counter; index++) {
            //let articleKey: string = <string>localStorage.key(index);
            let jsonString = localStorage.getItem("order" + index);
            article = JSON.parse(jsonString);
            element = generateArticles(article);
            container.appendChild(element);
            element.querySelector("#deleteSingleOrder")?.addEventListener("click", deleteSingleOrder);
            finalPrice = finalPrice + parseFloat(article.preis + "");
            updateFinalPrice();
            //einzelne Bestellung innerhalb des Warenkorbs löschen
            function deleteSingleOrder(_event) {
                console.log("Test_deleteSingleOrder");
                // console.log(((<HTMLElement>_event.currentTarget).parentElement));
                finalPrice = finalPrice - parseFloat(article.preis + "");
                localStorage.removeItem("order" + index);
                (_event.currentTarget.parentElement).remove();
                updateFinalPrice();
            }
        }
    }
    function updateFinalPrice() {
        priceParagraph = document.getElementById("finalPrice");
        priceParagraph.innerHTML = `Gesamtpreis: ${finalPrice.toFixed(2)} €`;
    }
    //Gesamten Einkaufswagen löschen
    function deleteAll() {
        localStorage.clear();
        container.innerHTML = "Der Warenkorb enthält keine Produkte mehr.";
        finalPrice = 0;
        updateFinalPrice();
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=shoppingcart.js.map