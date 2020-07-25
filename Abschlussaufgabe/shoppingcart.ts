namespace eisdiele {
  // import * as _ from "./script_eisdiele";

  let container: HTMLDivElement;
  let sendOrderButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("cartOrderConfirmation");
  let article: eisdiele.IceProduct;
  let prodctCount: number = 0;
  let counter: number = parseInt(<string>localStorage.getItem("counter"));
  let finalPrice: number = 0;
  let databaseString: String = "";
  let tempString: String = "";

  window.addEventListener("load", init);

  sendOrderButton.addEventListener("click", sendData);
  async function sendData(): Promise<void> {
    let formData: FormData;
    formData = new FormData(document.forms[0]);
    let _url: string = "https://git.heroku.com/swampowl.git";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    _url = _url + "/send" + "?" + query.toString();
    await fetch(_url);
  }

  function init(_event: Event): void {
    container = <HTMLDivElement>document.querySelector("#costumerOrders");
    document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
    buildArticles();
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
    cartOrderDiv.innerHTML = `Eis ${prodctCount}<ul id="oderList">${article.coneType}${article.ice}${article.preis?.toFixed(2)} €</ul>
    <button id="deleteSingleOrder">Eis löschen</button>`;
    for (let i: number = 0; i <= counter; i++) {
      databaseString = tempString;
    }
    console.log(databaseString);
    return cartOrderDiv;
  }


  function deleteAll(): void {
    localStorage.clear();
    container.innerHTML = "";
  }
}