namespace SwampowlShop {
  let container: HTMLDivElement;
  let article: Article;

  window.addEventListener("load", init);

  function init(_event: Event): void {
    container = <HTMLDivElement>document.querySelector("#Warenkorb");
    buildArticles();
  }
  function buildArticles(): void {
    console.log(localStorage);
    for (let index: number = 0; index <= localStorage.length; index++) {
      let articleKey: string = <string>localStorage.key(index);
      let jsonString: string = <string>localStorage.getItem(articleKey);
      article = <Article>JSON.parse(jsonString);
      container.appendChild(generateDiv(article));
    }


  }
}