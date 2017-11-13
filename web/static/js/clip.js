var WH = WH || {};

(function(WH) {

    WH.createClip = function(specs = {}, my = {}) {

        let that,
            data,
            video,
            isPlaying = false;

            start = function(newData, resources, isCapture) {
                data = newData;
                video = resources.getResourceByID(data.resourceID).video.cloneNode();
                video.currentTime = data.clipStart;
                isPlaying = true;
                
                // var isPlaying = video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2;
                console.log(video);
                if (!isCapture) {
                    // video.play();
                    video.currentTime = 1;
                }
            },

            draw = function(ctx) {
                ctx.drawImage(video, data.x1, data.y1, data.width, data.height, data.x1, data.y1, data.width, data.height);
            },
            
            capture = function(ctx, framerate) {
                draw(ctx);
                video.currentTime += 1 / framerate;
            }

            getIsPlaying = function(time) {
                if (isPlaying && time >= data.end) {
                    console.log('end clip');
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
