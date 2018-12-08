import createData from './data/data-skalitzer.js';
import createPlayer from './player.js';
import { musicToTime } from './util.js';

createPlayer({
  dataObject: createData(),
  isCapture: false,
  startOffset: musicToTime('0:0:0'),
  throttle: 4,
});
