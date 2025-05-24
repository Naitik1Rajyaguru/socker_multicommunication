const { log } = require("console");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let sharedText = "";

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.on("chat-message", (msg) => {
    io.emit("chat-message", msg);
  });

  socket.emit("update-text", sharedText);
  socket.on("edit-text", (newText) => {
    sharedText = newText;
    io.emit("update-text", sharedText);
  });

  socket.on("disconnect", () => {
    console.group(`user disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("server running on: http://localhost:3000");
});
