## [chromecast-js](https://github.com/warren-bank/chromecast-js)

chromecast-js is a javascript client library for googlecast's remote playback protocol that uses DefaultMediaReceiver to play any (compatible) content in the Chromecast, it works by wrapping the [node-castv2-client](https://github.com/thibauts/node-castv2-client) module.

## Project Fork

* [original `chromecast-js` project](https://github.com/guerrerocarlos/chromecast-js)
* forked from commit [`1e31b76bd6d1936938142eefb55f7fd6caefa905`](https://github.com/guerrerocarlos/chromecast-js/tree/1e31b76bd6d1936938142eefb55f7fd6caefa905) on `Oct 25, 2016`

## Reason For Fork

* I still own and use several of the original version 1 Chromecast devices
* At this time, the [`node-ssdp`](https://github.com/diversario/node-ssdp) dependency used to detect Chromecast devices on the network is unable to find any of mine
* [`chromecast-scanner`](https://github.com/xat/chromecast-scanner) is a different project that scans the network for Chromecast devices, and it works perfectly
* I quickly modified this project to swap the two

## Usage

* Cleaned up.. ever-so-slightly

``` javascript
var video_url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';

var eventEmitter = require('chromecast-js').eventEmitter;

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
```

## Subtitles and Cover

To include subtitles and a cover image with the media title, use an Object instead of a string in the *play method*:

``` javascript
var media = {
    url : 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4',
    subtitles: [{
        language: 'en-US',
        url: 'http://carlosguerrero.com/captions_styled.vtt',
        name: 'English',
    },
    {
        language: 'es-ES',
        url: 'http://carlosguerrero.com/captions_styled_es.vtt',
        name: 'Spanish',
    }
    ],
    cover: {
        title: 'Big Bug Bunny',
        url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
    },
    subtitles_style: {
        backgroundColor: '#FFFFFFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
        foregroundColor: '#000FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
        edgeType: 'DROP_SHADOW', // can be: "NONE", "OUTLINE", "DROP_SHADOW", "RAISED", "DEPRESSED"
        edgeColor: '#AA00FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
        fontScale: 1.5, // transforms into "font-size: " + (fontScale*100) +"%"
        fontStyle: 'BOLD_ITALIC', // can be: "NORMAL", "BOLD", "BOLD_ITALIC", "ITALIC",
        fontFamily: 'Droid Sans',
        fontGenericFamily: 'CURSIVE', // can be: "SANS_SERIF", "MONOSPACED_SANS_SERIF", "SERIF", "MONOSPACED_SERIF", "CASUAL", "CURSIVE", "SMALL_CAPITALS",
        windowColor: '#AA00FFFF', // see http://dev.w3.org/csswg/css-color/#hex-notation
        windowRoundedCornerRadius: 10, // radius in px
        windowType: 'ROUNDED_CORNERS' // can be: "NONE", "NORMAL", "ROUNDED_CORNERS"
    }
};

var eventEmitter = require('chromecast-js').eventEmitter;

eventEmitter.on('device', function(device){
    device.connect();
    device.on('connected', function(){

        // play video: begin at the first frame, display subtitles and cover image
        device.play(media, 0, function() {
            console.log('Playing in your chromecast!');

            setTimeout(
                function() {
                    console.log('subtitles off!');
                    device.subtitlesOff(function(err, status) {
                        if (err) console.log("error setting subtitles off...");
                        console.log("subtitles removed.");
                    });
                },
                20000
            );

            setTimeout(
                function() {
                    console.log('subtitles on!');
                    device.changeSubtitles(1, function(err, status) {
                        if (err) console.log("error restoring subtitles...");
                        console.log("subtitles restored.");
                    });
                },
                25000
            );

            setTimeout(
                function() {
                    console.log('subtitles on!')
                    device.changeSubtitles(1, function(err, status) {
                        if (err) console.log("error restoring subtitles...")
                        console.log("subtitles restored.")
                    });
                },
                25000
            );

            setTimeout(
                function() {
                    device.pause(function() {
                        console.log('Paused!')
                    });
                },
                30000
            );

            setTimeout(
                function() {
                    device.unpause(function() {
                        console.log('unpaused!')
                    });
                },
                40000
            );

            setTimeout(
                function() {
                    console.log('I ment English subtitles!')
                    device.changeSubtitles(0, function(err, status) {
                        if (err) console.log("error restoring subtitles...")
                        console.log("English subtitles restored.")
                    });
                },
                45000
            );

            setTimeout(
                function() {
                    console.log('Increasing subtitles size...')
                    device.changeSubtitlesSize(10, function(err, status) {
                        if (err) console.log("error increasing subtitles size...")
                        console.log("subtitles size increased.")
                    });
                },
                46000
            );

            setTimeout(
                function() {
                    device.seek(30, function() {
                        console.log('seeking forward!')
                    });
                },
                50000
            );

            setTimeout(
                function() {
                    console.log('decreasing subtitles size...')
                    device.changeSubtitlesSize(1, function(err, status) {
                        if (err) console.log("error...")
                        console.log("subtitles size decreased.")
                    });
                },
                60000
            );

            setTimeout(
                function() {
                    device.pause(function() {
                        console.log('Paused!')
                    });
                },
                70000
            );

            setTimeout(
                function() {
                    device.seek(30, function() {
                        console.log('seeking forward!')
                    });
                },
                80000
            );

            setTimeout(
                function() {
                    device.seek(30, function() {
                        console.log('seeking forward!')
                    });
                },
                85000
            );

            setTimeout(
                function() {
                    device.unpause(function() {
                        console.log('unpaused!')
                    });
                },
                90000
            );


            setTimeout(
                function() {
                    device.seek(-30, function() {
                        console.log('seeking backwards!')
                    });
                },
                100000
            );


            setTimeout(
                function() {
                    device.stop(function() {
                        console.log('Stopped!')
                    });
                },
                200000
            );

        });
    });
});
```

## Copyright

* not me..
* [Carlos Guerrero](https://github.com/guerrerocarlos)

## License

* GNU GPL v2.0
* [original project](https://github.com/guerrerocarlos/chromecast-js) was released with the [ISC license](http://www.isc.org/downloads/software-support-policy/isc-license/)
