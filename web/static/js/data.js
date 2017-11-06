var WH = WH || {};

(function(WH) {
    
    WH.createData = function(specs, my) {
        let that,
            data = specs.dataObject,
            
            init = function() {
                if (data.settings.timing === 'music') {
                    data.clips = convertMusicTiming(data);
                }
            },
            
            convertMusicTiming = function(data) {
                const clipData = data.clips.slice(0),
                    pulsesPerBeat = data.settings.ppqn * (4 / data.settings.timesignature.denominator),
                    pulsesPerMeasure = pulsesPerBeat * data.settings.timesignature.denominator,
                    secondsPerBeat = 60 / data.settings.bpm,
                    secondsPerPulse = secondsPerBeat / pulsesPerBeat,
                    secondsPerMeasure = pulsesPerMeasure * secondsPerPulse;
                
                let clip;
                
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.start = parseMusicTimestamp(clip.start, secondsPerPulse, secondsPerBeat, secondsPerMeasure);
                    clip.end = parseMusicTimestamp(clip.end, secondsPerPulse, secondsPerBeat, secondsPerMeasure);
                    clip.clipStart = parseMusicTimestamp(clip.clipStart, secondsPerPulse, secondsPerBeat, secondsPerMeasure);
                }
                
                return clipData;
            },
            
            convertMusicTimestamp = function(timestamp, secondsPerPulse, secondsPerBeat, secondsPerMeasure) {
                const timeArray = timestamp.split(':');
                return (parseInt(timeArray[0]) * secondsPerMeasure) +
                    (parseInt(timeArray[1]) * secondsPerBeat) + 
                    (parseInt(timeArray[2]) * secondsPerPulse);
            };
        
        that = specs.that || {};
        
        init();
    };

})(WH);