const express = require("express")
const socket = require("socket.io")

const app = express();  // Initialize and server ready

app.use(express.static("public"));

let port = process.env.PORT || 3000
let server = app.listen(port, () => {
    console.log("listening to port" + port)
})

let io = socket(server);

io.on("connection", (socket) => {
    // console.log("Made socket connection");

    socket.on("beginPath", (data) => {
        // data -> data from frontend
        // Now transfer data to all connected computers
        io.sockets.emit("beginPath", data);
    })
    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    })
    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    })
    socket.on("pageChange", (data)=>{
        io.sockets.emit("pageChange", data);
    })
    socket.on("clearAll", (data)=>{
        io.sockets.emit("clearAll", data);
    })
})