var video_url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';

var eventEmitter = require('../..').eventEmitter;

eventEmitter.on('device', function(device){
    device.connect();
    device.on('connected', function(){

        // play video: begin at 60 seconds
        device.play(video_url, 60, function(){
            console.log('Playing in your chromecast!')
        });

        setTimeout(
            function(){
                device.pause(function(){
                    console.log('Paused!')
                });
            },
            30000
        );

        setTimeout(
            function(){
                device.stop(function(){
                    console.log('Stopped!')
                });
            },
            40000
        );

    });
});
