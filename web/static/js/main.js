'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    WH.createPlayer({
        dataObject: WH.createTestData(),
        isCapture: true,
        startOffset: WH.util.musicToTime('0:0:0')
    });
});
