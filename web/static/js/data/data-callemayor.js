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
      }],
      clips: []
    },

    createClips = function() {
      let clips = [];

      let start = WH.util.musicToTime('0:0:0'),
        end = WH.util.musicToTime('32:0:0'),
        cmayor1ClipStart = 10;

      clips = [...clips, 
        {
          resourceID: 'cmayor1',
          start: start,
          end: end,
          clipStart: cmayor1ClipStart,
          x1: 0, x2: 640,
          y1: 0, y2: 480
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