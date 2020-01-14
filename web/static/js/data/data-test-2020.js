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
      url: '../../frames/dublin/frame_',
      frames: 16122
    },
  ],
  score: []
}

function createScore() {
  let score = [];

  let start = musicToTime('0:0:0'),
    end = musicToTime('2:0:0'),
    clipStart = 72;
    
  score = [
    ...score,
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart,
      x: 0, y: 0,
      w: 320, h: 480,
      zoom: 640 / 480,
    },
    {
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart: clipStart + 2,
      x: 320, y: 0,
      w: 320, h: 480,
      offsetX: 320, offsetY: 0,
      zoom: 640 / 480,
    },
    {
      // ANIMATING CLIP
      type: 'clip',
      resourceID: 'main',
      start, end, clipStart,
      x: 0, y: 200,
      w: 100, h: 100,
      offsetX: 0, offsetY: 100,
      zoom: 640 / 480,
      x2: 640,
    },
  ];

  return score;
}

export default function createData() {
  setTiming(data.settings);
  data.score = createScore();
  return data;
};
