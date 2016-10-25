(function(localhost){

	var eventEmitter = require('../..').eventEmitter;

	eventEmitter.on('device', function(device){
		device.connect();
		device.on('connected', function(){

			var video_url = 'http://' + localhost + '/video.mp4';

			device.play(video_url, 0, function(){
				console.log('Playing in your chromecast!')
			});

		});
	});

})('192.168.1.137:80');
