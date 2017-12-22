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
                    url: 'static/seq/dom1_w50_m32_x100_y200_w440_h280/frame-',
                    frames: 2214
                }
            ],
            clips: []
        },

        createClips = function() {

            let clips = [];

            // scene A
            let start = '0:0:0',
                end = '32:0:0';

            clips = clips.concat([
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
                    end: end,
                    clipStart: 0,
                    x1: 0, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: -100, offsetY: -200
                }, 
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: 10,
                    x1: 0, x2: 195,
                    y1: 29, y2: 373,
                    offsetX: 45, offsetY: -5,
                    zoom: 0.719
                }]);
                
            start = '32:0:0';
            end = '48:0:0';
            clips = clips.concat([
                {
                    resourceID: 'dom2',
                    start: start,
                    end: end,
                    clipStart: 120,
                    x1: 0, x2: 320,
                    y1: 0, y2: 480
                }, {
                    resourceID: 'dom1',
                    start: start,
                    end: end,
                    clipStart: 100,
                    x1: 320, x2: 640,
                    y1: 0, y2: 480,
                    offsetX: 0, offsetY: 0,
                    zoom: 1
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
