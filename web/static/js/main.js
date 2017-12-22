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
    
    WH.createPlayerImageShiftDom({
        imgIndexStep: 20,
        imgSliceWidth: 50,
        imgStepForward: true,
        imgURLPrefix: 'static/seq/dom1/frame_',
        imgURLLastIndex: 12732,
        imgHeight: 280,
        imgWidth: 440,
        imgX: 100,
        imgY: 200
    });
    
    // WH.createPlayer({
    //     dataObject: WH.createDom2Data(),
    //     isCapture: false,
    //     startOffset: WH.util.musicToTime('0:0:0')
    // });
});
