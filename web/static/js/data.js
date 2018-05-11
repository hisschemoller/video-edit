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
                data.clips = convertToMilliseconds(data);
                data.clips = addResourceDataToClips(data);
                data.clips = addZoomData(data);
                data.clips = addDefaultValues(data);
                data.endTime = getEndTime(data.clips);
            },

            convertMusicTiming = function(data) {
                if (data.settings.timing !== 'music') {
                    return data.clips;
                }

                const clipData = data.clips.slice(0);

                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.start = WH.util.musicToTime(clip.start);
                    clip.end = WH.util.musicToTime(clip.end);
                    clip.clipStart = WH.util.musicToTime(clip.clipStart);
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
            
            addDefaultValues = (data) => {
                const clipData = [...data.clips];
                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    clip.zIndex = clip.zIndex || 0;
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
                    console.log('skip', data.clips[i].start);
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
             * @return {Array} Data of clips that start.
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
            };

        that = specs.that || {};

        init();
        
        that.get = get;
        that.skipToTime = skipToTime;
        that.getNewClipsData = getNewClipsData;
        return that;
    };

})(WH);
