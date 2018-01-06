let net = require('net')

let clients = [];
let client = new net.Socket();
let client2 = new net.Socket();

let roundRobinChoice = 0

client.connect(3000, '127.0.0.1', function() {
    console.log('Connected to Server: 127.0.0.1 port:3000');
});


client2.connect(3001, '127.0.0.1', function() {
    console.log('Connected to Server: 127.0.0.1 port:3001');
});

net.createServer(function (socket) {
  clients.push(socket);
  socket.connected_state = "IGN_ON";
  socket.on('data', function (data) {
      try {
        if(roundRobinChoice === 0) {
          console.log("to server: ", data)
          client.write(data);
          roundRobinChoice++
          client.once('data', function(data) {
            console.log('to client: ' + data)
            socket.write(data)
          });
          client.on('close', function() {
          console.log('Connection closed');
         });
        } else if(roundRobinChoice === 1) {
          console.log("to server: ", data)
          client2.write(data)
          roundRobinChoice--
          client2.once('data', function(data) {
            console.log('to client: ' + data)
            socket.write(data)
          });
          client2.on('close', function() {
          console.log('Connection closed')
         });
        }
     }
     catch (err) {
     }
  });

  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1)
  })
}).listen(8000)
