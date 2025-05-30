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

// All other routes go to React :- / request will serve index.html
app.get((req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

let sharedText = "";
let users = {};
let userHistory = {};

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  // const username = `User-${socket.id.slice(0, 4)}`;
  // users[socket.id] = username;

  io.emit("update-users", Object.values(users));

  socket.on("user-joined", (username) => {
    users[socket.id] = username;
    if (!userHistory[username]) {
      userHistory[username] = [];
    }
    socket.emit("user-chat-history", userHistory[username] || []);
    io.emit("update-users", Object.values(users));
  });

  socket.on("send-chat", (data) => {
    io.emit("receive-chat", { user: data.user, msg: data.msg }); // receive chat is emiting object
    Object.keys(userHistory).forEach((id) => {
      userHistory[id].push(data);
    });
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

server.listen(PORT, "0.0.0.0", () => {
  console.log("server running on: http://localhost:3000");
});
