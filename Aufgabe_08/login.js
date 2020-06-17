"use strict";
var Server;
(function (Server) {
    window.addEventListener("load", init);
    let formData;
    let button;
    function init(_event) {
        button = document.querySelector("button");
        button.addEventListener("click", handleSubmit);
    }
    let submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", communicate);
    async function communicate() {
        let formData = new FormData(document.forms[0]);
        let url = "https://swampowl.herokuapp.com/";
        let query = new URLSearchParams(formData);
        url += "?" + query.toString();
        let response = await fetch(url);
        let answer = await response.url;
        console.log(await response.text());
        console.log(answer);
    }
    function handleSubmit() {
    }
})(Server || (Server = {}));
//# sourceMappingURL=Login.js.map