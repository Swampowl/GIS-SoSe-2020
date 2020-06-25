"use strict";
var Aufgabe09;
(function (Aufgabe09) {
    window.addEventListener("load", init);
    function init() {
        createButtons();
    }
    function createButtons() {
        let buttonHTML = document.getElementById("getHTML");
        buttonHTML.addEventListener("click", getHTML);
        let buttonJSON = document.getElementById("getJSON");
        buttonJSON.addEventListener("click", getJSON);
    }
    let formData;
    async function getHTML() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://gis2020vr.herokuapp.com";
        serverURL += "/html";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        let response = await fetch(serverURL);
        let responseText = await response.text();
        let serverResponse = document.getElementById("serverResponse");
        serverResponse.innerHTML = responseText;
    }
    async function getJSON() {
        formData = new FormData(document.forms[0]);
        let serverURL = "https://gis2020vr.herokuapp.com";
        serverURL += "/json";
        // tslint:disable-next-line: no-any
        let query = new URLSearchParams(formData);
        serverURL += "?" + query.toString();
        let response = await fetch(serverURL);
        let responseText = await response.json();
        console.log(responseText);
    }
})(Aufgabe09 || (Aufgabe09 = {}));
//# sourceMappingURL=script.js.map