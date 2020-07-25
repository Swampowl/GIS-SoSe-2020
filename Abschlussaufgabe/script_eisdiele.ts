
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
    let coneCounter: number = 0;

    let storageTemp: Storage = localStorage;

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
                console.log("Button gedrückt");
                if (coneCounter < 1 && _categories[i].category == "cone") {
                    coneCounter = coneCounter + 1;
                    if (_categories[i].category == "cone") {
                        let previewPicture: HTMLImageElement = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewBase");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "icecream") {
                        let previewPicture: HTMLImageElement = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewIcecream");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "topping") {
                        let previewPicture: HTMLImageElement = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewTopping");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }

                    previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2);
                }
                if (_categories[i].category != "cone") {
                    if (_categories[i].category == "cone") {
                        let previewPicture: HTMLImageElement = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewBase");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "icecream") {
                        let previewPicture: HTMLImageElement = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewIcecream");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }
                    if (_categories[i].category == "topping") {
                        let previewPicture: HTMLImageElement = document.createElement("img");
                        previewPicture.setAttribute("src", _categories[i].img);
                        previewPicture.setAttribute("id", "icePreviewTopping");
                        (<HTMLDivElement>document.querySelector(".preview")).append(previewPicture);
                        localStorage.setItem("name" + previewCounter, _categories[i].name);
                        previewCounter = previewCounter + 1;
                        console.log(localStorage);
                        cartPrice = cartPrice + _categories[i].preis;
                        pricePreview = pricePreview + _categories[i].preis;
                        console.log(cartPrice.toFixed(2));
                    }

                    previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2);

                }



            }

            document.getElementById("deleteCurrentIce")?.addEventListener("click", deleteIcePreview);
            // DELETE PREVIEW ICE
            function deleteIcePreview(_event: Event): void {
                document.getElementById("icePreviewTopping")?.remove();
                document.getElementById("icePreviewIcecream")?.remove();
                document.getElementById("icePreview")?.remove();
                pricePreview = 0.00;
                coneCounter = 0;
                previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2);

            }

            document.getElementById("toCart")?.addEventListener("click", toCart);
            function toCart(_event: Event): void {
                cartCounter = (cartCounter + 1);
                document.getElementById("icePreviewTopping")?.remove();
                document.getElementById("icePreviewIcecream")?.remove();
                document.getElementById("icePreview")?.remove();
                pricePreview = 0.00;
                coneCounter = 0;
                previewPrice.innerHTML = "Preis: " + <String>pricePreview.toFixed(2);
                cartCounterParagraph.innerHTML = `${cartCounter / 12}`;
            }

        }

    }

}
