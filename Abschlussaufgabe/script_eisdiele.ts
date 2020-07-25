namespace eisdiele {
    window.addEventListener("load", init);


    //Objekte erstellen
    let coneDiv: HTMLDivElement;
    let icecreamDiv: HTMLDivElement;
    let toppingDiv: HTMLDivElement;
    let cartCounter: number = 0;
    let cartCounterParagraph: HTMLParagraphElement;
    let cartPrice: number = 0.00;
    let pricePreview: number = 0.00;
    let previewCounter: number = 0;
    let previewPrice: HTMLParagraphElement;
    let cartStorage: Storage;
    let iceProduct: IceProduct;



    interface Article {

        category: string;
        img: string;
        name: string;
        infotext: string;
        preis: number;
        key: string;

    }

    export interface IceProduct {
        //optional gesetze Attribute
        coneType?: string;
        ice?: string[];
        topping?: string[];
        preis?: number;

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
        previewPrice = <HTMLParagraphElement>document.getElementById("currentPricePreview");
        cartCounterParagraph = <HTMLParagraphElement>document.getElementById("cartCounter");

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
            let buttonAddElement: HTMLElement = document.createElement("Button");
            buttonAddElement.innerHTML = `hinzufügen`;
            newDiv.appendChild(buttonAddElement);
            buttonAddElement.addEventListener("click", addToIce);

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
            // hinzufügen AddToIce
            function addToIce(_event: Event): void {
                if (iceProduct === undefined) {
                    iceProduct = {};
                }

                if (_categories[i].category == "cone") {
                    iceProduct.coneType = _categories[i].name;
                    // Gibt es schon ein Cone?
                    let previewPicture: HTMLImageElement | null = document.querySelector("#icePreviewBase");
                    if (previewPicture != null) {
                        previewPicture.setAttribute("src", _categories[i].img);
                    }
                    else {
                        previewPicture = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewBase");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        previewCounter = previewCounter + 1;
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }

                }
                if (_categories[i].category == "icecream") {
                    if (iceProduct.ice === undefined) {
                        iceProduct.ice = [];
                    }
                    iceProduct.ice.push(_categories[i].name);
                    let previewPicture: HTMLImageElement = document.createElement("img");
                    previewPicture.setAttribute("src", _categories[i].img);
                    previewPicture.setAttribute("id", "icePreviewIcecream");
                    (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                    previewCounter = previewCounter + 1;
                    cartPrice = cartPrice + _categories[i].preis;
                    pricePreview = pricePreview + _categories[i].preis;
                    console.log(cartPrice.toFixed(2));
                }
                if (_categories[i].category == "topping") {

                    if (iceProduct.topping === undefined) {
                        iceProduct.topping = [];
                    }
                    iceProduct.topping.push(_categories[i].name);
                    let previewPicture: HTMLImageElement = document.createElement("img");
                    previewPicture.setAttribute("src", _categories[i].img);
                    previewPicture.setAttribute("id", "icePreviewTopping");
                    (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                    previewCounter = previewCounter + 1;
                    cartPrice = cartPrice + _categories[i].preis;
                    pricePreview = pricePreview + _categories[i].preis;
                    console.log(cartPrice.toFixed(2));
                }


                previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2) + " €";
            }
            document.getElementById("toCart")?.addEventListener("click", toCart);
            document.getElementById("deleteCurrentIce")?.addEventListener("click", deleteIcePreview);

            console.log(localStorage);
        }


    }


    function toCart(_event: Event): void {
        cartCounter = (cartCounter + 1);
        //ConeType prüfen & Preis übergeben
        iceProduct.preis = pricePreview;
        localStorage.setItem(<string>Date.now().toString(), JSON.stringify(iceProduct));
        cartCounterParagraph.innerHTML = `${cartCounter}`;
        deleteIcePreview(_event);
        console.log(cartStorage);
    }
    // DELETE PREVIEW ICE

    function deleteIcePreview(_event: Event): void {
        console.log(_event.currentTarget);
        if ((<HTMLElement>_event.currentTarget).id === "toCart") {
            console.log(cartPrice);


        }
        else {
            cartPrice = cartPrice - pricePreview;
            console.log(cartPrice);

        }





        let newPreview = document.querySelector(".preview");
        if (newPreview != null) {
            newPreview.innerHTML = "Vorschau: <br>";
            pricePreview = 0.00;
            previewPrice = <HTMLParagraphElement>document.getElementById("currentPricePreview");
            previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2) + " €";
        }
    }
}