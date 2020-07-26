namespace eisdiele {
  // import * as _ from "./script_eisdiele";
  window.addEventListener("load", init);
  let container: HTMLDivElement;
  let article: eisdiele.IceProduct;
  let prodctCount: number = 0;
  let counter: number = parseFloat(<string>localStorage.getItem("counter"));
  let finalPrice: number = 0;
  let sendOrderButton: HTMLButtonElement;
  let cartOrderConfirmationParagraph: HTMLParagraphElement;
  let priceParagraph: HTMLParagraphElement;
  let element: HTMLDivElement;



  function init(_event: Event): void {
    sendOrderButton = <HTMLButtonElement>document.getElementById("cartOrderConfirmation");
    cartOrderConfirmationParagraph = <HTMLParagraphElement>document.getElementById("orderConfirmationParagraph");
    container = <HTMLDivElement>document.querySelector("#costumerOrders");
    document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
    sendOrderButton.addEventListener("click", orderMessage);
    buildArticles();
    if (localStorage.length == 0) {
      container.innerHTML = "Der Warenkorb enthält noch keine Produkte.";
    }

  }

  function orderMessage(): void {
    if (localStorage.length != 0) {
      cartOrderConfirmationParagraph.innerHTML = "Ihre Bestellung wird nun bearbeitet!<br>Ihr Eis wird Sie in Kürze erreichen!";
      sendData();
    }
    else {
      cartOrderConfirmationParagraph.innerHTML = "Es befinden sich keine Artikel im Warenkorb!<br>Eine Bestellung ist nicht möglich!";
    }
  }
  async function sendData(): Promise<void> {
    console.log("TEst");
    let formData: FormData;
    formData = new FormData(document.forms[0]);
    let _url: string = "https://swampowl.herokuapp.com";
    //let _url: string = "http://localhost";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    _url = _url + "/send" + "?" + query.toString();
    await fetch(_url);
  }
  //einzelne Eis in Warenkorb anzeigen
  function buildArticles(): void {
    console.log(localStorage);
    function generateArticles(article: eisdiele.IceProduct): HTMLDivElement {
      let cartOrderDiv: HTMLDivElement = document.createElement("div");
      cartOrderDiv.innerHTML = `<p>Eis ${prodctCount + 1}: ${article.coneType} ${article.ice} ${article.topping}: ${article.preis?.toFixed(2)} €<br>
      <button id="deleteSingleOrder">Eis löschen</button></p>`;
      // cartOrderDiv.setAttribute("key", article.key);
      prodctCount = prodctCount + 1;
      updateFinalPrice();
      return cartOrderDiv;
    }
    
    for (let index: number = 0; index <= counter; index++) {
      //let articleKey: string = <string>localStorage.key(index);
      let jsonString: string = <string>localStorage.getItem("order" + index);
      article = <eisdiele.IceProduct>JSON.parse(jsonString);
      element = generateArticles(article);
      container.appendChild(element);
      element.querySelector("#deleteSingleOrder")?.addEventListener("click", deleteSingleOrder);
      finalPrice = finalPrice + parseFloat(article.preis + "");
      updateFinalPrice();

      //einzelne Bestellung innerhalb des Warenkorbs löschen
      function deleteSingleOrder(_event: Event): void {
        console.log("Test_deleteSingleOrder");
        // console.log(((<HTMLElement>_event.currentTarget).parentElement));
        finalPrice = finalPrice - parseFloat(article.preis + "");
        localStorage.removeItem("order" + index);
        ((<HTMLDivElement>_event.currentTarget).parentElement!).remove();
        updateFinalPrice();

      }
    }
    
  }
  function updateFinalPrice(): void {
    priceParagraph = <HTMLParagraphElement>document.getElementById("finalPrice");
    priceParagraph.innerHTML = `Gesamtpreis: ${finalPrice.toFixed(2)} €`;
  }

  //Gesamten Einkaufswagen löschen
  function deleteAll(): void {
    localStorage.clear();
    container.innerHTML = "Der Warenkorb enthält keine Produkte mehr.";
    finalPrice = 0;
    updateFinalPrice();
  }
}