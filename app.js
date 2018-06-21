const net = require('net');
const server = net.createServer();
const {preProcessing,sockets,dataHandler,endHandler} = require('./utils.js');

server.on('connection',socket => {

 preProcessing(socket);

  socket.on('data',data => {
    dataHandler(socket,data);
  });

  socket.on('end',() => {
    endHandler(socket);
  });
});

server.listen(8000,() => {
  console.log('server running at 8000');
});

server.on('error',error => {
  console.log(error);
})
