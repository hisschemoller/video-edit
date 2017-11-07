var WH = WH || {};

(function(WH) {

    WH.createClip = function(specs = {}, my = {}) {

        let that,
            data,
            video,
            isPlaying = false;

            start = function(newData, isCapture) {
                data = newData;
                video.currentTime = data.clipStart;
                isPlaying = true;
                
                if (!isCapture) {
                    video.play();
                }
            },

            draw = function(ctx) {
                ctx.drawImage(video, data.x, data.y, data.width, data.height, data.x, data.y, data.width, data.height);
            },
            
            capture = function(ctx, framerate) {
                draw(ctx);
                video.currentTime += 1 / framerate;
            }

            getIsPlaying = function(time) {
                if (isPlaying && time >= data.end) {
                    isPlaying = false;
                    video.pause();
                }
                return isPlaying;
            };

        that = specs.that || {};

        that.start = start;
        that.draw = draw;
        that.capture = capture;
        that.getIsPlaying = getIsPlaying;
        return that;
    };

})(WH);
