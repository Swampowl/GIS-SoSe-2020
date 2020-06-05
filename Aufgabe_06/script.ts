namespace SwampowlShop {
    window.addEventListener("load", init);
    let cartCounter: number = 0;
    let cartPrice: number = 0;
    let counterP: HTMLParagraphElement;
    let warhammerDiv: HTMLDivElement;
    let blenderDiv: HTMLDivElement;


    function init(_event: Event): void {
        console.log("Seite geladen");
        generateArticleBlender();
        generateArticleWarhammer();
        setCategoryClick();
        counterP = <HTMLParagraphElement>document.querySelector(".flexContainer p");
    }

    function setCategoryClick(): void {
        let menue: HTMLUListElement = <HTMLUListElement>document.querySelector("#Menü");
        let max: number = menue.children.length;
        let listA: HTMLAnchorElement;
        for (let index: number = 2; index <= max; index++) {
            listA = <HTMLAnchorElement>document.querySelector("li:nth-child(" + index + ") a");
            console.log(listA);
            listA.addEventListener("click", handleCategoryClick.bind(listA));
        }
    }

    function handleCategoryClick(this: HTMLAnchorElement, _click: Event): void {
        let categoryClick: string = <string>this.getAttribute("href");
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

    function showHome(): void {
        console.log("h");
        blenderDiv.style.display = "block";
        warhammerDiv.style.display = "block";
    }

    function showWarhammer(): void {
        console.log("w");
        warhammerDiv.style.display = "block";
        blenderDiv.style.display = "none";

    }

    function showBlender(): void {
        console.log("b");

        warhammerDiv.style.display = "none";
        blenderDiv.style.display = "block";
    }


    interface Article {
        img: string;
        name: string;
        beschreibung: string;
        preis: number;
    }
    function generateArticleBlender(): void {
        blenderDiv = <HTMLDivElement>document.querySelector("#blender");

        let smallPic: Article = {
            img: "BlackWhite.jpg",
            name: "Kleines Bild",
            beschreibung: "abstrakte Kunst ist crazy",
            preis: 2.00
        };

        let mediumPic: Article = {
            img: "Blue4k.jpg",
            name: "4k Bild",
            beschreibung: "is voll 4k",
            preis: 4.50
        };

        let highPic: Article = {
            img: "Circle_rosegold.jpg",
            name: "4K Abstrakte Kunst",
            beschreibung: "Hobby der Jungfräulichkeit",
            preis: 8.00
        };

        let smallVid: Article = {
            img: "TestCircle.mp4",
            name: "kleiner Loop",
            beschreibung: "sieht nur halb fertig aus",
            preis: 5
        };

        let midVid: Article = {
            img: "Hexagon_orange.mp4",
            name: "Fancy Loop",
            beschreibung: "da war jemandem langweilig",
            preis: 2.00
        };

        let highVid: Article = {
            img: "Circle_Animation.mp4",
            name: "4k Animation",
            beschreibung: "grenzt an waffenscheinpflichtigen Autismus",
            preis: 9.90
        };


        let blenderArray: Article[] = [smallPic, mediumPic, highPic, smallVid, midVid, highVid];
        //Produkte einschleifen
        for (let index: number = 0; index < blenderArray.length; index++) {


            //Div erzeugen
            let newDiv: HTMLDivElement = document.createElement("div");
            newDiv.setAttribute("id", "blender-produkt" + index);
            document.getElementById("blender")?.appendChild(newDiv);
            //Produktbezeichnung hinzufügen
            let newH: HTMLHeadingElement = document.createElement("h3");
            newH.innerHTML = blenderArray[index].name;
            newDiv.appendChild(newH);
            //Produktbild hinzufügen
            let url: string = blenderArray[index].img;
            newDiv.appendChild((url.split(".")[1] == "mp4" ? createVideo(url) : createImage(url)));

            //Produktbeschreibung hinzufügen
            let newP: HTMLParagraphElement = document.createElement("p");
            newP.innerHTML = blenderArray[index].beschreibung;
            newDiv.appendChild(newP);
            // preis hinzufügen
            let newPreis: HTMLHeadingElement = document.createElement("h4");
            newPreis.innerHTML = blenderArray[index].preis.toFixed(2) + "€";
            newDiv.appendChild(newPreis);
            // Button hinzufügen
            let newButton: HTMLButtonElement = document.createElement("button");
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(blenderArray[index]));
            newDiv.appendChild(newButton);

        }
    }

    function handleToCartClick(this: Article, _click: MouseEvent): void {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);

    }
    function createVideo(_urlInput: string): HTMLVideoElement {
        let newVideo: HTMLVideoElement = document.createElement("video");
        newVideo.controls = true;
        newVideo.loop = true;
        let newSource: HTMLSourceElement = document.createElement("source");
        newSource.setAttribute("src", _urlInput);
        newSource.setAttribute("type", "video/mp4");
        newVideo.append(newSource);
        return newVideo;
    }
    function createImage(_urlInput: string): HTMLImageElement {
        let newImage: HTMLImageElement = document.createElement("img");
        newImage.setAttribute("src", _urlInput);
        newImage.setAttribute("class", "pic");
        return newImage;
    }


    function generateArticleWarhammer(): void {
        warhammerDiv = <HTMLDivElement>document.querySelector("#warhammer");
        let ultramarines: Article = {
            img: "Ultramarines.jpg",
            name: "Ultramarines",
            beschreibung: "Ultramarines grundieren",
            preis: 2.00
        };

        let ultramarinesBemalen: Article = {
            img: "UltraSgt.jpeg",
            name: "Ultramarines bemalen",
            beschreibung: "sehen fresh aus",
            preis: 9.90
        };

        let deathGuard: Article = {
            img: "deathguard.jpg",
            name: "Death Guard grundieren",
            beschreibung: "sehen grün aus",
            preis: 2.00
        };

        let deathguardBemalen: Article = {
            img: "deathguard_painted.jpg",
            name: "Death Guard bemalen",
            beschreibung: "sehen eklig aus",
            preis: 9.90
        };

        let tyranidenGrundieren: Article = {
            img: "tyranids.jpg",
            name: "Tyraniden grundieren",
            beschreibung: "sehen schwarz aus",
            preis: 2.00
        };

        let tyranidenBemalen: Article = {
            img: "deathguard_painted.jpg",
            name: "Tyraniden bemalen",
            beschreibung: "sehen creepy aus",
            preis: 9.90
        };

        let warhammerArray: Article[] = [ultramarines, ultramarinesBemalen, deathGuard, deathguardBemalen, tyranidenGrundieren, tyranidenBemalen];

        for (let index: number = 0; index < warhammerArray.length; index++) {


            //Div erzeugen
            let newDiv: HTMLDivElement = document.createElement("div");
            newDiv.setAttribute("id", "warhammer-produkt" + index);
            document.getElementById("warhammer")?.appendChild(newDiv);
            //Produktbezeichnung hinzufügen
            let newH: HTMLHeadingElement = document.createElement("h3");
            newH.innerHTML = warhammerArray[index].name;
            newDiv.appendChild(newH);
            //Produktbild hinzufügen
            let newImage: HTMLElement = document.createElement("img");
            newImage.setAttribute("src", warhammerArray[index].img);
            newImage.setAttribute("class", "pic");
            newDiv.appendChild(newImage);
            //Produktbeschreibung hinzufügen
            let newP: HTMLParagraphElement = document.createElement("p");
            newP.innerHTML = warhammerArray[index].beschreibung;
            newDiv.appendChild(newP);
            // preis hinzufügen
            let newPreis: HTMLHeadingElement = document.createElement("h4");
            newPreis.innerHTML = warhammerArray[index].preis + "€";
            newDiv.appendChild(newPreis);
            // Button hinzufügen
            let newButton: HTMLElement = document.createElement("button");
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(warhammerArray[index]));
            newDiv.appendChild(newButton);

        }


    }

}