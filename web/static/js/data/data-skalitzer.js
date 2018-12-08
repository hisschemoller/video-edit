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
    clipStart = 30;
    
  score = [...score, 
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart,
      x1: 0, x2: 320,
      y1: 0, y2: 480,
    },
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart: clipStart + 30,
      x1: 320, x2: 640,
      y1: 0, y2: 480,
      offsetX: 320, offsetY: 0,
    },
  ];

  return score;
}

export default function createData() {
  setTiming(data.settings);
  data.score = createScore();
  return data;
};