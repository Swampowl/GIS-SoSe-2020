namespace SwampowlShop {
    window.addEventListener("load", init);
    let cartCounter: number = 0;
    let cartPrice: number = 0;
    let counterP: HTMLParagraphElement;
    let coneDiv: HTMLDivElement;
    let icecreamDiv: HTMLDivElement;
    let toppingDiv: HTMLDivElement;
    let url: string = "Data.json";

    export let categories: Article[][][] = [];
    export let category: Article[] = [];

    export interface Article {
        category: string;
        img: string;
        name: string;
        beschreibung: string;
        preis: number;
    }

    function communicate(_url: "articles.json"): Promise<void> {
        let response: Response = await fetch("articles.json");
        categories = <Article[][][]>await response.json();
        generateArticles(categories);
        console.log("Response", categories);
    }

    async function init(_event: Event): Promise<void> {
        await communicate("articles.json");
        console.log("Seite geladen");

        counterP = <HTMLDivElement>document.querySelector(".navbar .a .cart_counter");
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

    function deleteItem(this: Article, _click: MouseEvent): void {

        Object.keys(localStorage).forEach(key => {
            let str = localStorage.getItem(key);
            if (str != null) {
                let item = JSON.parse(str);
                if (item.name == this.name) {
                    localStorage.removeItem(key);

                }
            }
        });

        let element = document.getElementById(this.name);
        element?.parentElement?.removeChild(element);
    }

    function toStorage(_article: Article): void {
        let inhalt: string = JSON.stringify(_article);
        localStorage.setItem(_article.name, inhalt);
        console.log(localStorage)

    }
    function generateArticles(_categories: Article[][][]): void {
        coneDiv = <HTMLDivElement>document.querySelector(".content .cone");
        icecreamDiv = <HTMLDivElement>document.querySelector(".content .icecream");
        toppingDiv = <HTMLDivElement>document.querySelector(".content .toppings");


        for (let categoryTemp of categories) {

            let div: HTMLDivElement = <HTMLDivElement>document.querySelector(categories.indexOf(categoryTemp) == 0 ? ".content .cone" : ".content .icecream" : ".content .toppings");
            for (let article of categoryTemp) {
                //Div erzeugen
                div.appendChild(generateDiv(article, false));
            }
        }
    }
    export function generateDiv(_article: Article, inCart: boolean): HTMLDivElement {
        let newDiv: HTMLDivElement = document.createElement("div");
        //Produktbezeichnung hinzufügen
        newDiv.id = _article.name;
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
        if (!inCart) {
            newButton.innerHTML = "ins Cart...";
            newButton.addEventListener("click", handleToCartClick.bind(_article));
        }
        else {
            newButton.innerHTML = "Löschen";
            newButton.addEventListener("click", deleteItem.bind(_article));
        }
        newDiv.appendChild(newButton);
        return newDiv;
    }

}


