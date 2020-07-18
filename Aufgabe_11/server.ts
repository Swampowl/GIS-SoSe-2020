import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Aufgabe09 {
  console.log("start server");
  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
  await mongoClient.connect();
  let orders: Mongo.Collection = mongoClient.db("Test").collection("Students");
  orders.insert({ ...});

  function handleListen(): void {
    console.log("Listening");
  }

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");

    if (_request.url) {
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      let path: string | null = url.pathname;
      if (path == "/html") {
        for (let key in url.query) {
          _response.write(key + ": " + url.query[key] + "<br/>");
        }
      }
      else if (path == "/json") {
        let jsonString: string = JSON.stringify(url.query);
        _response.write(jsonString);
      }
      else if (path == "/A9") {
        _response.write(_request.url);
      }
    }
    _response.end();
  }
}

//mongodb+srv://Swampowl:<Tsv18600>@cluster420.simmy.mongodb.net/<Test>?retryWrites=true&w=majority