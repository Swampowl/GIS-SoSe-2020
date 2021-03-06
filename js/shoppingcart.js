"use strict";
var eisdiele;
(function (eisdiele) {
    // import * as _ from "./script_eisdiele";
    window.addEventListener("load", init);
    let container;
    let article;
    let prodctCount = 0;
    let counter = parseInt(localStorage.getItem("counter"));
    let finalPrice = 0;
    let databaseString = "";
    let tempString = "";
    let sendOrderButton;
    let cartOrderConfirmationParagraph;
    function init(_event) {
        sendOrderButton = document.getElementById("cartOrderConfirmation");
        cartOrderConfirmationParagraph = document.getElementById("orderConfirmationParagraph");
        container = document.querySelector("#costumerOrders");
        document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
        buildArticles();
        sendOrderButton.addEventListener("click", sendData);
        async function sendData() {
            console.log("TEst");
            cartOrderConfirmationParagraph.innerHTML = "Ihre Bestellung wird nun bearbeitet!<br>Ihr Eis wird Sie in Kürze erreichen!";
            let formData;
            formData = new FormData(document.forms[0]);
            let _url = "https://swampowl.herokuapp.com";
            let query = new URLSearchParams(formData);
            _url = _url + "/send" + "?" + query.toString();
            await fetch(_url);
        }
    }
    function buildArticles() {
        console.log(localStorage);
        for (let index = 0; index <= counter; index++) {
            //let articleKey: string = <string>localStorage.key(index);
            let jsonString = localStorage.getItem("order" + index);
            article = JSON.parse(jsonString);
            let element = generateArticles(article);
            container.appendChild(element);
            element.querySelector("#deleteSingleOrder")?.addEventListener("click", deleteSingleOrder);
            function deleteSingleOrder(_event) {
                console.log((_event.currentTarget.parentElement));
                localStorage.removeItem("order" + index);
                (_event.currentTarget.parentElement).remove();
                tempString = tempString + jsonString;
            }
        }
    }
    function generateArticles(article) {
        let cartOrderDiv = document.createElement("div");
        // cartOrderDiv.setAttribute("key", article.key);
        prodctCount = prodctCount + 1;
        cartOrderDiv.innerHTML = `<p>Eis ${prodctCount}: ${article.coneType},${article.ice},${article.topping}: ${article.preis?.toFixed(2)} €<br>
    <button id="deleteSingleOrder">Eis löschen</button></p>`;
        for (let i = 0; i <= counter; i++) {
            databaseString = tempString;
        }
        console.log(databaseString);
        return cartOrderDiv;
    }
    function deleteAll() {
        localStorage.clear();
        container.innerHTML = "Der Warenkorb enthält keine Produkte mehr.";
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=shoppingcart.js.map