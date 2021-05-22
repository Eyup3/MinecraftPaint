const socket = require("ws")
const server = new socket.Server({ port: process.env.WEBSOCKET_PORT })

server.on("connection", ws => {
    console.log("Websocket connection")

    ws.on("message", msg => {
        console.log(`Websocket message ${msg} and broadcasted to all clients`)
        server.broadcast(msg)
    })

});

server.broadcast = function broadcast(msg) {
    server.clients.forEach(function each(client) {
        client.send(msg)
    });
};
module.exports = { socket, server }