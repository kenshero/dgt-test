var packet_writer = require('dgt-net').packet_writer

var packet = {
  CS_ADD_REQUEST: 10004,
  SC_ADD_RESPONSE: 20004
};

////////////////////////////////////////////////////////////////////////////////
// Received Packets
////////////////////////////////////////////////////////////////////////////////

packet[packet.CS_ADD_REQUEST] = function (remoteProxy, data) {
  var msg = data.read_string();
  if (!data.completed()) return true;
  remoteProxy.plusXY(msg);
}

////////////////////////////////////////////////////////////////////////////////
// Send Packets
////////////////////////////////////////////////////////////////////////////////

packet.make_pos_x_y = function (msg) {
  var o = new packet_writer(packet.SC_ADD_RESPONSE);
  o.append_string(msg);
  o.finish();
  return o.buffer;
}

////////////////////////////////////////////////////////////////////////////////
// Export Module
////////////////////////////////////////////////////////////////////////////////

module.exports = packet;