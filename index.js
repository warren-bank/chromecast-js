var scanner = require('chromecast-scanner');
var Device = require('./device').Device;
var debug = require('debug')('chromecast-js');
var events = require( 'events' );
var eventEmitter = new events.EventEmitter();

exports.eventEmitter = eventEmitter;

scanner(function(err, service) {
  if (err){
    debug(err);
    return;
  }

  var dev_config = {addresses: [service.data], name: service.name};
  var device = new Device(dev_config);
  eventEmitter.emit('device', device);
});
