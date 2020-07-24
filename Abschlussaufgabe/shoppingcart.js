"use strict";
var eisdiele;
(function (eisdiele) {
    let container;
    let article;
    window.addEventListener("load", init);
    function init(_event) {
        container = document.querySelector("#Warenkorb");
        document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
        buildArticles();
    }
    function buildArticles() {
        console.log(localStorage);
        for (let index = 0; index <= localStorage.length; index++) {
            let articleKey = localStorage.key(index);
            let jsonString = localStorage.getItem(articleKey);
            article = JSON.parse(jsonString);
            container.appendChild(generateDiv(article, true));
        }
    }
    function deleteAll() {
        localStorage.clear();
        container.innerHTML = "";
    }
    // ORDER CONFIRMATION POPUP
    function orderConfirmation() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=shoppingcart.js.map