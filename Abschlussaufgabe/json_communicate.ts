namespace eisdiele {
    export let articleData: Artikel[] = [];
    export interface Artikel {
        kategorie: string;
        image: string;
        titel: string;
        ablum: string;
        interpret: string;
        audio: string;
        preis: number;
    }

    export async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        articleData = await response.json();
        generateArticles();
    }
}