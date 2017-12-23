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
                    id: 'dom1_w50',
                    url: 'static/seq/dom1_w50_l32_s0_x195_y150_w450_h330/frame_',
                    frames: 2283
                }, {
                    id: 'dom1_w50h',
                    url: 'static/seq/dom1_w50_l32_s10_x195_y150_w450_h330_h/frame_',
                    frames: 1683
                }
            ],
            clips: []
        },

        createClips = function() {

            let clips = [];

            // scene A
            let start = WH.util.musicToTime('0:0:0'),
                end = WH.util.musicToTime('32:0:0');

            clips = [...clips, 
                {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: 10,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480
                }, 
                {
                    resourceID: 'dom1_w50',
                    start: start,
                    end: start + WH.util.musicToTime('24:0:0'),
                    clipStart: 0,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: -195, offsetY: -150,
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
                {
                    resourceID: 'dom1_w50h',
                    start: start + WH.util.musicToTime('16:0:0'),
                    end: start + WH.util.musicToTime('24:0:0'),
                    clipStart: WH.util.musicToTime('16:0:0') - (600 / 30),
                    x1: 0, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: -195, offsetY: -150,
                    zIndex: 1
                }, 
                {
                    resourceID: 'dom1_w50h',
                    start: start + WH.util.musicToTime('24:0:0'),
                    end: end,
                    clipStart: WH.util.musicToTime('24:0:0') - (600 / 30),
                    x1: 0, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: -195, offsetY: -150,
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
                }, {
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

            return clips;
        },

        createData = function() {
            WH.util.setTiming(data.settings);
            data.clips = createClips();
            return data;
        };

    WH.createDom2Data = createData;

})(WH);
