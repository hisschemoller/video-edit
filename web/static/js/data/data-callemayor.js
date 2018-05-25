var WH = WH || {};

(function(WH) {

    const data = {
      settings: {
        framerate: 30,
        canvasHeight: 480,
        canvasWidth: 640,
        timing: 'music',
        ppqn: 24,
        bpm: 112,
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
      score: []
    },

    createScore = function() {
      let score = [],
      startVariation = Math.random() * 3,
      cmayor1Start = 2 * 60 + 30 + startVariation,
      cmayor2Start = 3 * 60 + 11 + startVariation,
      cmayor3aStart = 3 * 60 + 18 + startVariation;

      // 0 - 16 

      // calle mayor
      
      // three columns of three different days

      score = [...score,
        {
          type: 'action',
          start: WH.util.musicToTime('0:0:0'),
          action: 'columns'
        },
        {
          type: 'clip',
          resourceID: 'cmayor1',
          start: WH.util.musicToTime('0:0:0'),
          end: WH.util.musicToTime('16:0:0'),
          clipStart: cmayor1Start,
        },
        {
          type: 'clip',
          resourceID: 'cmayor2',
          start: WH.util.musicToTime('0:0:0'),
          end: WH.util.musicToTime('16:0:0'),
          clipStart: cmayor2Start,
          index: 1,
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('0:0:0'),
          end: WH.util.musicToTime('33:0:0'),
          clipStart: cmayor3aStart,
          index: 0,
        },

        // 18 - 34 

        // calle mayor
        
        // eight columns of day three

        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('18:0:0'),
          end: WH.util.musicToTime('33:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('18:0:0') + 0.1
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('18:0:0'),
          end: WH.util.musicToTime('33:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('18:0:0') + 0.15
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('18:0:0'),
          end: WH.util.musicToTime('33:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('18:0:0') + 0.2
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('18:0:0'),
          end: WH.util.musicToTime('33:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('18:0:0') + 0.25
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('18:0:0'),
          end: WH.util.musicToTime('33:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('18:0:0') + 0.3
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('18:0:0'),
          end: WH.util.musicToTime('34:2:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('18:0:0') + 0.35
        },
      ];

      // kijkende mensen

      score = [...score, 
        {
          type: 'clip',
          resourceID: 'cmayor2',
          start: WH.util.musicToTime('33:0:0') + WH.util.musicToTime('0:1:0'),
          end: WH.util.musicToTime('52:0:0'),
          clipStart: cmayor2Start + WH.util.musicToTime('33:0:0') + WH.util.musicToTime('0:1:0'),
          index: 0,
        },
      ];

      // 36 - 52

      // puerta del sol

      // three rows of all three days

      // cmayor1Start;
      cmayor2Start -= 4;
      cmayor3aStart -= 3;

      score = [...score, 
        {
          type: 'action',
          start: WH.util.musicToTime('36:0:0') + WH.util.musicToTime('0:0:0'),
          action: 'rows'
        },

        {
          type: 'clip',
          resourceID: 'cmayor1',
          start: WH.util.musicToTime('36:1:0'),
          end: WH.util.musicToTime('52:0:0'),
          clipStart: cmayor1Start + WH.util.musicToTime('36:1:0')
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('36:1:0'),
          end: WH.util.musicToTime('70:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('36:1:0')
        },
      ];

      // 54 - 70

      // puerta del sol

      // four rows of day 2, no day 3

      score = [...score,
        {
          type: 'action',
          start: WH.util.musicToTime('52:0:0') + WH.util.musicToTime('0:2:0'),
          action: 'rows'
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('54:0:0'),
          end: WH.util.musicToTime('70:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('54:0:0') + 0.1
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('54:0:0'),
          end: WH.util.musicToTime('70:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('54:0:0') + 0.2
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('54:0:0'),
          end: WH.util.musicToTime('106:0:0'),
          clipStart: cmayor3aStart + WH.util.musicToTime('54:0:0') + 0.3
        },
      ];

      // 72 - 88

      // puerta del sol

      // four columns of all three days

      score = [...score,
        {
          type: 'action',
          start: WH.util.musicToTime('70:0:0') + WH.util.musicToTime('0:2:0'),
          action: 'columns'
        },
        {
          type: 'clip',
          resourceID: 'cmayor1',
          start: WH.util.musicToTime('72:0:0'),
          end: WH.util.musicToTime('88:0:0'),
          clipStart: cmayor1Start + WH.util.musicToTime('72:0:0'),
          index: 1,
        },
        {
          type: 'clip',
          resourceID: 'cmayor1',
          start: WH.util.musicToTime('72:0:0'),
          end: WH.util.musicToTime('88:0:0'),
          clipStart: cmayor1Start + WH.util.musicToTime('72:0:0') + 0.1,
          index: 2,
        },
        {
          type: 'clip',
          resourceID: 'cmayor2',
          start: WH.util.musicToTime('72:0:0'),
          end: WH.util.musicToTime('88:0:0'),
          clipStart: cmayor2Start + WH.util.musicToTime('72:0:0'),
        },
      ];

      // 90 - 106

      // puerta del sol

      // two rows of day three

      score = [...score,
        {
          type: 'action',
          start: WH.util.musicToTime('88:0:0') + WH.util.musicToTime('0:2:0'),
          action: 'rows'
        },
        {
          type: 'clip',
          resourceID: 'cmayor3a',
          start: WH.util.musicToTime('90:0:0'),
          end: WH.util.musicToTime('109:0:0') + 0.1,
          clipStart: cmayor3aStart + WH.util.musicToTime('90:0:0') + 0.1
        },
      ];

      // 108 - 124

      // carrera de san jerónimo

      // three or four columns of day three

      let cmayor3bStart = 6;

      score = [...score,
        {
          type: 'action',
          start: WH.util.musicToTime('106:0:0') + WH.util.musicToTime('0:2:0'),
          action: 'columns'
        },
        {
          type: 'clip',
          resourceID: 'cmayor3b',
          start: WH.util.musicToTime('108:0:0'),
          end: WH.util.musicToTime('124:0:0'),
          clipStart: cmayor3bStart
        },
        {
          type: 'clip',
          resourceID: 'cmayor3b',
          start: WH.util.musicToTime('108:0:0'),
          end: WH.util.musicToTime('124:0:0'),
          clipStart: cmayor3bStart + 0.1
        },
        {
          type: 'clip',
          resourceID: 'cmayor3b',
          start: WH.util.musicToTime('108:0:0'),
          end: WH.util.musicToTime('124:0:0'),
          clipStart: cmayor3bStart + 0.2
        },
        {
          type: 'clip',
          resourceID: 'cmayor3b',
          start: WH.util.musicToTime('108:0:0'),
          end: WH.util.musicToTime('148:0:0'),
          clipStart: cmayor3bStart + 0.3
        },
      ];

      // 126 - 148

      // carrera de san jerónimo

      // three rows of day three

      score = [...score,
        {
          type: 'action',
          start: WH.util.musicToTime('124:0:0') + WH.util.musicToTime('0:2:0'),
          action: 'rows'
        },
        {
          type: 'clip',
          resourceID: 'cmayor3b',
          start: WH.util.musicToTime('126:0:0'),
          end: WH.util.musicToTime('148:0:0'),
          clipStart: cmayor3bStart + WH.util.musicToTime('18:0:0') + 0.1,
        },
        {
          type: 'clip',
          resourceID: 'cmayor3b',
          start: WH.util.musicToTime('126:0:0'),
          end: WH.util.musicToTime('148:2:0'),
          clipStart: cmayor3bStart + WH.util.musicToTime('18:0:0') + 0.2,
        }
      ];

      // score = [
      //   {
      //     type: 'action',
      //     start: WH.util.musicToTime('0:0:0'),
      //     action: 'columns'
      //   },
      //   {
      //     type: 'clip',
      //     resourceID: 'cmayor1',
      //     start: WH.util.musicToTime('0:0:0'),
      //     end: WH.util.musicToTime('4:0:0'),
      //     clipStart: cmayor1Start,
      //     index: 0,
      //   },
      //   {
      //     type: 'clip',
      //     resourceID: 'cmayor2',
      //     start: WH.util.musicToTime('1:2:0'),
      //     end: WH.util.musicToTime('4:0:0'),
      //     clipStart: cmayor2Start
      //   },
      //   {
      //     type: 'clip',
      //     resourceID: 'cmayor3a',
      //     start: WH.util.musicToTime('1:2:0'),
      //     end: WH.util.musicToTime('4:0:0'),
      //     clipStart: cmayor3aStart
      //   },
      // ];

      return score;
    },

    createData = function() {
        WH.util.setTiming(data.settings);
        data.score = createScore();
        return data;
    };

WH.createCalleMayorData = createData;

})(WH);