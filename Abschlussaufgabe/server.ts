import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
export namespace eisdiele {

    let studentList: Mongo.Collection;
    let databaseUrl: string = "mongodb+srv://Swampowl:<Tsv18600>@gis-sose2020.0rsjj.mongodb.net/<SwampowlEisdiele>?retryWrites=true&w=majority";
    //let databaseUrl: string = "mongodb://localhost: 27017";

    console.log("Starting server");
    //Port Number wird unter port gespeichert
    let port: number = Number(process.env.PORT);
    //Wenn port nicht erreichbar, wird Wert 8100 vergeben
    if (!port)
        port = 8100;


    connectToDatabase(databaseUrl);


    //Server und Listener erstellen


    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);


    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();

        studentList = mongoClient.db("EisdieleSwampowl").collection("Bestellungen");
        console.log("Database connection ", studentList != undefined);
    }



    function handleListen(): void {
        console.log("Listening");
    }


    //Server Daten erhalten
    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {


        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            if (url.pathname == "/send")
                studentList.insertOne(url.query);


            else if (url.pathname == "/get") {


                _response.write(JSON.stringify(await studentList.find().toArray()));

            }
        }

        _response.end();
    }


}
