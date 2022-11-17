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

let connections = 0;  


  io.on('connection', (socket) => {

    socket.on('drawing', (data) => {  
      socket.broadcast.emit('drawing-from-server', data) 
    });
  
    socket.on('connections', () => {
      socket.emit('connections-from-server', connections);   
    })
  
    socket.on('disconnect', () => {
      connections -= 1
      console.log(connections); 
    }) 

    // Del 
    console.log('a user connected');
    connections += 1
    console.log(connections);
    //

  }); 
  




server.listen(3001, () => {
  console.log('listening on *:3001');
});




