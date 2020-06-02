console.log("Hallo");
//Warhammer
namespace Warhammer {
    interface WarhammerInterface {
        _img: string;
        _name: string;
        _beschreibung: string;
        _preis: number;
    }
    let ultramarines: WarhammerInterface = {
        _img:  "Ultramarines.jpg",
        _name: "Ultramarines",
        _beschreibung: "Ultramarines grundieren",
        _preis: 2.00
    };

    let ultramarinesBemalen: WarhammerInterface = {
        _img: "UltraSgt.jpeg",
        _name: "Ultramarines bemalen",
        _beschreibung: "sehen fresh aus",
        _preis: 9.90
    };

    let deathGuard: WarhammerInterface = {
        _img: "deathguard.jpg",
        _name: "Death Guard grundieren",
        _beschreibung: "sehen grün aus",
        _preis: 2.00
    };

    let deathguardBemalen: WarhammerInterface = {
        _img: "deathguard_painted.jpg",
        _name: "Death Guard bemalen",
        _beschreibung: "sehen eklig aus",
        _preis: 9.90
    };

    let tyranidenGrundieren: WarhammerInterface = {
        _img: "tyranids.jpg",
        _name: "Tyraniden grundieren",
        _beschreibung: "sehen schwarz aus",
        _preis: 2.00
    };

    let tyranidenBemalen: WarhammerInterface = {
        _img: "deathguard_painted.jpg",
        _name: "Tyraniden bemalen",
        _beschreibung: "sehen creepy aus",
        _preis: 9.90
    };

    let warhammerArray: WarhammerInterface[] = [ultramarines, ultramarinesBemalen, deathGuard, deathguardBemalen, tyranidenGrundieren, tyranidenBemalen];

    //Produkte einschleifen
    for (let _index: number = 0; _index < warhammerArray.length; _index++) {
        
       
        //Div erzeugen
        let _newDiv: HTMLDivElement = document.createElement("div");
        _newDiv.setAttribute("id", "warhammer-produkt" + _index);
        document.getElementById("warhammer") ?.appendChild(_newDiv);
         //Produktbezeichnung hinzufügen
        let _newImage: HTMLElement = document.createElement("newImage");
        _newImage.setAttribute ("src", warhammerArray[_index]._img);
        _newDiv.appendChild(_newImage);
        //Produktbezeichnung hinzufügen
        let _newH3: HTMLHeadingElement = document.createElement("h3");
        _newH3.innerHTML = warhammerArray[_index]._name;
        _newDiv.appendChild(_newH3);
       // document.getElementById("warhammer" + _index) ?.appendChild(_newH3);
        //Produkt_beschreibung hinzufügen
        let _newP: HTMLParagraphElement = document.createElement("p");
        _newP.innerHTML = warhammerArray[_index]._beschreibung;
        _newDiv.appendChild(_newP);
      //  document.getElementById("warhammer" + _index) ?.appendChild(_newP);
        // _preis hinzufügen
        let _newPreis: HTMLHeadingElement = document.createElement("h4");
        _newPreis.innerHTML = warhammerArray[_index]._preis + "€";
        _newDiv.appendChild(_newPreis);
        
    //    document.getElementById("warhammer" + _index) ?.appendChild(_newPreis);
    }


}
//Warhammer
namespace Blender {
    interface BlenderInterface {
        _img: string;
        _name: string;
        _beschreibung: string;
        _preis: number;
    }
    let smallPic: BlenderInterface = {
        _img:  "BlackWhite.jpg",
        _name: "Kleines Bild",
        _beschreibung: "abstrakte Kunst ist crazy",
        _preis: 2.00
    };

    let mediumPic: BlenderInterface = {
        _img: "Blue4k.jpg",
        _name: "4k Bild",
        _beschreibung: "is voll 4k",
        _preis: 4.50
    };

    let highPic: BlenderInterface = {
        _img: "Ciecle_rosegold.higher_resjpg.jpg",
        _name: "4K Abstrakte Kunst",
        _beschreibung: "Hobby der Jungfräulichkeit",
        _preis: 8.00
    };

    let smallVid: BlenderInterface = {
        _img: "Test_000001-0120.mp4",
        _name: "kleiner Loop",
        _beschreibung: "sieht nur halb fertig aus",
        _preis: 5
    };

    let midVid: BlenderInterface = {
        _img: "Hexagon_orange.mp4",
        _name: "Fancy Loop",
        _beschreibung: "da war jemandem langweilig",
        _preis: 2.00
    };

    let highVid: BlenderInterface = {
        _img: "Circle_Animation.mp4",
        _name: "4k Animation",
        _beschreibung: "grenzt an waffenscheinpflichtigen Autismus",
        _preis: 9.90
    };

    let blenderArray: BlenderInterface[] = [smallPic, mediumPic, highPic, smallVid, midVid, highVid ];
    //Produkte einschleifen
    for (let _index: number = 0; _index < blenderArray.length; _index++) {
        
       
        //Div erzeugen
        let _newDiv: HTMLDivElement = document.createElement("div");
        _newDiv.setAttribute("id", "blender-produkt" + _index);
        document.getElementById("blender") ?.appendChild(_newDiv);
         //Produktbezeichnung hinzufügen
        let _newImage: HTMLElement = document.createElement("newImage");
        _newImage.setAttribute ("src", blenderArray[_index]._img);
        _newDiv.appendChild(_newImage);
        //Produktbezeichnung hinzufügen
        let _newH3: HTMLHeadingElement = document.createElement("h3");
        _newH3.innerHTML = blenderArray[_index]._name;
        _newDiv.appendChild(_newH3);
        //Produkt_beschreibung hinzufügen
        let _newP: HTMLParagraphElement = document.createElement("p");
        _newP.innerHTML = blenderArray[_index]._beschreibung;
        _newDiv.appendChild(_newP);
     
        // _preis hinzufügen
        let _newPreis: HTMLHeadingElement = document.createElement("h4");
        _newPreis.innerHTML = blenderArray[_index]._preis + "€";
        _newDiv.appendChild(_newPreis);
        
    }
}