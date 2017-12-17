var WH = WH || {};

(function(WH) {

    WH.createClip = function(specs = {}, my = {}) {

        let that,
            data,
            // video,
            isPlaying = false,
            isCapture = false,

            init = function() {
                // video = document.createElement('video');
                // video.addEventListener('loadeddata', onVideoLoaded);
            },

            start = function(newData, isVideoCapture) {
                data = newData;
                isPlaying = true;
                isCapture = isVideoCapture;
                // video.src = data.resource.url;
                console.log('start clip', data);
            },

            // onVideoLoaded = function() {
            //     video.currentTime = data.clipStart;
            //     video.muted = true;
            // 
            //     if (!isCapture) {
            //         video.play();
            //     }
            // },

            draw = function(ctx) {
                if (data.flipHorizontal) {
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.drawImage(video, data.sx, data.sy, data.sWidth, data.sHeight, data.dx, data.dy, data.dWidth, data.dHeight);
                    ctx.restore();
                } else {
                    ctx.drawImage(video, data.sx, data.sy, data.sWidth, data.sHeight, data.dx, data.dy, data.dWidth, data.dHeight);
                }
            },

            capture = function(ctx, framerate) {
                draw(ctx);
                video.currentTime += 1 / framerate;
            },

            update = function(time) {
                if (isPlaying && time >= data.end) {
                    console.log('end clip');
                    isPlaying = false;
                    video.pause();
                    video.src = '';
                }
            },

            getIsPlaying = function() {
                return isPlaying;
            };

        that = specs.that || {};

        init();

        that.start = start;
        that.draw = draw;
        that.capture = capture;
        that.update = update;
        that.getIsPlaying = getIsPlaying;
        return that;
    };

})(WH);
