namespace eisdiele {
    window.addEventListener("load", init);
    //Objekte erstellen
    let iceInCart: number = 0;
    let totalPrice: number = 0;
    let coneDiv: HTMLDivElement;
    let icecreamDiv: HTMLDivElement;
    let toppingDiv: HTMLDivElement;
    let previewDiv: HTMLDivElement;
    let cartCounter: HTMLParagraphElement;


    async function init(_event: Event): Promise<void> {
        await communicate("articles.json");
        console.log("Seite geladen");
        cartCounter = <HTMLParagraphElement>document.querySelector(".flexContainer p");
    }

    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch("articles.json");
        _categories = <Article[][]>await response.json();
        generateArticles(_categories);
        console.log("Response", _categories);
    }

//Artikel aus articles.json einschleifen

    function generateArticles(_categories: Article[][]): void {
        coneDiv = <HTMLDivElement>document.querySelector(".cone");
        icecreamDiv = <HTMLDivElement>document.querySelector(".imperium");
        toppingDiv = <HTMLDivElement>document.querySelector(".toppings");
        previewDiv = <HTMLDivElement>document.querySelector(".preview");

        for (let categoryTemp of _categories) {

            let div: HTMLDivElement = <HTMLDivElement>document.querySelector(_categories.indexOf(categoryTemp) == 0 ? "#chaos" : "#imperium");
            for (let article of categoryTemp) {
                //Div erzeugen
                div.appendChild(generateDiv(article, false));
            }
        }
    }

    // Div für Artikel aufbauen

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
        newP.innerHTML = _article.infotext;
        newDiv.appendChild(newP);
        // preis hinzufügen
        let newPreis: HTMLHeadingElement = document.createElement("h4");
        newPreis.innerHTML = _article.preis + "€";
        newDiv.appendChild(newPreis);
        // Button hinzufügen
        let newButton: HTMLElement = document.createElement("button");
        if(!inCart) {
            newButton.innerHTML = "hinzufügen";
            newButton.addEventListener("click", handleToCartClick.bind(_article));
        }
        else {
            newButton.innerHTML = "Löschen";
            newButton.addEventListener("click", deleteItem.bind(_article));
        }
        newDiv.appendChild(newButton);
        return newDiv;
    }
    // zum LocalStorage hinzufügen
    function toStorage(_article: Article): void {
        let inhalt: string = JSON.stringify(_article);
        localStorage.setItem(_article.name, inhalt);
        console.log(localStorage)

    }
    // Anzahl des Warenkorbs hochzählen

    function handleToCartClick(this: Article, _click: MouseEvent): void {
        cartCounter++;
        cartPrice += this.preis;
        console.log(counterP);
        counterP.innerHTML = cartCounter <= 0 ? "" : cartCounter + "";
        console.log(cartPrice);
        console.log(cartCounter);
        toStorage(this);

    }

    // einzelnes Item aus dem Warenkorb löschen

    function deleteItem(this: Article, _click: MouseEvent): void {

        Object.keys(localStorage).forEach(key=> {
            let str = localStorage.getItem(key);
            if(str != null) {
                let item =  JSON.parse(str);
                if(item.name == this.name) {
                    localStorage.removeItem(key);

                }
            }
        });

        let element = document.getElementById(this.name);
        element?.parentElement?.removeChild(element);
    }



}
