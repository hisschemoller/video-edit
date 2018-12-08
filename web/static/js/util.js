
let bpm,
  ppqn,
  numerator,
  denominator,
  secondsPerBeat,
  secondsPerPulse,
  secondsPerMeasure;

export function setTiming (settings) {
  bpm = settings.bpm;
  ppqn = settings.ppqn;
  numerator = settings.timesignature.numerator;
  denominator = settings.timesignature.denominator;

  const pulsesPerBeat = ppqn * (4 / denominator),
      pulsesPerMeasure = pulsesPerBeat * denominator;

  secondsPerBeat = 60 / bpm,
  secondsPerPulse = secondsPerBeat / pulsesPerBeat,
  secondsPerMeasure = pulsesPerMeasure * secondsPerPulse;
}

export function musicToTime(timestamp) {
  if (typeof timestamp === 'string') {
    const timeArray = timestamp.split(':');
    return (parseInt(timeArray[0]) * secondsPerMeasure) +
      (parseInt(timeArray[1]) * secondsPerBeat) +
      (parseInt(timeArray[2]) * secondsPerPulse);
  } else if(typeof timestamp === 'number') {
    return timestamp;
  }
  return 0;
}

export function timeToMusic() {

}
