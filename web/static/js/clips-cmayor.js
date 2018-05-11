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
            borderTweens = [],
            canvasHeight = specs.canvasHeight,
            canvasWidth = specs.canvasWidth,

            init = function() {
                for (var i = 0; i < numClips; i++) {
                    idleClips.push(WH.createClip({
                        framerate: specs.framerate,
                        canvasHeight: specs.canvasHeight
                    }));
                }
            },

            /**
             * Start new clips.
             * @param {Array} Data of clips to add and start.
             * @param {Boolean} isCapture True if the video is being recorded.
             * @param {Number} position Playback position on the main video timeline.
             */
            startClips = function(clipData, isCapture, position) {
                let clip;
                for (let i = 0, n = clipData.length; i < n; i++) {
                    if (idleClips.length) {
                        clip = idleClips.pop();
                        clip.start(clipData[i], isCapture, position);
                        activeClips.push(clip);
                    }
                }
                
                activeClips.sort((a, b) => {
                    return a.getZIndex() - b.getZIndex();
                });

                // init tweens if these are the first clips started
                if (!borderTweens.length) {
                    // equally divide width over clips
                    for (let i = 1, n = clipData.length; i < n; i++) {
                        borderTweens.push({
                            value: (i / n) * canvasWidth
                        });
                    }
                } else {
                    // for (let i = 0, n = clipData.length; i < n; i++) {
                        
                    // }
                }

                setTweenDestinations(borderTweens, canvasWidth, position);
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
                    x1 = (i === 0) ? 0 : borderTweens[i - 1].value;
                    x2 = (i === n - 1) ? ctx.canvas.width : borderTweens[i].value;
                    clip = activeClips[i];
                    if (clip.getIsPlaying()) {
                        clip.draw(ctx, x1, x2);
                        clip.update(time);
                    } else {
                        stoppedClips.push(clip);
                    }
                }

                setTweenValues(borderTweens, time);

                if (stoppedClips.length) {
                    stopClips();
                }
            },
            
            setTweenDestinations = function(tweens, canvasWidth, position) {
                let x = 0;
                tweens.forEach(tween => {
                    tween.fromTime = position;
                    tween.toTime = position + (WH.util.musicToTime('1:0:0') * 1000);
                    tween.fromValue = tween.value;
                    tween.toValue = x + ((canvasWidth - x) * Math.random());
                    x = tween.toValue;
                });
            },
            
            setTweenValues = function(tweens, currentTime) {
                if (currentTime > tweens[0].toTime) {
                    setTweenDestinations(tweens, canvasWidth, currentTime);
                }

                tweens.forEach(tween => {
                    let normalized = (currentTime - tween.fromTime) / (tween.toTime - tween.fromTime);
                    tween.value = tween.fromValue + ((tween.toValue - tween.fromValue) * normalized);
                });
            };

        that = specs.that || {};

        init();

        that.startClips = startClips;
        that.draw = draw;
        return that;
    };

})(WH);
