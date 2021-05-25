const socket = require("ws")
const server = new socket.Server({ port: process.env.WEBSOCKET_PORT })

server.on("connection", ws => {
    console.log("Websocket connection")

    ws.on("message", msg => {

        const processed = require('./DataProcessing')(msg)
        console.log(processed)
        server.broadcast("123321123")
    })

});

server.broadcast = function broadcast(msg) {
    server.clients.forEach(function each(client) {
        client.send(msg)
    });
};
module.exports = { socket, server }

