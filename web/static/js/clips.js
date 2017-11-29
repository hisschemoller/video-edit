var WH = WH || {};

(function(WH) {

    WH.createClips = function(specs = {}, my = {}) {

        let that,
            numClips = 8,
            clips = [],
            clipIndex = 0,

            init = function() {
                for (var i = 0; i < numClips; i++) {
                    clips.push(WH.createClip());
                }
            },

            startClips = function(clipData, isCapture) {
                for (let i = 0, n = clipData.length; i < n; i++) {
                    clips[clipIndex].start(clipData[i], isCapture);
                    clipIndex = (clipIndex + 1) % numClips;
                }
            },

            draw = function(time, ctx) {
                let clip,
                    renderIndex = clipIndex;
                for (let i = 0, n = numClips; i < n; i++) {
                    clip = clips[renderIndex];
                    if (clip.getIsPlaying(time)) {
                        clip.draw(ctx);
                    }
                    renderIndex = (renderIndex + 1) %numClips;
                }
            };

        that = specs.that || {};

        init();

        that.startClips = startClips;
        that.draw = draw;
        return that;
    };

})(WH);
