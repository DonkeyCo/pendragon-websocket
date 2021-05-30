import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const httpServer = createServer();
const io = new Server(httpServer);

let hosts = {
}

io.on('connection', (socket) => {
  socket.on('createLobby', (playerId) => { 
    console.log("Create Lobby Event");
    const room = uuidv4();
    hosts[room] = playerId;

    socket.join(room);
    socket.emit('createdLobby', room);
  });

  socket.on('joinLobby', (room, player) => {
    console.log("Join Lobby Event");
    socket.join(room);
    socket.to(room).emit('joinedLobby', player);
  });

  socket.on('leaveLobby', (room, playerId, session) => {
    console.log("Leave Lobby Event");
    if (hosts[room] == playerId) {
      console.log("Host Left");
      delete hosts[room];
      socket.to(room).emit('hostLeft', playerId, session);
    } else {
      socket.to(room).emit('leftLobby', playerId, session);
    }
    socket.leave(room);
  });

  socket.on('updateSession', (room, session, player) => {
    console.log("Update Session Event");
    socket.to(room).emit('sessionUpdated', session, player);
  });

  socket.on('sendMessage', (room, playerName, message) => {
    console.log("Send message");
    socket.to(room).emit('messageSent', playerName, message);
  }); 

  socket.on('roll', (room, roll) => {
    console.log("Roll Dice");
    socket.to(room).emit('rolled', roll);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});
