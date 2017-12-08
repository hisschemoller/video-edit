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

        /**
         *
         */
        createClips = function() {

            let clips = [];

            // scene A
            let clipStart = 102,
                getClipStart = () => {
                    clipStart += 1;
                    return clipStart;
                }
                start = "0:0:0",
                start2 = "8:0:0",
                end = "32:0:0";

            clips = clips.concat([
                {
                    "resourceID": "dom1",
                    "start": start,
                    "end": end,
                    "clipStart": clipStart - WH.util.musicToTime(start2),
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 480
                }, {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": clipStart,
                    "x1": 0, "x2": 195,
                    "y1": 29, "y2": 373,
                    "offsetX": 47, "offsetY": -3,
                    "zoom": 0.719
                }

                    , {
                        "resourceID": "dom1",
                        "start": start2,
                        "end": end,
                        "clipStart": getClipStart(),
                        "x1": 195, "x2": 245,
                        "y1": 0, "y2": 480,
                        "offsetX": 195, "offsetY": 0
                    }, {
                        "resourceID": "dom1",
                        "start": start2,
                        "end": end,
                        "clipStart": getClipStart(),
                        "x1": 245, "x2": 295,
                        "y1": 0, "y2": 480,
                        "offsetX": 245, "offsetY": 0
                    }, {
                        "resourceID": "dom1",
                        "start": start2,
                        "end": end,
                        "clipStart": getClipStart(),
                        "x1": 295, "x2": 345,
                        "y1": 0, "y2": 480,
                        "offsetX": 295, "offsetY": 0
                    }, {
                        "resourceID": "dom1",
                        "start": start2,
                        "end": end,
                        "clipStart": getClipStart(),
                        "x1": 345, "x2": 395,
                        "y1": 0, "y2": 480,
                        "offsetX": 345, "offsetY": 0
                    }, {
                        "resourceID": "dom1",
                        "start": start2,
                        "end": end,
                        "clipStart": getClipStart(),
                        "x1": 395, "x2": 445,
                        "y1": 0, "y2": 480,
                        "offsetX": 395, "offsetY": 0
                    }, {
                        "resourceID": "dom1",
                        "start": start2,
                        "end": end,
                        "clipStart": getClipStart(),
                        "x1": 445, "x2": 495,
                        "y1": 0, "y2": 480,
                        "offsetX": 445, "offsetY": 0
                    }]);


            // B
            start = "32:0:0";
            end = "48:0:0";
            clips = clips.concat([
                {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": 350,
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 480,
                    "zoom": 1
                },
                {
                    "resourceID": "dom1",
                    "start": start,
                    "end": end,
                    "clipStart": 78,
                    "x1": 0, "x2": 337,
                    "y1": 0, "y2": 412,
                    "offsetX": 300, "offsetY": 58,
                    "zoom": 1.531,
                    "flipHorizontal": true
                },


                    {
                        "resourceID": "dom2",
                        "start": start,
                        "end": end,
                        "clipStart": 300,
                        "offsetX": 500, "offsetY": 400,
                        "x1": 500, "x2": 600,
                        "y1": 400, "y2": 480
                    },
                    {
                        "resourceID": "dom2",
                        "start": start,
                        "end": end,
                        "clipStart": 300,
                        "offsetX": 100, "offsetY": 300,
                        "x1": 100, "x2": 200,
                        "y1": 300, "y2": 480
                    },
                    // {
                    //     "resourceID": "dom2",
                    //     "start": start,
                    //     "end": end,
                    //     "clipStart": 100,
                    //     "offsetX": 400, "offsetY": 380,
                    //     "x1": 400, "x2": 500,
                    //     "y1": 380, "y2": 480
                    // },
                    {
                        "resourceID": "dom2",
                        "start": start,
                        "end": '40:0:0', // end,
                        "clipStart": 156,
                        "offsetX": 300, "offsetY": 200,
                        "x1": 200, "x2": 300,
                        "y1": 200, "y2": 400
                    },
                    {
                        "resourceID": "dom2",
                        "start": start,
                        "end": end,
                        "clipStart": 328,
                        "offsetX": 400, "offsetY": 420,
                        "x1": 400, "x2": 450,
                        "y1": 420, "y2": 480
                    },
                    {
                        "resourceID": "dom2",
                        "start": start,
                        "end": end,
                        "clipStart": 247,
                        "offsetX": 350, "offsetY": 350,
                        "x1": 350, "x2": 400,
                        "y1": 350, "y2": 480
                    }
                ]);

            // C
            start = "48:0:0";
            end = "64:0:0";
            clips = clips.concat([
                {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": "16:0:0",
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 480 - 59,
                    "offsetX": 3, "offsetY": 55,
                    "zoom": 1.035
                },
                {
                    "resourceID": "dom1",
                    "start": start,
                    "end": end,
                    "clipStart": "16:0:0",
                    "x1": 186, "x2": 640,
                    "y1": 0, "y2": 480,
                    "offsetX": 80, "offsetY": 10,
                    "zoom": 1.31
                }]);

                // D
                start = "64:0:0";
                end = "96:0:0";
                clips = clips.concat([
                    {
                        "resourceID": "dom2",
                        "start": start,
                        "end": end,
                        "clipStart": 140,
                        "x1": 0, "x2": 640,
                        "y1": 0, "y2": 480,
                        "offsetX": 0, "offsetY": 0
                    },
                    {
                        "resourceID": "dom1",
                        "start": start,
                        "end": end,
                        "clipStart": "32:0:0",
                        "x1": 227, "x2": 227 + 362,
                        "y1": 0, "y2": 302,
                        "offsetX": 149, "offsetY": 3,
                        "zoom": 1.138
                    }

                        ,
                        {
                            "resourceID": "dom1",
                            "start": start,
                            "end": end,
                            "clipStart": 300,
                            "x1": 0, "x2": 250,
                            "y1": 355, "y2": 445,
                            "offsetX": 0, "offsetY": 355,
                            "zoom": 1.138
                        }

                ]);

            // E
            start = "96:0:0";
            end = "112:0:0";
            clips = clips.concat([
                {
                    "resourceID": "dom1",
                    "start": start,
                    "end": end,
                    "clipStart": "24:0:0",
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 480,
                    "offsetX": 31, "offsetY": 80,
                    "zoom": 1059 / 640
                },
                {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": "24:0:0",
                    "x1": 0, "x2": 337,
                    "y1": 0, "y2": 480,
                    "offsetX": 280, "offsetY": 0,
                    "zoom": 1.035,
                    "flipHorizontal": true
                }]);


            // F
            start = "112:0:0";
            end = "128:0:0";
            clips = clips.concat([
                {
                    "resourceID": "dom1",
                    "start": start,
                    "end": end,
                    "clipStart": "40:0:0",
                    "x1": 0, "x2": 640,
                    "y1": 0, "y2": 480,
                    "offsetX": 0, "offsetY": 0,
                    "zoom": 678 / 640
                },
                {
                    "resourceID": "dom2",
                    "start": start,
                    "end": end,
                    "clipStart": "40:0:0",
                    "x1": 39, "x2": 39 + 229,
                    "y1": 0, "y2": 305,
                    "offsetX": 128, "offsetY": 2,
                    "zoom": 0.789
                }]);

            return clips;
        },

        /**
         *
         */
        createData = function() {
            WH.util.setTiming(data.settings);
            data.clips = createClips();
            return data;
        };

    WH.createBerlinerDomData = createData;

})(WH);
