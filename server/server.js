const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors);
const server = http.createServer(app);



const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {

  let connections = 0;  

  // Del
  console.log('a user connected');
  console.log(connections += 1);
  //

  socket.on('drawing', (data) => { 
    socket.emit('drawing-from-server', data) 
  });

  socket.on('connections', () => {
    socket.emit('connections-from-server', connections)  
  })

  socket.on('disconnect', () => {
    console.log(connections -= 1); 
  })
}); 


server.listen(3001, () => {
  console.log('listening on *:3001');
});




