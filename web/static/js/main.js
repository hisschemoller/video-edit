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
    
    WH.util.setTiming({
        ppqn: 24,
        bpm: 104,
        timesignature: {
            numerator: 4, // number of beats in a measure
            denominator: 4 // length of a beat (4 = quarter note, 8 = eight note)
        }
    });
    
    let createPlayer = () => {
        WH.createPlayer({
            dataObject: WH.createDom2Data(),
            isCapture: false,
            startOffset: WH.util.musicToTime('0:0:0'),
            throttle: 5
        });
    }
    
    let createTimeShiftPlayerSceneA1 = () => {
        // scene A - 1
        WH.createPlayerTimeShift({
            imgIndexStep: 20,
            imgSliceSize: 50,
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom1/frame_',
            imgURLLastIndex: 12732,
            start: 0,
            end: WH.util.musicToTime('33:0:0'),
            imgHeight: 330,
            imgWidth: 445,
            imgX: 195,
            imgY: 150,
        
            framerate: 30,
            captureFramerate: 8,
            captureEnabled: true
        });
    }
    
    let createTimeShiftPlayerSceneA2 = () => {
        // scene A - 2
        WH.createPlayerTimeShift({
            imgIndexStep: 10,
            imgSliceSize: 50,
            imgSliceDirection: 'row',
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom1_w50_l32_s0_x195_y150_w450_h330/frame_',
            imgURLLastIndex: 12732,
            start: 0,
            end: WH.util.musicToTime('33:0:0'),
            imgHeight: 330,
            imgWidth: 445,
            imgX: 0,
            imgY: 0,
        
            framerate: 30,
            captureFramerate: 8,
            captureEnabled: true
        });
    }
    
    createPlayer();
    // createTimeShiftPlayerSceneA1();
    // createTimeShiftPlayerSceneA2();
});
