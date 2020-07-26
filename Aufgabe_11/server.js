"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Aufgabe09 = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Aufgabe09;
(function (Aufgabe09) {
    console.log("start server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    let mongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();
    let orders = mongoClient.db("Test").collection("Students");
    orders.insert({ ... });
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let path = url.pathname;
            if (path == "/html") {
                for (let key in url.query) {
                    _response.write(key + ": " + url.query[key] + "<br/>");
                }
            }
            else if (path == "/json") {
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
            }
            else if (path == "/A9") {
                _response.write(_request.url);
            }
        }
        _response.end();
    }
})(Aufgabe09 = exports.Aufgabe09 || (exports.Aufgabe09 = {}));
//mongodb+srv://Swampowl:<Tsv18600>@cluster420.simmy.mongodb.net/<Test>?retryWrites=true&w=majority
//# sourceMappingURL=server.js.map