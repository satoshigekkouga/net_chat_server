let count = 0;

let sockets ={};

function preProcessing(socket){
  console.log('new connection');
  socket.id = count++;
  if(!(socket.id in sockets)){
    sockets[socket.id] = socket;
    socket.write('Enter your name\n');
  }
  socket.setEncoding('utf8');
};

function dataHandler(socket,data){
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
    let date = new Date();
    if(id !== socket.id.toString()){
      sockets[id].write(`${socket.name}(${date.getHours()}:${date.getMinutes()}):${data}`);
    }
  }
};

function endHandler(socket){
  console.log(`connection ended: ${socket.name}`);
  delete sockets[socket.id];
}

function forAllButOne(callback){
  for (let id in sockets){
    if(id !== socket.id.toString()){
      callback();
    }
  }
}

module.exports = {
  dataHandler,
  endHandler,
  sockets,
  preProcessing
}
