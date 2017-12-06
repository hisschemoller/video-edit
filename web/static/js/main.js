'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    WH.createPlayer({
        dataObject: WH.createBerlinerDomData(),
        isCapture: false,
        startOffset: WH.util.musicToTime('0:0:0')
    });
});
