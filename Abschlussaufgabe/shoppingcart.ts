namespace eisdiele {
  // import * as _ from "./script_eisdiele";

  let container: HTMLDivElement;
  let article: eisdiele.IceProduct;


  window.addEventListener("load", init);

  function init(_event: Event): void {
    container = <HTMLDivElement>document.querySelector("#costumerOrders");
    document.querySelector("#deleteAll")?.addEventListener("click", deleteAll);
    buildArticles();
  }

  function buildArticles(): void {
    console.log(localStorage);

    for (let index: number = 0; index <= localStorage.length; index++) {
      let articleKey: string = <string>localStorage.key(index);
      let jsonString: string = <string>localStorage.getItem(articleKey);
      console.log(jsonString);
      article = <eisdiele.IceProduct>JSON.parse(jsonString);
      let element: HTMLDivElement = generateArticles(article);
      container.appendChild(element);
      element.querySelector("#deleteSingleOrder")?.addEventListener("click", deleteSingleOrder);
    }
  }

  function generateArticles(article: eisdiele.IceProduct): HTMLDivElement {
    let cartOrderDiv: HTMLDivElement = document.createElement("div");
    // cartOrderDiv.setAttribute("key", article.key);
    cartOrderDiv.innerHTML = `<ul><li>${article.coneType}, ${article.ice},${article.preis?.toFixed(2)}</li></ul><br>
    <button id="deleteSingleOrder">Eis löschen</button>`;
    return cartOrderDiv;
  }
  function deleteSingleOrder(_event: Event): void {
    console.log(((<HTMLElement>_event.currentTarget).parentElement));
    }


  function deleteAll(): void {
    localStorage.clear();
    container.innerHTML = "";
  }
}