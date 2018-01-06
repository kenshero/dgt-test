let client = require('dgt-net').client
let packet = require('./packet')

class MyRemote extends client.Remote {

  onConnected() {
    console.log("client There is a connection from " + this.getPeerName())
    this.processPosXY()
  }

  onDisconnected() {
    console.log("client Disconnected from " + this.getPeerName())
  }

  receiveResult(msg) {
    console.log("result : ", msg);
  }

  processPosXY() {
    setInterval(this.randomPosXY, 3000, this);
  }

  randomPosXY(context) {
    const x = Math.floor((Math.random() * 65534));
    const y = Math.floor((Math.random() * 65534));
    const payload = {
      x: x,
      y: y
    }
    context.send(packet.make_pos_x_y(JSON.stringify(payload)))
  }


}

module.exports = MyRemote