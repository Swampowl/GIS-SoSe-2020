namespace eisdiele {
    window.addEventListener("load", init);
    //Objekte erstellen
    let iceInCart: number = 0;
    let totalPrice: number = 0;
    let coneDiv: HTMLDivElement;
    let icecreamDiv: HTMLDivElement;
    let toppingDiv: HTMLDivElement;
    let previewDiv: HTMLDivElement;
    let cartCounter: number = 0;
    let cartPrice: number = 0.00;

    interface Article {

        category: string;
        img: string;
        name: string;
        infotext: string;
        preis: number;

    }


    async function init(_event: Event): Promise<void> {
        await communicate("articles.json");
        console.log("Seite geladen");
    }
    //Artikel aus articles.json einschleifen
    async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch("articles.json");
        let _categories: Article[] = await response.json();
        generateArticles(_categories);
        console.log("Response", _categories);
    }


    // Div für Artikel aufbauen

    function generateArticles(_categories: Article[]): void {
        coneDiv = <HTMLDivElement>document.querySelector(".cone");
        icecreamDiv = <HTMLDivElement>document.querySelector(".icecream");
        toppingDiv = <HTMLDivElement>document.querySelector(".toppings");
        previewDiv = <HTMLDivElement>document.querySelector(".preview");

        for (let i: number = 0; i <= _categories.length; i++) {
            let newDiv: HTMLDivElement = document.createElement("div");
            newDiv.id = _categories[i].name;
            newDiv.id = _categories[i].img;
            newDiv.id = _categories[i].infotext;
            newDiv.id = `${_categories[i].preis}`;
            newDiv.id = _categories[i].category;
            newDiv.innerHTML = `
            <h3>${_categories[i].name}</h3>
            <img src=${_categories[i].img}></img>
            <p class="infotext">${_categories[i].infotext}</p>
            <p class="preis_shop">${_categories[i].preis.toFixed(2)} €</p>`;
            let buttonElement: HTMLElement = document.createElement("Button");
            buttonElement.innerHTML = `<p class="to_cart_button">hinzufügen</p>`;
            buttonElement.addEventListener("click", addToIce);
            newDiv.appendChild(buttonElement);
            if (_categories[i].category == "cone") {
                (<HTMLDivElement>document.querySelector(".cone")).append(newDiv);
            }
            if (_categories[i].category == "icecream") {
                (<HTMLDivElement>document.querySelector(".icecream")).append(newDiv);
            }
            if (_categories[i].category == "topping") {
                (<HTMLDivElement>document.querySelector(".topping")).append(newDiv);
            }

            // hinzufügen AddToIce

            function addToIce(_event: Event): void {
                console.log("Button gedrückt");
                let previewPicture: HTMLImageElement = document.createElement("img");
                previewPicture.setAttribute("src", _categories[i].img);
                previewPicture.setAttribute("id", "icePreview");
                (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);

            }




        }


    }

    /*
        
    
        // zum LocalStorage hinzufügen
        function toStorage(_article: Article): void {
            let inhalt: string = JSON.stringify(_article);
            localStorage.setItem(_article.name, inhalt);
            console.log(localStorage);
    
        }
        // Anzahl des Warenkorbs hochzählen
    
        function handleToCartClick(this: Article, _click: MouseEvent): void {
            cartCounter++;
            cartPrice += this.preis;
            console.log(cartCounter);
            console.log(cartPrice);
            console.log(cartCounter);
            toStorage(this);
    
        }
    
        // einzelnes Item aus dem Warenkorb löschen
    
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
    
    */

}
