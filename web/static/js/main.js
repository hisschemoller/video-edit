'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    
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
            dataObject: WH.createCalleMayorData(),
            isCapture: false,
            startOffset: WH.util.musicToTime('0:0:0'),
            throttle: 4
        });
    }
    
    createPlayer();
});
