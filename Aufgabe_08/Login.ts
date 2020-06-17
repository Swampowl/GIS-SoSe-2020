namespace Server {
    window.addEventListener("load", init);
    let button: HTMLButtonElement;

    function init(_event: Event): void {
        button = <HTMLButtonElement>document.querySelector("button");
        button.addEventListener("click", handleSubmit);
    }

    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitButton");
    submitButton.addEventListener("click", communicate);

    async function communicate(): Promise<void> {


        let formData = new FormData(document.forms[0]);
        let url: string = "https://swampowl.herokuapp.com/"
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        
        url += "?" + query.toString();

        let response: Response = await fetch(url);
        let answer: string = await response.url;

        console.log(await response.text());
        console.log(answer);
    }

    function handleSubmit(){

    }
}