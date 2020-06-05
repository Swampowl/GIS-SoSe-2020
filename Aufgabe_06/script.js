"use strict";
var SwampowlShop;
(function (SwampowlShop) {
    window.addEventListener("load", init);
    let cartCounter = 0;
    let cartPrice = 0;
    let counterP;
    let warhammerDiv;
    let blenderDiv;
    function init(_event) {
        console.log("Seite geladen");
        generateArticleBlender();
        generateArticleWarhammer();
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
            case "#warhammer":
                showWarhammer();
                break;
            case "#blender":
                showBlender();
                break;
        }
    }
    function showHome() {
        console.log("h");
        blenderDiv.style.display = "block";
        warhammerDiv.style.display = "block";
    }
    function showWarhammer() {
        console.log("w");
        warhammerDiv.style.display = "block";
        blenderDiv.style.display = "none";
    }
    function showBlender() {
        console.log("b");
        warhammerDiv.style.display = "none";
        blenderDiv.style.display = "block";
    }
    function generateArticleBlender() {
        blenderDiv = document.querySelector("#blender");
        let smallPic = {
            img: "BlackWhite.jpg",
            name: "Kleines Bild",
            beschreibung: "abstrakte Kunst ist crazy",
            preis: 2.00
        };
        let mediumPic = {
            img: "Blue4k.jpg",
            name: "4k Bild",
            beschreibung: "is voll 4k",
            preis: 4.50
        };
        let highPic = {
            img: "Circle_rosegold.jpg",
            name: "4K Abstrakte Kunst",
            beschreibung: "Hobby der Jungfräulichkeit",
            preis: 8.00
        };
        let smallVid = {
            img: "TestCircle.mp4",
            name: "kleiner Loop",
            beschreibung: "sieht nur halb fertig aus",
            preis: 5
        };
        let midVid = {
            img: "Hexagon_orange.mp4",
            name: "Fancy Loop",
            beschreibung: "da war jemandem langweilig",
            preis: 2.00
        };
        let highVid = {
            img: "Circle_Animation.mp4",
            name: "4k Animation",
            beschreibung: "grenzt an waffenscheinpflichtigen Autismus",
            preis: 9.90
        };
        let blenderArray = [smallPic, mediumPic, highPic, smallVid, midVid, highVid];
        //Produkte einschleifen
        for (let index = 0; index < blenderArray.length; index++) {
            //Div erzeugen
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "blender-produkt" + index);
            document.getElementById("blender")?.appendChild(newDiv);
            //Produktbezeichnung hinzufügen
            let newH = document.createElement("h3");
            newH.innerHTML = blenderArray[index].name;
            newDiv.appendChild(newH);
            //Produktbild hinzufügen
            let url = blenderArray[index].img;
            newDiv.appendChild((url.split(".")[1] == "mp4" ? createVideo(url) : createImage(url)));
            //Produktbeschreibung hinzufügen
            let newP = document.createElement("p");
            newP.innerHTML = blenderArray[index].beschreibung;
            newDiv.appendChild(newP);
            // preis hinzufügen
            let newPreis = document.createElement("h4");
            newPreis.innerHTML = blenderArray[index].preis.toFixed(2) + "€";
            newDiv.appendChild(newPreis);
            // Button hinzufügen
            let newButton = document.createElement("button");
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(blenderArray[index]));
            newDiv.appendChild(newButton);
        }
    }
    function handleToCartClick(_click) {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);
    }
    function createVideo(_urlInput) {
        let newVideo = document.createElement("video");
        newVideo.controls = true;
        newVideo.loop = true;
        let newSource = document.createElement("source");
        newSource.setAttribute("src", _urlInput);
        newSource.setAttribute("type", "video/mp4");
        newVideo.append(newSource);
        return newVideo;
    }
    function createImage(_urlInput) {
        let newImage = document.createElement("img");
        newImage.setAttribute("src", _urlInput);
        newImage.setAttribute("class", "pic");
        return newImage;
    }
    function generateArticleWarhammer() {
        warhammerDiv = document.querySelector("#warhammer");
        let ultramarines = {
            img: "Ultramarines.jpg",
            name: "Ultramarines",
            beschreibung: "Ultramarines grundieren",
            preis: 2.00
        };
        let ultramarinesBemalen = {
            img: "UltraSgt.jpeg",
            name: "Ultramarines bemalen",
            beschreibung: "sehen fresh aus",
            preis: 9.90
        };
        let deathGuard = {
            img: "deathguard.jpg",
            name: "Death Guard grundieren",
            beschreibung: "sehen grün aus",
            preis: 2.00
        };
        let deathguardBemalen = {
            img: "deathguard_painted.jpg",
            name: "Death Guard bemalen",
            beschreibung: "sehen eklig aus",
            preis: 9.90
        };
        let tyranidenGrundieren = {
            img: "tyranids.jpg",
            name: "Tyraniden grundieren",
            beschreibung: "sehen schwarz aus",
            preis: 2.00
        };
        let tyranidenBemalen = {
            img: "deathguard_painted.jpg",
            name: "Tyraniden bemalen",
            beschreibung: "sehen creepy aus",
            preis: 9.90
        };
        let warhammerArray = [ultramarines, ultramarinesBemalen, deathGuard, deathguardBemalen, tyranidenGrundieren, tyranidenBemalen];
        for (let index = 0; index < warhammerArray.length; index++) {
            //Div erzeugen
            let newDiv = document.createElement("div");
            newDiv.setAttribute("id", "warhammer-produkt" + index);
            document.getElementById("warhammer")?.appendChild(newDiv);
            //Produktbezeichnung hinzufügen
            let newH = document.createElement("h3");
            newH.innerHTML = warhammerArray[index].name;
            newDiv.appendChild(newH);
            //Produktbild hinzufügen
            let newImage = document.createElement("img");
            newImage.setAttribute("src", warhammerArray[index].img);
            newImage.setAttribute("class", "pic");
            newDiv.appendChild(newImage);
            //Produktbeschreibung hinzufügen
            let newP = document.createElement("p");
            newP.innerHTML = warhammerArray[index].beschreibung;
            newDiv.appendChild(newP);
            // preis hinzufügen
            let newPreis = document.createElement("h4");
            newPreis.innerHTML = warhammerArray[index].preis + "€";
            newDiv.appendChild(newPreis);
            // Button hinzufügen
            let newButton = document.createElement("button");
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(warhammerArray[index]));
            newDiv.appendChild(newButton);
        }
    }
})(SwampowlShop || (SwampowlShop = {}));
//# sourceMappingURL=script.js.map