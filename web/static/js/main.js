'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    // WH.createPlayer({
    //     dataObject: WH.createBerlinerDomData(),
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

    // WH.createPlayerImageShift({
    //     imgIndexStep: 5
    // });
    
    // WH.createPlayerImageShiftDom({
    //     imgIndexStep: 5,
    //     imgStepForward: false,
    //     imgURLPrefix: 'static/seq/dom1/frame_',
    //     imgURLLastIndex: 12732,
    //     imgHeight: 150,
    //     imgWidth: 200,
    //     imgX: 440,
    //     imgY: 180
    // });
    
    WH.createPlayer({
        dataObject: WH.createTestData(),
        isCapture: false,
        startOffset: WH.util.musicToTime('0:0:0')
    });
});
