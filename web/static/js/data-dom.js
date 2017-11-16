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

        "clips": [{
                "resourceID": "dom1",
                "start": "0:0:0",
                "end": "24:0:0",
                "clipStart": "0:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "zoom": 1
            }, {
                "resourceID": "dom2",
                "start": "1:0:0",
                "end": "24:0:0",
                "clipStart": "0:0:0",
                "x1": 150, "x2": 250,
                "y1": 100, "y2": 200,
                "zoom": 0.719
            }
        ],

        "resources": [{
                "id": "dom1",
                "url": "static/video/dom1.mp4",
                "startOffset": 0
            }, {
                "id": "dom2",
                "url": "static/video/dom2.mp4",
                "startOffset": 0
            }
        ]
    };

})(WH);
