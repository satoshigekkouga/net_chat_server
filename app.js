const net = require('net');
const server = net.createServer();

let sockets = {};
let count = 0;

server.on('connection',socket => {
  console.log('new connection');
  socket.id = count++;
  if(!(socket.id in sockets)){
    sockets[socket.id] = socket;
    socket.write('Enter your name\n');
  }
  socket.on('data',data => {
    if(!socket.name){
      socket.name = data.trim();
      socket.write(`Welcome ${socket.name}!!!\n`);
      console.log(`${socket.name} joined`);
      for (let id in sockets){
        if(id !== socket.id.toString()){
          sockets[id].write(`${socket.name} joined the chat\n`);
        }
      }
      return;
    }
    for (let id in sockets){
      if(id !== socket.id.toString()){
        sockets[id].write(`${socket.name}:${data}`);
      }
    }
  });

  socket.on('end',() => {
    console.log(`connection ended: ${socket.name}`);
    delete sockets[socket.id];

  });

  socket.setEncoding('utf8');
});

server.listen(8000,() => {
  console.log('server running at 8000');
});
