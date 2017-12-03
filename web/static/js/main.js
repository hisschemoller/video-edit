'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    WH.createPlayer({
        dataObject: WH.createBerlinerDomData(),
        isCapture: false,
        startOffset: '32:0:0'
    });
});
