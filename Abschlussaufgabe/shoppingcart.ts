namespace eisdiele {
  import IceProduct  from "./script_eisdiele";
  let container: HTMLDivElement;
  
  let article: IceProduct;


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
      article = <IceProduct>JSON.parse(jsonString);
      container.appendChild(generateArticles(article));
    }
  }

  function generateArticles(article: IceProduct): HTMLDivElement {
    let cartOrderDiv: HTMLDivElement = document.createElement("div");
    // cartOrderDiv.setAttribute("key", article.key);
    cartOrderDiv.innerHTML = `<ul><li>${article.coneType}</li></ul>`;
    return cartOrderDiv;
  }

  function deleteAll(): void {
    localStorage.clear();
    container.innerHTML = "";
  }
}