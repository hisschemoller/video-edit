var WH = WH || {};

(function(WH) {

    WH.dataBerlinerDom = {
        "settings": {
            "framerate": 30,
            "canvasHeight": 480,
            "canvasWidth": 640,
            "timing": "music",
            "ppqn": 24,
            "bpm": 104,
            "timesignature": {
                "numerator": 4, // number of beats in a measure
                "denominator": 4 // length of a beat (4 = quarter note, 8 = eight note)
            }
        },

        "clips": [
            {
                "resourceID": "dom1",
                "start": "0:0:0",
                "end": "8:0:0",
                "clipStart": "0:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "zoom": 1
            }, {
                "resourceID": "dom2",
                "start": "0:0:0",
                "end": "8:0:0",
                "clipStart": "0:0:0",
                "x1": 0, "x2": 195,
                "y1": 29, "y2": 373,
                "offsetX": 47, "offsetY": -5,
                "zoom": 0.719
            }

            ,
            {
                "resourceID": "dom2",
                "start": "8:0:0",
                "end": "16:0:0",
                "clipStart": "15:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "zoom": 1
            },
            {
                "resourceID": "dom1",
                "start": "8:0:0",
                "end": "16:0:0",
                "clipStart": "16:0:0",
                "x1": 0, "x2": 337,
                "y1": 0, "y2": 421,
                "offsetX": 300, "offsetY": 58,
                "zoom": 1.531,
                "flipHorizontal": true
            }

        ],

        "resources": [{
                "id": "dom1",
                "url": "static/video/dom1.mp4",
                "startOffset": 1
            }, {
                "id": "dom2",
                "url": "static/video/dom2.mp4",
                "startOffset": 1
            }
        ]
    };

})(WH);
