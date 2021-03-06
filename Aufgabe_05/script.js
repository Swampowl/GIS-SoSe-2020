"use strict";
//Warhammer
var Warhammer;
(function (Warhammer) {
    let ultramarines = {
        _img: "Ultramarines.jpg",
        _name: "Ultramarines",
        _beschreibung: "Ultramarines grundieren",
        _preis: 2.00
    };
    let ultramarinesBemalen = {
        _img: "UltraSgt.jpeg",
        _name: "Ultramarines bemalen",
        _beschreibung: "sehen fresh aus",
        _preis: 9.90
    };
    let deathGuard = {
        _img: "deathguard.jpg",
        _name: "Death Guard grundieren",
        _beschreibung: "sehen grün aus",
        _preis: 2.00
    };
    let deathguardBemalen = {
        _img: "deathguard_painted.jpg",
        _name: "Death Guard bemalen",
        _beschreibung: "sehen eklig aus",
        _preis: 9.90
    };
    let tyranidenGrundieren = {
        _img: "tyranids.jpg",
        _name: "Tyraniden grundieren",
        _beschreibung: "sehen schwarz aus",
        _preis: 2.00
    };
    let tyranidenBemalen = {
        _img: "deathguard_painted.jpg",
        _name: "Tyraniden bemalen",
        _beschreibung: "sehen creepy aus",
        _preis: 9.90
    };
    let warhammerArray = [ultramarines, ultramarinesBemalen, deathGuard, deathguardBemalen, tyranidenGrundieren, tyranidenBemalen];
    for (let _index = 0; _index < warhammerArray.length; _index++) {
        //Div erzeugen
        let _newDiv = document.createElement("div");
        _newDiv.setAttribute("id", "warhammer-produkt" + _index);
        document.getElementById("warhammer")?.appendChild(_newDiv);
        //Produktbezeichnung hinzufügen
        let _newH3 = document.createElement("h3");
        _newH3.innerHTML = warhammerArray[_index]._name;
        _newDiv.appendChild(_newH3);
        //Produktbild hinzufügen
        let _newImage = document.createElement("img");
        _newImage.setAttribute("src", warhammerArray[_index]._img);
        _newImage.setAttribute("class", "pic");
        _newDiv.appendChild(_newImage);
        //Produkt_beschreibung hinzufügen
        let _newP = document.createElement("p");
        _newP.innerHTML = warhammerArray[_index]._beschreibung;
        _newDiv.appendChild(_newP);
        // _preis hinzufügen
        let _newPreis = document.createElement("h4");
        _newPreis.innerHTML = warhammerArray[_index]._preis + "€";
        _newDiv.appendChild(_newPreis);
        // Button hinzufügen
        let _newButton = document.createElement("button");
        _newButton.innerHTML = "ins Cart...";
        _newDiv.appendChild(_newButton);
    }
})(Warhammer || (Warhammer = {}));
//Warhammer
var Blender;
(function (Blender) {
    let smallPic = {
        _img: "BlackWhite.jpg",
        _name: "Kleines Bild",
        _beschreibung: "abstrakte Kunst ist crazy",
        _preis: 2.00
    };
    let mediumPic = {
        _img: "Blue4k.jpg",
        _name: "4k Bild",
        _beschreibung: "is voll 4k",
        _preis: 4.50
    };
    let highPic = {
        _img: "Ciecle_rosegold.higher_resjpg.jpg",
        _name: "4K Abstrakte Kunst",
        _beschreibung: "Hobby der Jungfräulichkeit",
        _preis: 8.00
    };
    let smallVid = {
        _img: "Test_000001-0120.mp4",
        _name: "kleiner Loop",
        _beschreibung: "sieht nur halb fertig aus",
        _preis: 5
    };
    let midVid = {
        _img: "Hexagon_orange.mp4",
        _name: "Fancy Loop",
        _beschreibung: "da war jemandem langweilig",
        _preis: 2.00
    };
    let highVid = {
        _img: "Circle_Animation.mp4",
        _name: "4k Animation",
        _beschreibung: "grenzt an waffenscheinpflichtigen Autismus",
        _preis: 9.90
    };
    let blenderArray = [smallPic, mediumPic, highPic, smallVid, midVid, highVid];
    //Produkte einschleifen
    for (let _index = 0; _index < blenderArray.length; _index++) {
        //Div erzeugen
        let _newDiv = document.createElement("div");
        _newDiv.setAttribute("id", "blender-produkt" + _index);
        document.getElementById("blender")?.appendChild(_newDiv);
        //Produktbezeichnung hinzufügen
        let _newH3 = document.createElement("h3");
        _newH3.innerHTML = blenderArray[_index]._name;
        _newDiv.appendChild(_newH3);
        //Produktbezeichnung hinzufügen
        let _newImage = document.createElement("img");
        _newImage.setAttribute("src", blenderArray[_index]._img);
        _newImage.setAttribute("class", "pic");
        _newDiv.appendChild(_newImage);
        //Produkt_beschreibung hinzufügen
        let _newP = document.createElement("p");
        _newP.innerHTML = blenderArray[_index]._beschreibung;
        _newDiv.appendChild(_newP);
        // _preis hinzufügen
        let _newPreis = document.createElement("h4");
        _newPreis.innerHTML = blenderArray[_index]._preis + "€";
        _newDiv.appendChild(_newPreis);
        // Button hinzufügen
        let _newButton = document.createElement("button");
        _newButton.innerHTML = "ins Cart...";
        _newDiv.appendChild(_newButton);
    }
})(Blender || (Blender = {}));
//# sourceMappingURL=script.js.map