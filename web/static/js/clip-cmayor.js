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
            isTweeningIn = false,
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
            draw = function(ctx, x, y, width, height) {
                if (data.flipHorizontal) {
                    ctx.save();
                    ctx.scale(-1, 1);
                    ctx.drawImage(img, x, y, width, height, x, y, width, height);
                    ctx.restore();
                } else {
                    ctx.drawImage(img, x, y, width, height, x, y, width, height);
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

            getIndex = function() {
                return data.index;
            },

            getZIndex = function() {
                return data.zIndex;
            },
            
            getStart = function() {
                return data.start;
            },
            
            getEnd = function() {
                return data.end;
            },
            
            getIsTweeningIn = function() {
                return isTweeningIn;
            },
            
            setIsTweeningIn = function(value) {
                isTweeningIn = value;
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
        that.getIndex = getIndex;
        that.getZIndex = getZIndex;
        that.getStart = getStart;
        that.getEnd = getEnd;
        that.getIsTweeningIn = getIsTweeningIn;
        that.setIsTweeningIn = setIsTweeningIn;
        that.getIsTweeningOut = getIsTweeningOut;
        that.setIsTweeningOut = setIsTweeningOut;
        return that;
    };

})(WH);
