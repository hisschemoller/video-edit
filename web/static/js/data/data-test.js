var WH = WH || {};

(function(WH) {

    const data = {
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
            "resources": [{
                    "id": "dom1",
                    "url": "static/video/dom1.mp4"
                }, {
                    "id": "dom2",
                    "url": "static/video/dom2.mp4"
                }
            ],
            "clips": []
        },

        createClips = function() {

            let clips = [];

            // scene A
            let start = "0:0:0",
                end = "0:2:0";

            clips = clips.concat([
                {
                    "resourceID": "dom1",
                    "start": start,
                    "end": end,
                    "clipStart": 10,
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 480
                }]);

            return clips;
        },

        createData = function() {
            WH.util.setTiming(data.settings);
            data.clips = createClips();
            return data;
        };

    WH.createTestData = createData;

})(WH);
