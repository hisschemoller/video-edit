'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    // WH.createPlayer({
    //     dataObject: WH.createTestData(),
    //     isCapture: true,
    //     startOffset: WH.util.musicToTime('0:0:0')
    // });

    // WH.createPlayerImageShift({
    //     imgStepForward: false,
    //     imgIndexStep: 10
    // });

    // WH.createPlayerImageShift({
    //     imgIndexStep: 10
    // });

    WH.createPlayerImageShift({
        imgIndexStep: 5
    });
});
