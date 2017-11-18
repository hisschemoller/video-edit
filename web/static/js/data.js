var WH = WH || {};

(function(WH) {

    WH.createData = function(specs, my) {
        let that,
            data = specs.dataObject,
            clipIndex = 0,
            secondsPerPulse,
            secondsPerBeat,
            secondsPerMeasure,

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
                    pulsesPerMeasure = pulsesPerBeat * data.settings.timesignature.denominator;

                secondsPerBeat = 60 / data.settings.bpm,
                secondsPerPulse = secondsPerBeat / pulsesPerBeat,
                secondsPerMeasure = pulsesPerMeasure * secondsPerPulse;

                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.start = convertMusicTimestamp(clip.start);
                    clip.end = convertMusicTimestamp(clip.end);
                    clip.clipStart = convertMusicTimestamp(clip.clipStart);
                }

                return clipData;
            },

            convertMusicTimestamp = function(timestamp) {
                if (typeof timestamp === 'string') {
                    const timeArray = timestamp.split(':');
                    return (parseInt(timeArray[0]) * secondsPerMeasure) +
                        (parseInt(timeArray[1]) * secondsPerBeat) +
                        (parseInt(timeArray[2]) * secondsPerPulse);
                } else if(typeof timestamp === 'number') {
                    return timestamp;
                }

                return 0;
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
                    // clip.clipStart *= 1000;
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
                    clip.flipHorizontal = clip.flipHorizontal || false
                    clip.offsetX = clip.offsetX || 0;
                    clip.offsetY = clip.offsetY || 0;

                    clip.dx = clip.x1;
                    clip.dy = clip.y1;
                    clip.dWidth = clip.x2 - clip.x1;
                    clip.dHeight = clip.y2 - clip.y1;

                    clip.sx = clip.offsetX / clip.zoom;
                    clip.sy = clip.offsetY / clip.zoom;
                    clip.sWidth = clip.dWidth / clip.zoom;
                    clip.sHeight = clip.dHeight / clip.zoom;

                    if (clip.flipHorizontal) {
                        clip.dx -= clip.dWidth;
                    }
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

            skipToTime = function(time) {
                // adjust the clipDataIndex to skip clips
                let isAllSkipped = true;
                for (let i = 0, n = data.clips.length; i < n; i++) {
                    console.log(data.clips[i].start, time);
                    clipIndex = i;
                    if (data.clips[i].start >= time) {
                        isAllSkipped = false;
                        break;
                    }
                }

                // if all clips skipped
                if (isAllSkipped && clipData.length > 0) {
                    clipDataIndex = clipData.length;
                }
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

        that.convertMusicTimestamp = convertMusicTimestamp;
        that.get = get;
        that.skipToTime = skipToTime;
        that.getNewClipsData = getNewClipsData;
        return that;
    };

})(WH);
