import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log(socket.id);
})

socket.emit("helloWorld")

socket.on("sessionUpdated", (s, t) => {
  console.log("WOW");
})

socket.emit("joinLobby", "289c760a-6f3b-4da8-9f1a-5a6de6b4bd96", {"id": 1000})
