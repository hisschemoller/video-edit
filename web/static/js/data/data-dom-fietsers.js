var WH = WH || {};

(function(WH) {

    const data = {
            "settings": {
                "framerate": 30,
                "canvasHeight": 100,
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
                end = "8:0:0";

            clips = clips.concat([
                {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": 142,
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 100,
                    "offsetX": 0, "offsetY": 380
                }]);

            let startInterval = WH.util.musicToTime('1:0:0'),
                duration = WH.util.musicToTime('4:0:0'),
                width = 5,
                clip, clipGlobalStart, clipX;
            for (let i = 1, n = 16; i < n; i++) {
                clipGlobalStart = start + (i * startInterval);
                clipX = 300 + (i * width);
                clip = {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": 142 + (i * 1),
                    "x1": clipX, "x2": clipX + width,
                    "y1": 0, "y2": 100,
                    "offsetX": clipX, "offsetY": 380
                };
                clips.push(clip);
            }

            return clips;
        },

        createData = function() {
            WH.util.setTiming(data.settings);
            data.clips = createClips();
            return data;
        };

    WH.createTestData = createData;

})(WH);
