"use strict";
var eisdiele;
(function (eisdiele) {
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
            container.appendChild(generateArticles(article));
        }
    }
    function generateArticles(article) {
        let cartOrderDiv = document.createElement("div");
        // cartOrderDiv.setAttribute("key", article.key);
        cartOrderDiv.innerHTML = `<ul><li>${article.coneType}</li></ul>`;
        return cartOrderDiv;
    }
    function deleteAll() {
        localStorage.clear();
        container.innerHTML = "";
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=shoppingcart.js.map