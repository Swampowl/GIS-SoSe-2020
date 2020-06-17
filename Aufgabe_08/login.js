"use strict";
var Server;
(function (Server) {
    window.addEventListener("load", init);
    let button;
    function init(_event) {
        button = document.querySelector("button");
        button.addEventListener("click", handleSubmit);
    }
    let submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", handleSubmit);
    async function communicate(_url) {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        _url += "?" + query.toString();
        let response = await fetch(_url);
        console.log(await response.text());
    }
    function handleSubmit() {
        communicate("https://swampowl.herokuapp.com/");
    }
})(Server || (Server = {}));
//# sourceMappingURL=Login.js.map