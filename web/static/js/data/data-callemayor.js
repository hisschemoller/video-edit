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
        }
      ],
      clips: []
    },

    createClips = function() {
      let clips = [];

      clips = [...clips,
        {
          resourceID: 'cmayor1',
          start: 0,
          end: WH.util.musicToTime('2:0:0'),
          clipStart: 6
        },
        {
          resourceID: 'cmayor2',
          start: 0,
          end: WH.util.musicToTime('8:0:0'),
          clipStart: 46
        },
        {
          resourceID: 'cmayor3a',
          start: 0,
          end: WH.util.musicToTime('2:0:0'),
          clipStart: 51
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