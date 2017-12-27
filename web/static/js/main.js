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
    
    WH.util.setTiming({
        ppqn: 24,
        bpm: 104,
        timesignature: {
            numerator: 4, // number of beats in a measure
            denominator: 4 // length of a beat (4 = quarter note, 8 = eight note)
        }
    });
    
    let createTimeShiftPlayerSceneA1 = () => {
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
            captureEnabled: false
        });
    }
    
    let createTimeShiftPlayerSceneB = () => {
        let start = 353 - 20 + 20;
        WH.createPlayerTimeShift({
            imgIndexStep: 3,
            imgSliceSize: 8,
            imgSliceDirection: 'row',
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom2/frame_',
            imgURLLastIndex: 12382,
            start: start,
            end: start + WH.util.musicToTime('17:0:0'),
            imgHeight: 160,
            imgWidth: 640,
            imgX: 0,
            imgY: 320,
        
            framerate: 30,
            captureFramerate: 6,
            captureEnabled: true
        });
    }

    let createTimeShiftPlayerSceneC = () => {
        let start = 114 - 33;
        WH.createPlayerTimeShift({
            imgIndexStep: 2,
            imgSliceSize: 5,
            imgSliceDirection: 'column',
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom1/frame_',
            imgURLLastIndex: 12732,
            start: start,
            end: start + WH.util.musicToTime('17:0:0'),
            imgHeight: 392 - 0, // =
            imgWidth: 416 - 60, // = 
            imgX: 60,
            imgY: 0,
        
            framerate: 30,
            captureFramerate: 3,
            captureEnabled: true
        });
    }

    let createTimeShiftPlayerSceneLater = () => {
        let start = 194; // 214; // 330; // 210; // 83 - 20 - 2;
        WH.createPlayerTimeShift({
            imgIndexStep: 1,
            imgSliceSize: 4,
            imgSliceDirection: 'row',
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom1/frame_',
            imgURLLastIndex: 12732,
            start: start,
            end: start + WH.util.musicToTime('17:0:0') + 15.5,
            imgHeight: 480 - 220, // = 260
            imgWidth: 640 - 0, // = 454
            imgX: 0,
            imgY: 220,
        
            framerate: 30,
            captureFramerate: 4,
            captureEnabled: false
        });
    }

    let createTimeShiftPlayerSceneD1 = () => {
        let start = 130;
        WH.createPlayerTimeShift({
            start: start,
            end: start + WH.util.musicToTime('17:0:0'),
            imgIndexStep: 3,
            imgSliceSize: 5,
            imgSliceDirection: 'column',
            imgStepForward: true,
            imgURLPrefix: 'static/seq/dom2_fietsers/frame_',
            imgURLLastIndex: 12382,
            imgHeight: 100,
            imgWidth: 600,
            imgX: 0,
            imgY: 0,
        
            framerate: 30,
            captureFramerate: 6,
            captureEnabled: true
        });
    }

    let createTimeShiftPlayerSceneD2 = () => {
        let start = 125; // 132;
        WH.createPlayerTimeShift({
            start: start,
            end: start + WH.util.musicToTime('17:0:0'),
            direction: 'reverse',
            imgIndexStep: 3, // 4,
            imgSliceSize: 2, // 5,
            imgSliceDirection: 'column',
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom2_fietsers/frame_',
            imgURLLastIndex: 12382,
            imgHeight: 100,
            imgWidth: 600,
            imgX: 0,
            imgY: 0,
        
            framerate: 30,
            captureFramerate: 4,
            captureEnabled: true
        });
    }

    let createTimeShiftPlayerSceneE = () => {
        let start = 30 - 40;
        WH.createPlayerTimeShift({
            start: start,
            end: start + WH.util.musicToTime('17:0:0'),
            direction: 'forward',
            imgIndexStep: 0.1,
            imgSliceSize: 1,
            imgSliceDirection: 'row',
            imgStepForward: false,
            imgURLPrefix: 'static/seq/dom1_e_raw/frame_',
            imgURLLastIndex: 12732,
            imgHeight: 180,
            imgWidth: 190,
            imgX: 0,
            imgY: 0,
        
            framerate: 30,
            captureFramerate: 4,
            captureEnabled: false
        });
    }
    
    let createPlayer = () => {
        WH.createPlayer({
            dataObject: WH.createDom2Data(),
            isCapture: false,
            startOffset: WH.util.musicToTime('96:0:0'),
            throttle: 4
        });
    }
    
    // createPlayer();
    // createTimeShiftPlayerSceneA1();
    // createTimeShiftPlayerSceneA2();
    // createTimeShiftPlayerSceneB();
    // createTimeShiftPlayerSceneC();
    // createTimeShiftPlayerSceneD1();
    // createTimeShiftPlayerSceneD2();
    // createTimeShiftPlayerSceneE();
    createTimeShiftPlayerSceneLater();
});
