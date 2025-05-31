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
  // const username = `User-${socket.id.slice(0, 4)}`;
  // users[socket.id] = username;
  io.emit(
    "update-users",
    Object.values(users).map((u) => u.userName)
  );

  socket.on("user-joined", (userData) => {
    console.log(`user connected: ${userData.userName}-${userData.userID}`);

    users[socket.id] = userData;
    if (!userHistory[userData.userID]) {
      userHistory[userData.userID] = [];
    }
    socket.emit("user-chat-history", userHistory[userData.userID] || []);
    socket.emit("update-text", sharedText);

    io.emit(
      "update-users",
      Object.values(users).map((u) => u.userName)
    );
  });

  socket.on("send-chat", (data) => {
    io.emit("receive-chat", { user: data.user, msg: data.msg }); // receive chat is emiting object
    // add that message to each user which are connnected there.
    Object.keys(userHistory).forEach((id) => {
      userHistory[id].push(data);
    });
  });

  socket.on("edit-text", (newText) => {
    sharedText = newText;
    socket.broadcast.emit("update-text", sharedText);
  });

  socket.on("disconnect", () => {
    console.log(
      `user disconnected: ${users[socket.id].userName}-${
        users[socket.id].userID
      }`
    );

    // on refresh we dont want to delete history, but only on disconnect history will be deleted
    const user = users[socket.id];
    if (!user) return;

    const stillConnected = Object.values(users).some(
      (u) => u.userID == user.userID && u != user
    );

    if (stillConnected) {
      delete userHistory[user.userID];
    }

    delete users[socket.id];
    io.emit(
      "update-users",
      Object.values(users).map((u) => u.userName)
    );
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("server is running");
});
