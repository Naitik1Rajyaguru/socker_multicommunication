const socket = io();
const input = document.getElementById("message");
const messages = document.getElementById("messages");
const editor = document.getElementById("editor");

function send() {
  const msg = input.value;
  socket.emit("chat-message", msg);
  input.value = "";
}
socket.on("chat-message", (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  messages.appendChild(li);
});

editor.addEventListener("input", () => {
  socket.emit("edit-text", editor.value);
});

socket.on("update-text", (text) => {
  editor.value = text;
});
