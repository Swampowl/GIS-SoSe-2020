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
    let counter: number = 0;
    let previewPrice: HTMLParagraphElement;
    let cartStorage: Storage;
    let iceProduct: IceProduct;


    //Interface für das Anzeigen der Produkte auf der Startseite 
    interface Article {
        category: string;
        img: string;
        name: string;
        infotext: string;
        preis: number;
        key: string;

    }
    //Interface wird an shoppingcart.ts/js exportiert
    export interface IceProduct {
        //optional gesetze Attribute um mehrere Eis bestellen zu können
        coneType?: string;
        ice?: string[];
        topping?: string[];
        preis?: number;
        priceFinal: number;

    }

    //Wird beim Seitenaufruf gefeuert & initialisiert laden der Artikel
    async function init(_event: Event): Promise<void> {
        await communicate("articles.json");
        console.log("Seite geladen");
    }
    //article.json importieren
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
        //Artikel aus .JSON einschleifen
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
            //generierte Divs in Kategorie einfügen
            if (_categories[i].category == "cone") {
                (<HTMLDivElement>document.querySelector(".cone")).append(newDiv);
            }
            if (_categories[i].category == "icecream") {
                (<HTMLDivElement>document.querySelector(".icecream")).append(newDiv);
            }
            if (_categories[i].category == "topping") {
                (<HTMLDivElement>document.querySelector(".topping")).append(newDiv);
            }
            // Zum Vorschau-Eis hinzufügen
            function addToIce(_event: Event): void {
                //Checken ob bereits ein IceProduct definiert ist
                if (iceProduct === undefined) {
                    iceProduct = {};
                }
                //Wechsel zwischen Eis-Behälter ermöglichen & zum Vorschau-Eis hinzufügen
                if (_categories[i].category == "cone") {
                    iceProduct.coneType = _categories[i].name;
                    let previewPicture: HTMLImageElement | null = document.querySelector("#icePreviewBase");
                    //Wechsel
                    if (previewPicture != null) {
                        previewPicture.setAttribute("src", _categories[i].img);
                    }
                    //zum Vorschau-Eis hinzufügen
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
                    //Eissorte zum Vorschau-Eis hinzufügen
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
                //Toppings zum Vorschau-Eis hinzufügen
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

    // Vorschau-Eis in String parsen & in localStorage pushen
    function toCart(_event: Event): void {
        if (!iceProduct.coneType) {
            alert("Keine Waffel gewählt.");
            return;
        }
        if (!iceProduct.topping) {
            iceProduct.topping = [];
        }
        if (!iceProduct.ice) {
            iceProduct.ice = [];
        }
        cartCounter = (cartCounter + 1);
        iceProduct.preis = pricePreview;
        localStorage.setItem("order" + counter, JSON.stringify(iceProduct));
        cartCounterParagraph.innerHTML = `${cartCounter}`;
        deleteIcePreview(_event);
        console.log(cartStorage);
        counter++;
        localStorage.setItem("counter", counter + "");
    }
    // Vorschau-Eis löschen & Preis festlegen
    function deleteIcePreview(_event: Event): void {
        console.log(_event.currentTarget);
        //Wenn delete-event von toCart-Button getriggert wird
        if ((<HTMLElement>_event.currentTarget).id === "toCart") {
            console.log(cartPrice);
        }
        //Eis wird verworfen, Preis wiederherstellen
        else {
            cartPrice = cartPrice - pricePreview;
            console.log(cartPrice);
        }
        //Vorschau-Div leeren & Vorschau-Preis resetten
        let newPreview = document.querySelector(".preview");
        if (newPreview != null) {
            newPreview.innerHTML = "Vorschau: <br>";
            pricePreview = 0.00;
            previewPrice = <HTMLParagraphElement>document.getElementById("currentPricePreview");
            previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2) + " €";
        }
    }
}