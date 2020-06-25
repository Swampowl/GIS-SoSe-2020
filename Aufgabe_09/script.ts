namespace Aufgabe09 {

    window.addEventListener("load", init);


    function init(): void {
        createButtons();
    }

    function createButtons(): void {
        let buttonHTML: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getHTML");
        buttonHTML.addEventListener("click", getHTML);

        let buttonJSON: HTMLButtonElement = <HTMLButtonElement>document.getElementById("getJSON");
        buttonJSON.addEventListener("click", getJSON);
    }
    let formData: FormData;


    async function getHTML(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://gis2020vr.herokuapp.com";
        serverURL += "/html";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseText: string = await response.text();
        let serverResponse: HTMLElement = <HTMLElement>document.getElementById("serverResponse");
        serverResponse.innerHTML = responseText;
    }

    async function getJSON(): Promise<void> {
        formData = new FormData(document.forms[0]);
        let serverURL: string = "https://gis2020vr.herokuapp.com";
        serverURL += "/json";
        // tslint:disable-next-line: no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        serverURL += "?" + query.toString();

        let response: Response = await fetch(serverURL);
        let responseText: string = await response.json();
        console.log(responseText);

    }
}