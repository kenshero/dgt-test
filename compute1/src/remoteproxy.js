let server = require('dgt-net').server
let packet = require('./packet')

let Entry = require('./entry')
let entry = new Entry()

class RemoteProxy extends server.RemoteProxy {

  onConnected() {
    console.log("RemoteProxy There is a connection from " + this.getPeerName())
    entry.addRemote(this)
  }

  onDisconnected() {
    console.log("RemoteProxy Disconnected from " + this.getPeerName())
    entry.removeRemote(this)
  }

  plusXY(msg) {
    console.log('RemoteProxy receive: ',  msg)
    const payload = JSON.parse(msg)
    const result = payload.x + payload.y
    console.log('result: ',  result)
    entry.broadcast(packet.make_pos_x_y(result.toString()))
  }

}

module.exports = RemoteProxy