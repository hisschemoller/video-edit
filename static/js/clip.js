var WH = WH || {};

(function(WH) {

    WH.createClip = function(specs, my) {

        let that,
            data,
            isPlaying = false;

        const video = specs.video,

            start = function(newData) {
                data = newData;
                console.log(data);
                video.currentTime = data.clipStart;
                video.play();
                isPlaying = true;
            },

            draw = function(ctx) {
                ctx.drawImage(video, data.x, data.y, data.width, data.height, data.x, data.y, data.width, data.height);
            },

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
        that.getIsPlaying = getIsPlaying;
        return that;
    };

})(WH);
