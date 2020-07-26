namespace eisdiele {
  // import * as _ from "./script_eisdiele";
  window.addEventListener("load", init);
  let container: HTMLDivElement;
  let article: eisdiele.IceProduct;
  let prodctCount: number = 0;
  let counter: number = parseInt(<string>localStorage.getItem("counter"));
  let finalPrice: number = 0;
  let databaseString: String = "";
  let tempString: String = "";
  let sendOrderButton: HTMLButtonElement;
  let cartOrderConfirmationParagraph: HTMLParagraphElement;

  function init(_event: Event): void {
    sendOrderButton = <HTMLButtonElement>document.getElementById("cartOrderConfirmation");
    cartOrderConfirmationParagraph = <HTMLParagraphElement>document.getElementById("orderConfirmationParagraph");
    container = <HTMLDivElement>document.querySelector("#costumerOrders");
    document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
    buildArticles();

    sendOrderButton.addEventListener("click", sendData);
    async function sendData(): Promise<void> {
      console.log("TEst");
      cartOrderConfirmationParagraph.innerHTML = "Ihre Bestellung wird nun bearbeitet!<br>Ihr Eis wird Sie in Kürze erreichen!";
      let formData: FormData;
      formData = new FormData(document.forms[0]);
      let _url: string = "https://swampowl.herokuapp.com";
      let query: URLSearchParams = new URLSearchParams(<any>formData);
      _url = _url + "/send" + "?" + query.toString();
      await fetch(_url);
    }
  }

  function buildArticles(): void {
    console.log(localStorage);
    for (let index: number = 0; index <= counter; index++) {
      //let articleKey: string = <string>localStorage.key(index);
      let jsonString: string = <string>localStorage.getItem("order" + index);
      article = <eisdiele.IceProduct>JSON.parse(jsonString);
      let element: HTMLDivElement = generateArticles(article);
      container.appendChild(element);
      element.querySelector("#deleteSingleOrder")?.addEventListener("click", deleteSingleOrder);
      function deleteSingleOrder(_event: Event): void {
        console.log(((<HTMLElement>_event.currentTarget).parentElement));
        localStorage.removeItem("order" + index);
        ((<HTMLDivElement>_event.currentTarget).parentElement!).remove();
        tempString = tempString + jsonString;
      }
    }

  }

  function generateArticles(article: eisdiele.IceProduct): HTMLDivElement {
    let cartOrderDiv: HTMLDivElement = document.createElement("div");
    // cartOrderDiv.setAttribute("key", article.key);
    prodctCount = prodctCount + 1;
    cartOrderDiv.innerHTML = `<p>Eis ${prodctCount}: ${article.coneType},${article.ice},${article.topping}: ${article.preis?.toFixed(2)} €<br>
    <button id="deleteSingleOrder">Eis löschen</button></p>`;
    for (let i: number = 0; i <= counter; i++) {
      databaseString = tempString;
    }
    console.log(databaseString);
    return cartOrderDiv;
  }


  function deleteAll(): void {
    localStorage.clear();
    container.innerHTML = "Der Warenkorb enthält keine Produkte mehr.";
  }
}