"use strict";
var SwampowlShop;
(function (SwampowlShop) {
    SwampowlShop.jsonArticles = [];
    async function communicate(_url) {
        let response = await fetch("articles.json");
        SwampowlShop.jsonArticles = await response.json();
        console.log("Response", SwampowlShop.jsonArticles);
    }
    SwampowlShop.communicate = communicate;
})(SwampowlShop || (SwampowlShop = {}));
//# sourceMappingURL=cart.js.map