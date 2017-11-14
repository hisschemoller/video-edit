var WH = WH || {};

(function(WH) {

    WH.createClip = function(specs = {}, my = {}) {

        let that,
            data,
            video,
            isPlaying = false,
            isCapture = false,
            
            init = function() {
                video = document.createElement('video');
                video.addEventListener('loadeddata', onVideoLoaded);
            },

            start = function(newData, isVideoCapture) {
                data = newData;
                isCapture = isVideoCapture;
                // video = resources.getResourceByID(data.resourceID).video.cloneNode();
                // video.currentTime = data.clipStart;
                // isPlaying = true;
                video.src = data.resource.url;
                console.log('start clip');
            },
            
            onVideoLoaded = function() {
                isPlaying = true;
                video.currentTime = data.clipStart + data.resource.startOffset;
                
                if (!isCapture) {
                    video.play();
                }
            },

            draw = function(ctx) {
                ctx.drawImage(video, data.sx, data.sy, data.sWidth, data.sHeight, data.x1, data.y1, data.width, data.height);
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
                    video.src = '';
                }
                return isPlaying;
            };

        that = specs.that || {};
        
        init();

        that.start = start;
        that.draw = draw;
        that.capture = capture;
        that.getIsPlaying = getIsPlaying;
        return that;
    };

})(WH);
