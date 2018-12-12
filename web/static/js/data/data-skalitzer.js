import { musicToTime, setTiming } from '../util.js'

const data = {
  settings: {
    framerate: 30,
    canvasHeight: 480,
    canvasWidth: 640,
    timing: 'music',
    ppqn: 24,
    bpm: 122,
    timesignature: {
      numerator: 4, // number of beats in a measure
      denominator: 4 // length of a beat (4 = quarter note, 8 = eight note)
    }
  },
  resources: [{
      id: 'main',
      url: '../../frames/main/frame_',
      frames: 16122
    },
  ],
  score: []
}

function createScore() {
  let score = [];

  let start = musicToTime('0:0:0'),
    end = musicToTime('32:0:0'),
    clipStart = 72;
    
  score = [...score,
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart,
      x: 0, y: 0,
      w: 640, h: 480,
    },
    // {
    //   type: 'clip',
    //   resourceID: 'main',
    //   start: start + 1, end: start + 4, clipStart: 267.8,
    //   x: -200, y: 200,
    //   w: 200, h: 280,
    //   offsetX: -200, offsetY: 200,
    //   x2: 800,
    // },
    {
      type: 'clip',
      resourceID: 'main',
      start: start, end: start + 12, clipStart: clipStart + 0.5,
      x: 400, y: 200,
      w: 50, h: 280,
      offsetX: 400, offsetY: 200,
      x2: -400,
    },
    {
      type: 'clip',
      resourceID: 'main',
      start, end: start, clipStart: clipStart + 1,
      x: 400, y: 200,
      w: 50, h: 280,
      offsetX: 400, offsetY: 200,
      x2: -400,
    },
  ];

  return score;
}

export default function createData() {
  setTiming(data.settings);
  data.score = createScore();
  return data;
};