namespace SwampowlShop {
    window.addEventListener("load", init);
    let cartCounter: number = 0;
    let cartPrice: number = 0;
    let counterP: HTMLParagraphElement;
    let chaosDiv: HTMLDivElement;
    let imperiumDiv: HTMLDivElement;


    function init(_event: Event): void {
        console.log("Seite geladen");
        generateArticleImperium();
        generateArticleChaos();
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
            case "#chaos":
                showChaos();
                break;
            case "#imperium":
                showImperium();
                break;
        }
    }

    function showHome(): void {
        console.log("h");
        imperiumDiv.style.display = "block";
        chaosDiv.style.display = "block";
    }

    function showChaos(): void {
        console.log("w");
        chaosDiv.style.display = "block";
        imperiumDiv.style.display = "none";
    

    }

    function showImperium(): void {
        console.log("b");

        chaosDiv.style.display = "none";
        imperiumDiv.style.display = "block";
    }


    interface Article {
        img: string;
        name: string;
        beschreibung: string;
        preis: number;
    }
    function generateArticleImperium(): void {
        imperiumDiv = <HTMLDivElement>document.querySelector("#imperium");

        let salamanders: Article = {
            img: "Imperium/Salamanders.webp",
            name: "Salamanders",
            beschreibung: "Loyalisten, die das Leben der einfachen Menschen über Ihr eigenes stellen.",
            preis: 9.95
        };

        let bloodAngels: Article = {
            img: "Imperium/BloodAngels.jfif",
            name: "Blood Angels",
            beschreibung: "Von Blutdurst getriebene Loyalisten.",
            preis: 9.95
        };

        let imperialFists: Article = {
            img: "Imperium/ImperialFists.jfif",
            name: "Imperial Fists",
            beschreibung: "Die letzten Marines auf Terra.",
            preis: 9.95
        };

        let spaceWolves: Article = {
            img: "Imperium/SpaceWolves.jpg",
            name: "Space Wolves",
            beschreibung: "Weltraum Wikinger die mit Äxten gegen Raumschiffe schlagen.",
            preis: 9.95
        };

        let ultramarines: Article = {
            img: "Imperium/Ultramarines.jfif",
            name: "Ultramarines",
            beschreibung: "Marines, die sich streng an jegliche Kriegsgesetze halten.",
            preis: 9.95
        };

        let whiteScars: Article = {
            img: "Imperium/WhiteScars.jfif",
            name: "White Scars",
            beschreibung: "Wenn ein Planet mal schnell überrannt werden muss.",
            preis: 9.95
        };


        let imperialArray: Article[] = [salamanders, bloodAngels, imperialFists, spaceWolves, ultramarines, whiteScars];
        //Produkte einschleifen
        for (let index: number = 0; index < imperialArray.length; index++) {


            //Div erzeugen
            let newDiv: HTMLDivElement = document.createElement("div");
            newDiv.setAttribute("id", "imperium-produkt" + index);
            document.getElementById("imperium")?.appendChild(newDiv);
            //Produktbezeichnung hinzufügen
            let newH: HTMLHeadingElement = document.createElement("h3");
            newH.innerHTML = imperialArray[index].name;
            newDiv.appendChild(newH);
            //Produktbild hinzufügen
            let url: string = imperialArray[index].img;
            newDiv.appendChild((url.split(".")[1] == "mp4" ? createVideo(url) : createImage(url)));

            //Produktbeschreibung hinzufügen
            let newP: HTMLParagraphElement = document.createElement("p");
            newP.innerHTML = imperialArray[index].beschreibung;
            newDiv.appendChild(newP);
            // preis hinzufügen
            let newPreis: HTMLHeadingElement = document.createElement("h4");
            newPreis.innerHTML = imperialArray[index].preis.toFixed(2) + "€";
            newDiv.appendChild(newPreis);
            // Button hinzufügen
            let newButton: HTMLButtonElement = document.createElement("button");
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(imperialArray[index]));
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


    function generateArticleChaos(): void {
        chaosDiv = <HTMLDivElement>document.querySelector("#chaos");
        let blackLegion: Article = {
            img: "Chaos/BlackLegion.jpg",
            name: "Black Legion",
            beschreibung: "Die erste abtrünnige Legion unter Horus.",
            preis: 9.95
        };

        let emperorsChildren: Article = {
            img: "Chaos/EmperorsChildren.jpeg",
            name: "Emperor's Children",
            beschreibung: "Sex-Addicts, die gerne töten während sie Spaß haben.",
            preis: 9.95
        };

        let ironWarriors: Article = {
            img: "Chaos/IronWarriors.jpg",
            name: "Iron Warriors",
            beschreibung: "Brutale, aber Ehrenhafte Duellanten, die den Zweikampf lieben.",
            preis: 9.95
        };

        let nightLords: Article = {
            img: "Chaos/NightLords.jpg",
            name: "Night Lords",
            beschreibung: "Unaufspürbare Terror-Bringer. Man sieht sie nicht bevor es zu spät ist.",
            preis: 9.95
        };

        let thousandSons: Article = {
            img: "Chaos/ThousandSons.webp",
            name: "Thousand Sons",
            beschreibung: "In Ihrer Rüstung lebt kein Mensch mehr, nurnoch Boshaftigkeit.",
            preis: 9.95
        };

        let worldEaters: Article = {
            img: "Chaos/WorldEaters.jpg",
            name: "World Eaters",
            beschreibung: "Ihr einziges Ziel ist, die Welten des Imperiums brennen zu sehen.",
            preis: 9.95
        };

        let chaosArray: Article[] = [blackLegion, emperorsChildren, ironWarriors, nightLords, thousandSons, worldEaters];

        for (let index: number = 0; index < chaosArray.length; index++) {


            //Div erzeugen
            let newDiv: HTMLDivElement = document.createElement("div");
            newDiv.setAttribute("id", "chaos-produkt" + index);
            document.getElementById("chaos")?.appendChild(newDiv);
            //Produktbezeichnung hinzufügen
            let newH: HTMLHeadingElement = document.createElement("h3");
            newH.innerHTML = chaosArray[index].name;
            newDiv.appendChild(newH);
            //Produktbild hinzufügen
            let newImage: HTMLElement = document.createElement("img");
            newImage.setAttribute("src", chaosArray[index].img);
            newImage.setAttribute("class", "pic");
            newDiv.appendChild(newImage);
            //Produktbeschreibung hinzufügen
            let newP: HTMLParagraphElement = document.createElement("p");
            newP.innerHTML = chaosArray[index].beschreibung;
            newDiv.appendChild(newP);
            // preis hinzufügen
            let newPreis: HTMLHeadingElement = document.createElement("h4");
            newPreis.innerHTML = chaosArray[index].preis + "€";
            newDiv.appendChild(newPreis);
            // Button hinzufügen
            let newButton: HTMLElement = document.createElement("button");
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(chaosArray[index]));
            newDiv.appendChild(newButton);

        }


    }

}