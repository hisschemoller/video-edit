/**
 * Manages the video clips.
 *
 * A fixed amount of video clip objects are available.
 * If a video should start an available clip object is taken from idleClips.
 * The clip is started and pushed to activeClips.
 * Clips are played from old to new.
 * When a clip stops it is moved back to idleClips.
 */

var WH = WH || {};

(function(WH) {

    WH.createClips = function(specs = {}, my = {}) {

        let that,
            numClips = 6,
            idleClips = [],
            activeClips = [],
            stoppedClips = [],
            tweenOutClipIndexes = [],
            // borderTweens = [],
            borders = [],
            canvasHeight = specs.canvasHeight,
            canvasWidth = specs.canvasWidth,
            measure = WH.util.musicToTime('1:0:0') * 1000,
            tweenInDuration = measure * 0.6,
            tweenOutDuration = measure,
            isFirstRun = true,

            init = function() {
                for (var i = 0; i < numClips; i++) {
                    idleClips.push(WH.createClip({
                        framerate: specs.framerate,
                        canvasHeight: specs.canvasHeight
                    }));
                }

                borders.push({ value: 0 });
                borders.push({ value: canvasWidth});
            },

            /**
             * Start new clips.
             * @param {Array} Data of clips to add and start.
             * @param {Boolean} isCapture True if the video is being recorded.
             * @param {Number} position Playback position on the main video timeline.
             */
            startClips = function(clipData, isCapture, position) {
                for (let i = 0, n = clipData.length; i < n; i++) {

                    // select a random position for the new clip
                    const index = Math.round(Math.random() * activeClips.length);

                    // add the new clip
                    if (idleClips.length) {
                        const clip = idleClips.pop();
                        clip.start(clipData[i], isCapture, position);
                        activeClips.splice(index, 0, clip);
                        
                        if (!isFirstRun) {
                            clip.setIsTweeningIn(true);
                        }
                    }

                    // add the border at the right of the new clip
                    borders.splice(index + 1, 0, {
                        value: borders[index].value,
                        isTweening: false
                    });
                }

                if (isFirstRun) {
                    isFirstRun = false;

                    // set borders to equal width
                    for (let i = 1, n = clipData.length; i < n; i++) {
                        borders[i].value = (i / n) * canvasWidth;
                    }

                    // remove the last added border because there's one
                    // less dividing border than there are clips
                    borders.splice(borders.length - 2, 1);
                } else {
                    setTweenIns(borders, position, tweenInDuration);
                }

                // sort the clips by z-index
                // activeClips.sort((a, b) => {
                //     return a.getZIndex() - b.getZIndex();
                // });

                // setTweenDestinations(borderTweens, canvasWidth, position, true);
            },

            stopClips = function() {
                idleClips = idleClips.concat(stoppedClips);
                stoppedClips = [];
                activeClips = activeClips.filter(clip => clip.getIsPlaying());
            },

            /**
             * Draw the video clip frames on canvas.
             * @param {Number} time Playback position on the main video timeline.
             * @param {Object} ctx Canvas drawing context.
             */
            draw = function(time, ctx) {
                let clip, x1, x2;
                for (let i = 0, n = activeClips.length; i < n; i++) {
                    clip = activeClips[i];
                    if (clip.getIsPlaying()) {
                        setTweenValues(borders, time);
                        x1 = borders[i].value; // (i === 0) ? 0 : borderTweens[i - 1].value;
                        x2 = borders[i + 1].value; // (i === n - 1) ? ctx.canvas.width : borderTweens[i].value;
                        clip.draw(ctx, x1, x2);
                        clip.update(time);
                        
                        // check if clip should tween out
                        if (clip.getEnd() - tweenOutDuration <= time && !clip.getIsTweeningOut()) {
                            clip.setIsTweeningOut(true);
                            tweenOutClipIndexes.push(i);
                        }

                        // check if clip is finished tweening in
                        if (clip.getStart() + tweenInDuration <= time && clip.getIsTweeningIn()) {
                            stopTweenIns(borders, activeClips);
                        }
                    } else {
                        stoppedClips.push(clip);
                    }
                }

                // if clips should start to tween out setup the tweens
                if (tweenOutClipIndexes.length) {
                    setTweenOuts(tweenOutClipIndexes, time, tweenOutDuration);
                    tweenOutClipIndexes = [];
                }

                if (stoppedClips.length) {
                    stopTweenOuts(borders, activeClips);
                    stopClips();
                }
            },

            setTweenIns = function(borders, time, duration) {
                const newClipWidth = canvasWidth / activeClips.length;
                let x = 0;
                for (let i = 1, n = borders.length - 1; i < n; i++) {
                    const border = borders[i];
                    border.fromValue = border.value;
                    border.toValue = x + newClipWidth;
                    border.fromTime = time;
                    border.toTime = time + duration;
                    border.isTweening = true;
                    x = border.toValue;
                }
            },

            setTweenOuts = function(tweenOutClipIndexes, time, duration) {
                const remainingClips = activeClips.map((clip, index) => tweenOutClipIndexes.indexOf(index) === -1);
                const remainingClipCount = activeClips.length - tweenOutClipIndexes.length;
                const remainingClipWidth = canvasWidth / remainingClipCount;

                let x = 0;
                for (let i = 0, n = activeClips.length - 1; i < n; i++) {
                    const border = borders[i + 1];
                    border.fromValue = border.value;
                    border.toValue = x + (remainingClips[i] ? remainingClipWidth : 0);
                    border.fromTime = time;
                    border.toTime = time + duration;
                    border.isTweening = true;
                    x = border.toValue;
                }
            },

            setTweenValues = function(borders, currentTime) {
                for (let i = 1, n = borders.length - 1; i < n; i++) {
                    const border = borders[i];
                    if (border.isTweening) {
                        const normalized = (currentTime - border.fromTime) / (border.toTime - border.fromTime);
                        border.value = border.fromValue + ((border.toValue - border.fromValue) * normalized);
                    }
                }
            },

            stopTweenIns = function(borders, activeClips) {
                for (let i = 1, n = borders.length - 1; i < n; i++) {
                    const border = borders[i];
                    border.isTweening = false;
                    border.value = border.toValue;
                }
                activeClips.forEach(clip => {
                    clip.setIsTweeningIn(false);
                });
            },

            stopTweenOuts = function(borders, activeClips) {
                for (let i = 1, n = borders.length - 1; i < n; i++) {
                    const border = borders[i];
                    border.isTweening = false;
                    border.value = border.toValue;
                }
                activeClips.forEach(clip => {
                    clip.setIsTweeningOut(false);
                });

                // remove the border at the right side of each ended clip
                for (let i = activeClips.length - 1, n = 0; i >= n; i--) {
                    if (!activeClips[i].getIsPlaying()) {
                        borders.splice(i + 1, 1);
                    }
                }
            };
            
            // setTweenDestinations = function(tweens, canvasWidth, position) {
            //     let x = 0,
            //         duration = measure * ((Math.random() > 0.5 ? 1 : 0) + 0.25);
            //     tweens.forEach(tween => {
            //         tween.fromTime = position;
            //         tween.toTime = position + duration;
            //         tween.fromValue = tween.value;
            //         tween.toValue = x + (canvasWidth / (tweens.length + 1)); // x + ((canvasWidth - x) * Math.random());
            //         x = tween.toValue;
            //     });
            // },
            
            // setTweenValues = function(tweens, currentTime) {
            //     if (currentTime > tweens[0].toTime) {
            //         setTweenDestinations(tweens, canvasWidth, currentTime);
            //     }

            //     tweens.forEach(tween => {
            //         let normalized = (currentTime - tween.fromTime) / (tween.toTime - tween.fromTime);
            //         tween.value = tween.fromValue + ((tween.toValue - tween.fromValue) * normalized);
            //     });
            // };

        that = specs.that || {};

        init();

        that.startClips = startClips;
        that.draw = draw;
        return that;
    };

})(WH);
