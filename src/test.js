import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log(socket.id);
})

socket.emit("helloWorld")

socket.on("helloWorlded", (s) => {
  console.log(s);
})

socket.emit("createLobby", {playerId: "ID", player: {}})

socket.on("createdLobby", (s) => {
  console.log(s);
})