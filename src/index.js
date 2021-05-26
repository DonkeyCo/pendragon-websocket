import { createServer } from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

const httpServer = createServer();
const io = new Server(httpServer);

let hosts = {
}

io.on('connection', (socket) => {
  console.log("Test");
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
    for (const key in hosts) {
      if (key == playerId) {
        delete hosts[room];
        socket.to(room).emit('hostLeft', playerId, session);
      }
    }
    socket.leave(room);
    socket.to(room).emit('leftLobby', playerId, session);
  });

  socket.on('updateSession', (room, session) => {
    console.log("Update Session Event");
    socket.to(room).emit('sessionUpdated', session);
  });
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});
