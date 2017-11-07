var WH = WH || {};

(function(WH) {
    
    WH.createData = function(specs, my) {
        let that,
            data = specs.dataObject,
            
            init = function() {
                data.clips = convertMusicTiming(data);
                data.clips = adjustClipSettings(data);
            },
            
            convertMusicTiming = function(data) {
                if (data.settings.timing !== 'music') {
                    return data.clips;
                }
                
                const clipData = data.clips.slice(0),
                    pulsesPerBeat = data.settings.ppqn * (4 / data.settings.timesignature.denominator),
                    pulsesPerMeasure = pulsesPerBeat * data.settings.timesignature.denominator,
                    secondsPerBeat = 60 / data.settings.bpm,
                    secondsPerPulse = secondsPerBeat / pulsesPerBeat,
                    secondsPerMeasure = pulsesPerMeasure * secondsPerPulse;
                
                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.start = convertMusicTimestamp(clip.start, secondsPerPulse, secondsPerBeat, secondsPerMeasure);
                    clip.end = convertMusicTimestamp(clip.end, secondsPerPulse, secondsPerBeat, secondsPerMeasure);
                    clip.clipStart = convertMusicTimestamp(clip.clipStart, secondsPerPulse, secondsPerBeat, secondsPerMeasure);
                }
                
                return clipData;
            },
            
            convertMusicTimestamp = function(timestamp, secondsPerPulse, secondsPerBeat, secondsPerMeasure) {
                const timeArray = timestamp.split(':');
                return (parseInt(timeArray[0]) * secondsPerMeasure) +
                    (parseInt(timeArray[1]) * secondsPerBeat) + 
                    (parseInt(timeArray[2]) * secondsPerPulse);
            },
            
            adjustClipSettings = function(data) {
                const clipData = data.clips.slice(0);
                
                let clip, resource;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    resource = data.resources.find(resource => resource.id === clip.resourceID);
                    if (resource.startOffset) {
                        clip.start += resource.startOffset;
                        clip.end += resource.startOffset;
                        clip.clipStart += resource.startOffset;
                        clip.width = resource.x2 - resource.x1;
                        clip.height = resource.y2 - resource.y1;
                    }
                }
                
                return clipData;
            };
        
        that = specs.that || {};
        
        init();
    };

})(WH);