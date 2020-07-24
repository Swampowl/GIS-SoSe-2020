"use strict";
var SwampowlShop;
(function (SwampowlShop) {
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
            container.appendChild(SwampowlShop.generateDiv(article, true));
        }
    }
    function deleteAll() {
        localStorage.clear();
        container.innerHTML = "";
    }
})(SwampowlShop || (SwampowlShop = {}));
//# sourceMappingURL=cart.js.map