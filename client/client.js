let client = require('dgt-net').client
let packet = require('./src/packet')
let myRemote = require('./src/myRemote')

client.setRemoteClass(myRemote)
client.setPacketObject(packet)
client.connect('127.0.0.1', 8000)
