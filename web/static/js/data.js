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
                data.score = convertMusicTiming(data);
                data.score = convertToMilliseconds(data);
                data.score = addResourceDataToClips(data);
                data.score = addZoomData(data);
                data.score = addDefaultValues(data);
                data.endTime = getEndTime(data.score);
            },

            /**
             * Convert musical timing to seconds.
             */
            convertMusicTiming = function(data) {
                if (data.settings.timing !== 'music') {
                    return data.score;
                }

                const clipData = data.score.slice(0);
                
                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    if (clip.start) {
                        clip.start = WH.util.musicToTime(clip.start);
                    }
                    if (clip.end) {
                        clip.end = WH.util.musicToTime(clip.end);
                    }
                    if (clip.clipStart) {
                        clip.clipStart = WH.util.musicToTime(clip.clipStart);
                    }
                }

                return clipData;
            },

            /**
             * Convert seconds to milliseconds.
             */
            convertToMilliseconds = function(data) {
                const clipData = data.score.slice(0);

                let clip, resource;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];
                    if (clip.start) {
                        clip.start *= 1000;
                    }
                    if (clip.end) {
                        clip.end *= 1000;
                    }
                }

                return clipData;
            },

            /**
             * Add video resource data to video clip data.
             */
            addResourceDataToClips = function(data) {
                // const clipData = data.score.slice(0);

                // let clip, resource;
                // for (let i = 0, n = clipData.length; i < n; i++) {
                //     clip = clipData[i];

                //     resource = data.resources.find(resource => resource.id === clip.resourceID);
                //     clip.resource = resource;
                // }

                // data.score.forEach(item => {
                //     if (item.type === 'clip') {
                //         item.resource = data.resources.find(resource => resource.id === clip.resourceID);
                //     }
                // });
                // return data.score;


                return data.score.reduce((accumulator, item, index) => {
                    if (item.type === 'clip') {
                        item.resource = data.resources.find(resource => resource.id === item.resourceID);
                    }
                    accumulator.push(item);
                    return accumulator;
                }, []);
            },

            /**
             * Add data to display a video clip zoomed in.
             */
            addZoomData = function(data) {
                const clipData = data.score.slice(0);

                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clip = clipData[i];

                    if (clip.type === 'clip') {
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
                }

                return clipData;
            },
            
            addDefaultValues = data => {
                return data.score.reduce((accumulator, item, index) => {
                    if (item.type === 'clip') {
                        item.zIndex = item.zIndex || 0;
                    }
                    accumulator.push(item);
                    return accumulator;
                }, []);
            },

            getEndTime = function(clipData) {
                let endTime = 0;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    if (clipData[i].end) {
                        endTime = Math.max(endTime, clipData[i].end);
                    }
                }
                return endTime;
            },

            skipToTime = function(time) {
                // adjust the clipDataIndex to skip clips
                let isAllSkipped = true;
                for (let i = 0, n = data.score.length; i < n; i++) {
                    console.log('skip', data.score[i].start);
                    clipIndex = i;
                    if (data.score[i].start >= time) {
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
            getNewScoreData = function(time) {
                if (clipIndex < data.score.length) {
                    let clipData = data.score[clipIndex],
                        newClips = [];

                    while (clipData && clipData.start <= time) {
                        newClips.push(clipData);
                        clipIndex++;
                        clipData = data.score[clipIndex];
                    }

                    return newClips;
                }
            };

        that = specs.that || {};

        init();
        
        that.get = get;
        that.skipToTime = skipToTime;
        that.getNewScoreData = getNewScoreData;
        return that;
    };

})(WH);
