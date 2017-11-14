var WH = WH || {};

(function(WH) {
    
    WH.createData = function(specs, my) {
        let that,
            data = specs.dataObject,
            clipIndex = 0,
            
            init = function() {
                data.clips = convertMusicTiming(data);
                data.clips = adjustClipSettings(data);
                data.clips = convertToMilliseconds(data);
                data.clips = addResourceDataToClips(data);
                data.clips = addZoomData(data);
                data.endTime = getEndTime(data.clips);
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
                    clip.width = clip.x2 - clip.x1;
                    clip.height = clip.y2 - clip.y1;
                    resource = data.resources.find(resource => resource.id === clip.resourceID);
                    if (resource.startOffset) {
                        clip.start += resource.startOffset;
                        clip.end += resource.startOffset;
                        clip.clipStart += resource.startOffset;
                    }
                }
                
                return clipData;
            },
            
            convertToMilliseconds = function(data) {
                const clipData = data.clips.slice(0);
                
                let clip, resource;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.start *= 1000;
                    clip.end *= 1000;
                    clip.clipStart *= 1000;
                }
                
                return clipData;
            },
            
            addResourceDataToClips = function(data) {
                const clipData = data.clips.slice(0);
                
                let clip, resource;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    resource = data.resources.find(resource => resource.id === clip.resourceID);
                    clip.resource = resource;
                }
                
                return clipData;
            },
            
            addZoomData = function(data) {
                const clipData = data.clips.slice(0);
                
                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.zoom = clip.zoom || 1;
                    clip.sx = clip.x1;
                    clip.sy = clip.y1;
                    clip.sWidth = clip.width / clip.zoom;
                    clip.sHeight = clip.height / clip.zoom;
                }
                
                return clipData;
            },
            
            getEndTime = function(clipData) {
                let endTime = 0;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    endTime = Math.max(endTime, clipData[i].end);
                }
                return endTime;
            },
            
            get = function() {
                return data;
            },
            
            /**
             * 
             * @param  {Number} time Playback position in milliseconds.
             * @return {Array} Data of clips that start 
             */
            getNewClipsData = function(time) {
                if (clipIndex < data.clips.length) {
                    let clipData = data.clips[clipIndex],
                        newClips = [];
                    
                    while (clipData && clipData.start <= time) {
                        newClips.push(clipData);
                        clipIndex++;
                        clipData = data.clips[clipIndex];
                    }
                    
                    return newClips;
                }
                
                // let isNothingToStart = true;
                // if (clipIndex < data.clips.length && data.clips[clipIndex].start <= time) {
                //     clips[clipIndex].start(clipData[clipDataIndex], settings.isCapture);
                //     clipDataIndex++;
                //     clipIndex = (clipIndex + 1) % numClips;
                //     isNothingToStart = false;
                // }
                // return isNothingToStart;
            };
        
        that = specs.that || {};
        
        init();
        
        that.get = get;
        that.getNewClipsData = getNewClipsData;
        return that;
    };

})(WH);
