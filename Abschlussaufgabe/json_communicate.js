"use strict";
var eisdiele;
(function (eisdiele) {
    eisdiele.articleData = [];
    async function communicate(_url) {
        let response = await fetch(_url);
        eisdiele.articleData = await response.json();
        generateArticles();
    }
    eisdiele.communicate = communicate;
})(eisdiele || (eisdiele = {}));
//# sourceMappingURL=json_communicate.js.map