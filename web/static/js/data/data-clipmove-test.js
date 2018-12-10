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
      frames: 15829, // 16122,
    },
  ],
  score: []
}

function createScore() {
  let score = [];

  let start = musicToTime('0:0:0'),
    end = musicToTime('2:0:0'),
    clipStart = 30;
    
  score = [...score, 
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart,
      x: 0, y: 0,
      w: 640, h: 480,
    },
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart: clipStart + 30,
      x: 100, y: 200,
      w: 150, h: 100,
      offsetX: 100, offsetY: 200,
      x2: 400,
    },
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart: clipStart + 20,
      x: 500, y: 200,
      w: 150, h: 100,
      offsetX: 500, offsetY: 200,
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