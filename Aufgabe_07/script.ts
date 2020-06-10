namespace SwampowlShop {
    window.addEventListener("load", init);
    let cartCounter: number = 0;
    let cartPrice: number = 0;
    let counterP: HTMLParagraphElement;
    let chaosDiv: HTMLDivElement;
    let imperiumDiv: HTMLDivElement;

    export let categories: Article[][] = [];
    export let category: Article[] = [];

    export interface Article {
        category: string;
        img: string;
        name: string;
        beschreibung: string;
        preis: number;
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch("articles.json");
        categories = <Article[][]>await response.json();
        generateArticles(categories);
        console.log("Response", categories);
    }

    async function init(_event: Event): Promise<void> {
        await communicate("articles.json");
        console.log("Seite geladen");
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

    function handleToCartClick(this: Article, _click: MouseEvent): void {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);
        toStorage(this);

    }

    function toStorage(_article: Article): void {
        let inhalt: string = JSON.stringify(_article);
        localStorage.setItem(_article.name, inhalt);
        console.log(localStorage)

    }
    function generateArticles(_categories: Article[][]): void {
        chaosDiv = <HTMLDivElement>document.querySelector("#chaos");
        imperiumDiv = <HTMLDivElement>document.querySelector("#imperium");

        for (let categoryTemp of categories) {

            let div: HTMLDivElement = <HTMLDivElement>document.querySelector(categories.indexOf(categoryTemp) == 0 ? "#chaos" : "#imperium");
            for (let article of categoryTemp) {
                //Div erzeugen
                div.appendChild(generateDiv(article));
            }
        }
    }
    export function generateDiv(_article: Article): HTMLDivElement {
        let newDiv: HTMLDivElement = document.createElement("div");
        //Produktbezeichnung hinzufügen
        let newH: HTMLHeadingElement = document.createElement("h3");
        newH.innerHTML = _article.name;
        newDiv.appendChild(newH);
        //Produktbild hinzufügen
        let newImage: HTMLElement = document.createElement("img");
        newImage.setAttribute("src", _article.img);
        newImage.setAttribute("class", "pic");
        newDiv.appendChild(newImage);
        //Produktbeschreibung hinzufügen
        let newP: HTMLParagraphElement = document.createElement("p");
        newP.innerHTML = _article.beschreibung;
        newDiv.appendChild(newP);
        // preis hinzufügen
        let newPreis: HTMLHeadingElement = document.createElement("h4");
        newPreis.innerHTML = _article.preis + "€";
        newDiv.appendChild(newPreis);
        // Button hinzufügen
        let newButton: HTMLElement = document.createElement("button");
        newButton.innerHTML = "ins Cart...";
        newButton.addEventListener("click", handleToCartClick.bind(_article));
        newDiv.appendChild(newButton);
        return newDiv;
    }

}


