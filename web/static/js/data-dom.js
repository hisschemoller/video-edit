var WH = WH || {};

WH.dataBerlinerDom = {
    "settings": {
        "framerate": 30,
        "canvasHeight": 360,
        "canvasWidth": 480,
        "timing": "music",
        "ppqn": 24,
        "bpm": 120,
        "timesignature": {
            "numerator": 4, // number of beats in a measure
            "denominator": 4 // length of a beat (4 = quarter note, 8 = eight note)
        }
    },
    
    "clips": [
        {
            "start": "0:0:0", 
            "end": "0:1:0",
            "clipStart": "24:0:0",
            "x1": 0, "x2": 100,
            "y1": 200, "y2": 360
        }
    ],
    
    "resources": [
        {
            "url": "static/video/Dublin-Life-Pearse-Street-Nothing-Happens-Static-Camera.mp4",
            "startOffset": 12
        }
    ]
};
