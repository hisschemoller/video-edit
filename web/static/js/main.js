'use strict';

var WH = WH || {};

document.addEventListener('DOMContentLoaded', function(e) {
    WH.createPlayer({
        dataObject: WH.dataBerlinerDom,
        isCapture: false,
        startOffset: '8:0:0'
    });
});
