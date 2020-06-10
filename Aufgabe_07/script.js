"use strict";
var SwampowlShop;
(function (SwampowlShop) {
    window.addEventListener("load", init);
    let cartCounter = 0;
    let cartPrice = 0;
    let counterP;
    let chaosDiv;
    let imperiumDiv;
    async function init(_event) {
        await SwampowlShop.communicate("articles.json");
        console.log("Seite geladen");
        generateArticles();
        setCategoryClick();
        counterP = document.querySelector(".flexContainer p");
    }
    function setCategoryClick() {
        let menue = document.querySelector("#Menü");
        let max = menue.children.length;
        let listA;
        for (let index = 2; index <= max; index++) {
            listA = document.querySelector("li:nth-child(" + index + ") a");
            console.log(listA);
            listA.addEventListener("click", handleCategoryClick.bind(listA));
        }
    }
    function handleCategoryClick(_click) {
        let categoryClick = this.getAttribute("href");
        switch (categoryClick) {
            case "#home":
                showHome();
                break;
            case "#chaos":
                showChaos();
                break;
            case "#imperium":
                showImperium();
                break;
        }
    }
    function showHome() {
        console.log("h");
        imperiumDiv.style.display = "block";
        chaosDiv.style.display = "block";
    }
    function showChaos() {
        console.log("w");
        chaosDiv.style.display = "block";
        imperiumDiv.style.display = "none";
    }
    function showImperium() {
        console.log("b");
        chaosDiv.style.display = "none";
        imperiumDiv.style.display = "block";
    }
    function handleToCartClick(_click) {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);
    }
    function generateArticles() {
        chaosDiv = document.querySelector("#chaos");
        imperiumDiv = document.querySelector("#imperium");
        for (let index = 0; index < SwampowlShop.jsonArticles.length; index++) {
            //Div erzeugen
            switch (SwampowlShop.jsonArticles[index].category) {
                case "chaos":
                    let newDiv = document.createElement("div");
                    newDiv.setAttribute("id", "chaos-produkt" + index);
                    document.getElementById("chaos")?.appendChild(newDiv);
                    //Produktbezeichnung hinzufügen
                    let newH = document.createElement("h3");
                    newH.innerHTML = SwampowlShop.jsonArticles[index].name;
                    newDiv.appendChild(newH);
                    //Produktbild hinzufügen
                    let newImage = document.createElement("img");
                    newImage.setAttribute("src", SwampowlShop.jsonArticles[index].img);
                    newImage.setAttribute("class", "pic");
                    newDiv.appendChild(newImage);
                    //Produktbeschreibung hinzufügen
                    let newP = document.createElement("p");
                    newP.innerHTML = SwampowlShop.jsonArticles[index].beschreibung;
                    newDiv.appendChild(newP);
                    // preis hinzufügen
                    let newPreis = document.createElement("h4");
                    newPreis.innerHTML = SwampowlShop.jsonArticles[index].preis + "€";
                    newDiv.appendChild(newPreis);
                    // Button hinzufügen
                    let newButton = document.createElement("button");
                    newButton.innerHTML = "ins Cart...";
                    newButton.addEventListener("click", handleToCartClick.bind(SwampowlShop.jsonArticles[index]));
                    newDiv.appendChild(newButton);
                case "imperium":
                    let newDiv = document.createElement("div");
                    newDiv.setAttribute("id", "chaos-produkt" + index);
                    document.getElementById("chaos")?.appendChild(newDiv);
                    //Produktbezeichnung hinzufügen
                    let newH = document.createElement("h3");
                    newH.innerHTML = SwampowlShop.jsonArticles[index].name;
                    newDiv.appendChild(newH);
                    //Produktbild hinzufügen
                    let newImage = document.createElement("img");
                    newImage.setAttribute("src", SwampowlShop.jsonArticles[index].img);
                    newImage.setAttribute("class", "pic");
                    newDiv.appendChild(newImage);
                    //Produktbeschreibung hinzufügen
                    let newP = document.createElement("p");
                    newP.innerHTML = SwampowlShop.jsonArticles[index].beschreibung;
                    newDiv.appendChild(newP);
                    // preis hinzufügen
                    let newPreis = document.createElement("h4");
                    newPreis.innerHTML = SwampowlShop.jsonArticles[index].preis + "€";
                    newDiv.appendChild(newPreis);
                    // Button hinzufügen
                    let newButton = document.createElement("button");
                    newButton.innerHTML = "ins Cart...";
                    newButton.addEventListener("click", handleToCartClick.bind(SwampowlShop.jsonArticles[index]));
                    newDiv.appendChild(newButton);
            }
        }
    }
})(SwampowlShop || (SwampowlShop = {}));
//# sourceMappingURL=script.js.map