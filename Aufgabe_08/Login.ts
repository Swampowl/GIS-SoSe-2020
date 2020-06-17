namespace Server {
    window.addEventListener("load", init);
    let button: HTMLButtonElement;

    function init(_event: Event): void {
        button = <HTMLButtonElement>document.querySelector("button");
        button.addEventListener("click", handleSubmit);
    }
    async function communicate(_url: string): Promise<void> {
        let formData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        _url += "?" + query.toString();

        let response: Response = await fetch(_url);
        
        console.log(await response.text());
    }

    function handleSubmit() {
        communicate("https://swampowl.herokuapp.com/");
    }
}