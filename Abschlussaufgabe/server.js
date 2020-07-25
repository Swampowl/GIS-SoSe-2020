"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eisdiele = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var eisdiele;
(function (eisdiele) {
    let studentList;
    let databaseUrl = "mongodb+srv://Swampowl:Tsv18600@gis-sose2020.0rsjj.mongodb.net/<SwampowlEisdiele>?retryWrites=true&w=majority";
    //let databaseUrl: string = "mongodb://localhost: 27017";
    console.log("Starting server");
    //Port Number wird unter port gespeichert
    let port = Number(process.env.PORT);
    //Wenn port nicht erreichbar, wird Wert 8100 vergeben
    if (!port)
        port = 8100;
    connectToDatabase(databaseUrl);
    //Server und Listener erstellen
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        studentList = mongoClient.db("EisdieleSwampowl").collection("Bestellungen");
        console.log("Database connection ", studentList != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    //Server Daten erhalten
    async function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/send")
                studentList.insertOne(url.query);
            else if (url.pathname == "/get") {
                _response.write(JSON.stringify(await studentList.find().toArray()));
            }
        }
        _response.end();
    }
})(eisdiele = exports.eisdiele || (exports.eisdiele = {}));
//# sourceMappingURL=server.js.map