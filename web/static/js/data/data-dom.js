var WH = WH || {};

(function(WH) {

    const data = {
            settings: {
                framerate: 30,
                canvasHeight: 480,
                canvasWidth: 640,
                timing: 'music',
                ppqn: 24,
                bpm: 104,
                timesignature: {
                    numerator: 4, // number of beats in a measure
                    denominator: 4 // length of a beat (4 = quarter note, 8 = eight note)
                }
            },
            resources: [{
                    id: 'dom1',
                    url: 'static/seq/dom1/frame_',
                    frames: 12732
                }, {
                    id: 'dom2',
                    url: 'static/seq/dom2/frame_',
                    frames: 12382
                }, {
                    id: 'dom1_a1',
                    url: 'static/seq/dom1_a1/frame_',
                    frames: 2283
                }, {
                    id: 'dom1_a2',
                    url: 'static/seq/dom1_a2/frame_',
                    frames: 1683
                }, {
                    id: 'dom2_b',
                    url: 'static/seq/dom2_b/frame_',
                    frames: 1176
                }, {
                    id: 'dom1_c',
                    url: 'static/seq/dom1_c/frame_',
                    frames: 1176
                }, {
                    id: 'dom2_d1',
                    url: 'static/seq/dom2_d1/frame_',
                    frames: 1175
                }, {
                    id: 'dom2_d2',
                    url: 'static/seq/dom2_d2/frame_',
                    frames: 1175
                }, {
                    id: 'dom1_e',
                    url: 'static/seq/dom1_e/frame_',
                    frames: 1175
                }, {
                    id: 'dom1_f',
                    url: 'static/seq/dom1_f/frame_',
                    frames: 1640
                }
            ],
            clips: []
        },

        createClips = function() {

            let clips = [];

            // scene A
            let start = WH.util.musicToTime('0:0:0'),
                end = WH.util.musicToTime('32:0:0'),
                dom1ClipStart = 10;

            clips = [...clips, 
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: dom1ClipStart,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480
                }, 
                {
                    resourceID: 'dom1_a1',
                    start: start,
                    end: start + WH.util.musicToTime('24:0:0'),
                    clipStart: 0,
                    x1: 195, x2: 640,
                    y1: 150, y2: 480,
                    zIndex: 1
                }, 
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: 10,
                    x1: 0, x2: 195,
                    y1: 29, y2: 373,
                    offsetX: 45, offsetY: -5,
                    zoom: 0.719,
                    zIndex: 2
                }, 
                // {
                //     resourceID: 'dom1_a2',
                //     start: start + WH.util.musicToTime('16:0:0'),
                //     end: start + WH.util.musicToTime('24:0:0'),
                //     clipStart: WH.util.musicToTime('16:0:0') - (600 / 30) + 1,
                //     x1: 195 + 150, x2: 640,
                //     y1: 150, y2: 480,
                //     offsetX: 150, offsetY: 0,
                //     zIndex: 1
                // }, 
                {
                    resourceID: 'dom1_a2',
                    start: start + WH.util.musicToTime('16:0:0'),
                    end: end,
                    clipStart: WH.util.musicToTime('16:0:0') - (600 / 30) + 2,
                    x1: 195, x2: 640,
                    y1: 150, y2: 480,
                    zIndex: 1
                }
            ];
            
            // scene B
            start = '32:0:0';
            end = '48:0:0';
            clips = clips.concat([
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: 350,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480
                }, 
                {
                    resourceID: 'dom2_b',
                    start: start,
                    end: end,
                    clipStart: 0,
                    x1: 0, x2: 640,
                    y1: 320, y2: 480
                }, 
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: 78,
                    x1: 0, x2: 337,
                    y1: 0, y2: 412,
                    offsetX: 300, offsetY: 55,
                    zoom: 1.531,
                    flipHorizontal: true
                }]);
            
            
            // C
            start = '48:0:0';
            end = '64:0:0';
            clips = clips.concat([
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: 18,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480 - 59,
                    offsetX: 3, offsetY: 55,
                    zoom: 1.035
                },
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: 83, // 160,
                    x1: 186, x2: 640,
                    y1: 0, y2: 150,
                    offsetX: 80, offsetY: 10,
                    zoom: 1.31
                },
                {
                    resourceID: 'dom1_c',
                    start: start,
                    end: end,
                    clipStart: 0,
                    x1: 186, x2: 640,
                    y1: 150, y2: 480,
                    offsetX: 3, offsetY: 10 + 150,
                    zoom: 1.31
                }
            ]);

            // scene D
            start = WH.util.musicToTime('64:0:0');
            end = '96:0:0';
            clips = clips.concat([
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: 140,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: 0, offsetY: 0
                }
                ,
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: '32:0:0',
                    x1: 227, x2: 227 + 362,
                    y1: 0, y2: 302,
                    offsetX: 149, offsetY: 3,
                    zoom: 1.138
                }
                    ,
                    {
                        resourceID: 'dom2_d1',
                        start: start,
                        end: start + WH.util.musicToTime('16:0:0'),
                        clipStart: 0,
                        x1: 40, x2: 640,
                        y1: 380, y2: 480,
                        offsetX: 0, offsetY: 0
                    }
                    ,
                    {
                        resourceID: 'dom2_d2',
                        start:  start + WH.util.musicToTime('16:0:0'),
                        end: end,
                        clipStart: 3.5,
                        x1: 40, x2: 640,
                        y1: 380, y2: 480,
                        offsetX: 0, offsetY: 0
                    }
                    // ,
                    // {
                    //     resourceID: 'dom1',
                    //     start: start,
                    //     end: end,
                    //     clipStart: 300,
                    //     x1: 0, x2: 250,
                    //     y1: 355, y2: 445,
                    //     offsetX: 0, offsetY: 355,
                    //     zoom: 1.138,
                    //     zIndex: 2
                    // }
            ]);

            // E
            start = '96:0:0';
            end = '112:0:0';
            clips = clips.concat([
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: 370, // 44,
                    x1: 337, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: 31 + 337, offsetY: 80,
                    zoom: 1059 / 640
                },
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: '24:0:0',
                    x1: 0, x2: 337,
                    y1: 0, y2: 480,
                    offsetX: 280, offsetY: 0,
                    zoom: 1.035,
                    flipHorizontal: true
                },

                {
                    resourceID: 'dom1_e',
                    start: start,
                    end: end,
                    clipStart: 0,
                    x1: 339, x2: 640,
                    y1: 200, y2: 480,
                    offsetX: 10, offsetY: 0,
                    zoom: 1059 / 640
                }
            
            ]);

            // F
            start = '112:0:0';
            end = WH.util.musicToTime('128:0:0') + WH.util.musicToTime('1:0:0') + 15.5;
            clips = clips.concat([
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: '40:0:0',
                    x1: 0, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: 0, offsetY: 0,
                    zoom: 678 / 640
                },
                {
                    resourceID: 'dom1_f',
                    start: start,
                    end: end,
                    clipStart: 0,
                    x1: 0, x2: 640,
                    y1: 190, y2: 480,
                    offsetX: 0, offsetY: 0,
                    zoom: 678 / 640
                },
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: '40:0:0',
                    x1: 39, x2: 39 + 229,
                    y1: 0, y2: 305,
                    offsetX: 128, offsetY: 2,
                    zoom: 0.789,
                    zIndex: 1
                }]);
            
            // // F
            // start = '112:0:0';
            // end = '128:0:0';
            // clips = clips.concat([
            //     {
            //         resourceID: 'dom1',
            //         start: start,
            //         end: end,
            //         clipStart: '40:0:0',
            //         x1: 0, x2: 640,
            //         y1: 0, y2: 480,
            //         offsetX: 0, offsetY: 0,
            //         zoom: 1 // 678 / 640
            //     },
            //     {
            //         resourceID: 'dom1_f',
            //         start: start,
            //         end: end,
            //         clipStart: 0,
            //         x1: 0, x2: 640,
            //         y1: 190, y2: 480,
            //         offsetX: 0, offsetY: 0,
            //         zoom: 1 // 678 / 640
            //     },
            //     {
            //         resourceID: 'dom2',
            //         start: start,
            //         end: end,
            //         clipStart: '40:0:0',
            //         x1: 39 / (678 / 640), x2: (39 + 229) / (678 / 640),
            //         y1: 0, y2: 305 / (678 / 640),
            //         offsetX: 128 / (678 / 640), offsetY: 2 / (678 / 640),
            //         zoom: 0.789 / (678 / 640),
            //         zIndex: 1
            //     }]);


            return clips;
        },

        createData = function() {
            WH.util.setTiming(data.settings);
            data.clips = createClips();
            return data;
        };

    WH.createDom2Data = createData;

})(WH);
