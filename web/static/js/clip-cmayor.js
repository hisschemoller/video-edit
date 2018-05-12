var WH = WH || {};

(function(WH) {

    WH.createClip = function(specs = {}, my = {}) {

        let that,
            framerate = specs.framerate,
            data,
            img,
            imgURLPrefix,
            imgURLSuffix = '.png',
            imgURLNr,
            globalStartPosition,
            isPlaying = false,
            isCapture = false,
            isTweeningOut = false,

            init = function() {
                img = new Image();
            },

            start = function(newData, isVideoCapture, position) {
                data = newData;
                isPlaying = true;
                isCapture = isVideoCapture;
                globalStartPosition = position;
                
                imgURLPrefix = data.resource.url;
                imgURLNr = Math.round(data.clipStart * framerate) + 1;
                img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + imgURLNr).slice(-5) : '99999') + imgURLSuffix;
                console.log('start clip', data.resourceID);
            },
            
            end = () => {
                console.log('end clip', data.resourceID);
                isPlaying = false;
                imgURLPrefix = '';
            }

            /**
             * Draw the video clip frame on canvas.
             * @param {Object} ctx Canvas drawing context.
             */
            draw = function(ctx, x1, x2) {
                if (data.flipHorizontal) {
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, x1, 0, x2 - x1, ctx.canvas.height, x1, 0, x2 - x1, ctx.canvas.height);
                    ctx.restore();
                } else {
                    ctx.drawImage(img, x1, 0, x2 - x1, ctx.canvas.height, x1, 0, x2 - x1, ctx.canvas.height);
                }
            },

            capture = function(ctx, framerate) {
                draw(ctx);
                video.currentTime += 1 / framerate;
            },

            update = function(position) {
                if (isPlaying) {
                    if (position < data.end) {
                        let localPosition = ((position - globalStartPosition) / 1000) + data.clipStart;
                        let newImgURLNr = Math.min(Math.floor(localPosition * framerate) + 1, data.resource.frames);
                        if (newImgURLNr !== imgURLNr) {
                            if (newImgURLNr <= data.resource.frames) {
                                imgURLNr = newImgURLNr;
                                img.src = imgURLPrefix + ((imgURLNr <= 99999) ? ('0000' + imgURLNr).slice(-5) : '99999') + imgURLSuffix;
                            } else {
                                // end();
                            }
                        }
                    } else {
                        end();
                    }
                }
            },

            getIsPlaying = function() {
                return isPlaying;
            },

            getZIndex = function() {
                return data.zIndex;;
            },
            
            getEnd = function() {
                return data.end;
            },
            
            getIsTweeningOut = function() {
                return isTweeningOut;
            },
            
            setIsTweeningOut = function(value) {
                isTweeningOut = value;
            };

        that = specs.that || {};

        init();

        that.start = start;
        that.draw = draw;
        that.capture = capture;
        that.update = update;
        that.getIsPlaying = getIsPlaying;
        that.getZIndex = getZIndex;
        that.getEnd = getEnd;
        that.getIsTweeningOut = getIsTweeningOut;
        that.setIsTweeningOut = setIsTweeningOut;
        return that;
    };

})(WH);
