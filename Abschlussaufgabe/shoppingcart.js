"use strict";
var eisdiele;
(function (eisdiele) {
    // import * as _ from "./script_eisdiele";
    let container;
    let article;
    window.addEventListener("load", init);
    function init(_event) {
        container = document.querySelector("#costumerOrders");
        document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
        buildArticles();
    }
    function buildArticles() {
        console.log(localStorage);
        for (let index = 0; index <= localStorage.length; index++) {
            let articleKey = localStorage.key(index);
            let jsonString = localStorage.getItem(articleKey);
            console.log(jsonString);
            article = JSON.parse(jsonString);
            let element = generateArticles(article);
            container.appendChild(element);
            element.querySelector("#deleteSingleOrder")?.addEventListener("click", deleteSingleOrder);
        }
    }
    function generateArticles(article) {
        let cartOrderDiv = document.createElement("div");
        // cartOrderDiv.setAttribute("key", article.key);
        cartOrderDiv.innerHTML = `<ul><li>${article.coneType}, ${article.ice},${article.preis?.toFixed(2)}</li></ul><br>
    <button id="deleteSingleOrder">Eis löschen</button>`;
        return cartOrderDiv;
    }
    function deleteSingleOrder(_event) {
        console.log((_event.currentTarget.parentElement));
    }
    function deleteAll() {
        localStorage.clear();
        container.innerHTML = "";
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=shoppingcart.js.map