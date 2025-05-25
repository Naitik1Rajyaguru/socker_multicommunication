const { log } = require("console");
const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from React
app.use(express.static(path.join(__dirname, "../client/dist")));

// All other routes go to React
app.get((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

let sharedText = "";
let users = {};

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  const username = `User-${socket.id.slice(0, 4)}`;
  users[socket.id] = username;

  io.emit("update-users", Object.values(users));

  socket.on("send-chat", (msg) => {
    io.emit("receive-chat", { user: users[socket.id], msg }); // receive chat is emiting object
  });

  socket.emit("update-text", sharedText);
  socket.on("edit-text", (newText) => {
    sharedText = newText;
    socket.broadcast.emit("update-text", sharedText);
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("update-users", Object.values(users));
    console.group(`user disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("server running on: http://localhost:3000");
});
