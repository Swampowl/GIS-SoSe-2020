namespace SwampowlShop {
    export let jsonArticles: Article[] = [];

    export interface Article {
     category: string;
        img: string;
        name: string;
        beschreibung: string;
        preis: number;
    }

    export async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch("articles.json");
        jsonArticles = await response.json();
        console.log("Response", jsonArticles);
    }
}