'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    // WH.createPlayer({
    //     videoPath: 'static/video/weesperplein_2017-07-21-mvi_0535.mp4',
    //     clipData: WH.clipData,
    //     framerate: 30,
    //     canvasHeight: 360,
    //     canvasWidth: 640,
    //     startOffset: 12
    // });
    
    WH.createPlayer({
        videoPath: 'static/video/Dublin-Life-Pearse-Street-Nothing-Happens-Static-Camera.mp4',
        clipData: WH.clipData,
        framerate: 30,
        canvasHeight: 360,
        canvasWidth: 480,
        startOffset: 0
    });
});
