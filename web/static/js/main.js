'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    
    const createPlayer = () => {
        WH.createPlayer({
            dataObject: WH.createCalleMayorData(),
            isCapture: false,
            startOffset: WH.util.musicToTime('0:0:0'),
            throttle: 4
        });
    }
    
    createPlayer();
});
