"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    // wenn port nicht vorhanden wird er automatisch auf 8100 gesetzt
    if (!port) {
        port = 8100;
    }
    // Server wird erstellt / initialisiert (HTTP-Addon Extension)
    let server = Http.createServer();
    // Events werden deklariert
    // request beantwortet Anfragen auf den Port des localhost
    server.addListener("request", handleRequest);
    //listening wartet auf Anfragen am Port des localhost
    server.addListener("listening", handleListen);
    // Server wartet/listened nach Verbindungsanfragen auf Port 8100
    server.listen(port);
    // ab hier nurnoch Funktionen
    // Die Funktionen der Listener werden beschrieben (handleListen)
    // gibt "Listening" in der Console aus, wenn der Server gestartet wird.
    function handleListen() {
        console.log("Listening");
    }
    // wird ausgeführt wenn eine Anfrage auf dem Localhost ankommt
    function handleRequest(_request, _response) {
        //gibt "Irgendwas wurde geklickt" aus, sobald handleRequest ausgeführt wird
        // console.log("Irgendwas wurde geklickt");
        //Setzt den Wert des des content-types im Protokollheader auf html  mit dem charset utf8
        _response.setHeader("content-type", "text/html; charset=utf-8");
        //Setzt im Header fest, dass Daten von mehreren Domains geladen werden können
        _response.setHeader("Access-Control-Allow-Origin", "*");
        //gibt vom Router aus die Request zurück
        _response.write(_request.url);
        console.log(_request);
        //beendet die Antwort
        console.log(_request.url);
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=server.js.map