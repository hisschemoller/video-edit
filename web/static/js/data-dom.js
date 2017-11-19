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
                "clipStart": "0:2:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "zoom": 1
            }, {
                "resourceID": "dom2",
                "start": "0:0:0",
                "end": "8:0:0",
                "clipStart": "0:2:0",
                "x1": 0, "x2": 195,
                "y1": 29, "y2": 373,
                "offsetX": 47, "offsetY": -5,
                "zoom": 0.719
            }

// B
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

// C

            ,
            {
                "resourceID": "dom2",
                "start": "16:0:0",
                "end": "24:0:0",
                "clipStart": "16:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480 - 59,
                "offsetX": 3, "offsetY": 55,
                "zoom": 1.035
            },
            {
                "resourceID": "dom1",
                "start": "16:0:0",
                "end": "24:0:0",
                "clipStart": "16:0:0",
                "x1": 186, "x2": 640,
                "y1": 0, "y2": 480,
                "offsetX": 80, "offsetY": 10,
                "zoom": 1.31
            }

// D

            ,
            {
                "resourceID": "dom1",
                "start": "24:0:0",
                "end": "32:0:0",
                "clipStart": "24:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "offsetX": 31, "offsetY": 80,
                "zoom": 1059 / 640
            },
            {
                "resourceID": "dom2",
                "start": "24:0:0",
                "end": "32:0:0",
                "clipStart": "24:0:0",
                "x1": 0, "x2": 337,
                "y1": 0, "y2": 480,
                "offsetX": 280, "offsetY": 0,
                "zoom": 1.035,
                "flipHorizontal": true
            }

// E

            ,
            {
                "resourceID": "dom2",
                "start": "32:0:0",
                "end": "40:0:0",
                "clipStart": "32:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "offsetX": 0, "offsetY": 0,
                "zoom": 1
            },
            {
                "resourceID": "dom1",
                "start": "32:0:0",
                "end": "40:0:0",
                "clipStart": "32:0:0",
                "x1": 227, "x2": 227 + 362,
                "y1": 0, "y2": 302,
                "offsetX": 149, "offsetY": 3,
                "zoom": 1.138
            }

// F

            ,
            {
                "resourceID": "dom1",
                "start": "40:0:0",
                "end": "48:0:0",
                "clipStart": "40:0:0",
                "x1": 0, "x2": 640,
                "y1": 0, "y2": 480,
                "offsetX": 0, "offsetY": 0,
                "zoom": 678 / 640
            },
            {
                "resourceID": "dom2",
                "start": "40:0:0",
                "end": "48:0:0",
                "clipStart": "40:0:0",
                "x1": 39, "x2": 39 + 229,
                "y1": 0, "y2": 305,
                "offsetX": 128, "offsetY": 2,
                "zoom": 0.789
            }

        ],

        "resources": [{
                "id": "dom1",
                "url": "static/video/dom1.mp4"
            }, {
                "id": "dom2",
                "url": "static/video/dom2.mp4"
            }
        ]
    };

})(WH);
