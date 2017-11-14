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
            "resourceID": "dom1",
            "start": "0:0:0", 
            "end": "2:0:0",
            "clipStart": "24:0:0",
            "x1": 0, "x2": 160,
            "y1": 0, "y2": 120,
            "zoom": 0.25
        },
        {
            "resourceID": "dom1",
            "start": "1:0:0", 
            "end": "3:1:0",
            "clipStart": "12:0:0",
            "x1": 150, "x2": 250,
            "y1": 100, "y2": 200
        }
    ],
    
    "resources": [
        {
            "id": "dom1",
            "url": "static/video/Dublin-Life-Pearse-Street-Nothing-Happens-Static-Camera.mp4",
            "startOffset": 0
        }
    ]
};
