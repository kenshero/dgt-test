let server = require('dgt-net').server
let packet = require('./src/packet')
let RemoteProxy = require('./src/remoteproxy')

let port = 3000
server.setRemoteProxyClass(RemoteProxy)
server.setPacketObject(packet)
server.listen(port)
