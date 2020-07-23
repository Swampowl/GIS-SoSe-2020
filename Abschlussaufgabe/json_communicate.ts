namespace eisdiele {
    export let articleData: article[] = [];
    export interface article {
        category: string;
        img: string;
        infotext: string;
        price: number;
    }

    export async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        articleData = await response.json();
        generateArticles();
    }
}