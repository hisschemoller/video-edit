var WH = WH || {};

(function(WH) {

    const data = {
      settings: {
        framerate: 30,
        canvasHeight: 480,
        canvasWidth: 640,
        timing: 'music',
        ppqn: 24,
        bpm: 120,
        timesignature: {
          numerator: 4, // number of beats in a measure
          denominator: 4 // length of a beat (4 = quarter note, 8 = eight note)
        }
      },
      resources: [{
        id: 'cmayor1',
        url: 'static/seq/cmayor1/frame_',
        frames: 14996
      },{
        id: 'cmayor2',
        url: 'static/seq/cmayor2/frame_',
        frames: 15483
      },{
        id: 'cmayor3a',
        url: 'static/seq/cmayor3a/frame_',
        frames: 13852
      },{
        id: 'cmayor3b',
        url: 'static/seq/cmayor3b/frame_',
        frames: 3881
      }],
      clips: []
    },

    createClips = function() {
      let clips = [];

      let start = WH.util.musicToTime('0:0:0'),
        end = WH.util.musicToTime('64:0:0');

      clips = [...clips,
        {
          resourceID: 'cmayor1',
          start: start,
          end: end,
          clipStart: 6,
          x1: 0, x2: 210,
          y1: 0, y2: 480
        },
        {
          resourceID: 'cmayor2',
          start: start,
          end: end,
          clipStart: 46,
          x1: 210, x2: 430,
          y1: 0, y2: 480,
          offsetX: 210, offsetY: 0
        },
        {
          resourceID: 'cmayor3a',
          start: start,
          end: end,
          clipStart: 51,
          x1: 430, x2: 640,
          y1: 0, y2: 480,
          offsetX: 430, offsetY: 0
        }
      ];

      return clips;
    },

    createData = function() {
        WH.util.setTiming(data.settings);
        data.clips = createClips();
        return data;
    };

WH.createCalleMayorData = createData;

})(WH);