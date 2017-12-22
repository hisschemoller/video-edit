/**
 * @type {Number} imgIndexStep
 * Number of frames to jump each slice, 
 * so a time difference of (imgIndexStep / framerate) seconds.
 * 
 */

var WH = WH || {};

(function(WH) {
    WH.createPlayerTimeShift = function(specs = {}, my = {}) {

        let images = [],
            imgCount = 600,
            imgIndex = 0,
            imgIndexStep = specs.imgIndexStep || 0,
            imgStepForward = typeof specs.imgStepForward == 'boolean' ? specs.imgStepForward : true,
            imgHeight = specs.imgHeight,
            imgWidth = specs.imgWidth,
            imgX = specs.imgX,
            imgY = specs.imgY,
            imgSliceWidth = specs.imgSliceWidth || 10,
            imgSliceCount = Math.ceil(imgWidth / imgSliceWidth),
            imgURLPrefix = specs.imgURLPrefix,
            imgURLSuffix = '.png',
            imgURLIndex = 1,
            imgUrlIndexStep = 1,
            imgURLLastIndex = specs.imgURLLastIndex,
            start = specs.start,
            end = specs.end,
            canvas,
            ctx,
            framerate = 30,
            millisecondsPerFrame,
            then,
            now,
            elapsed,
            
            captureEnabled = false,
            captureCounter = 0,
            captureThrottle = 1,
            captureFrameCounter = 0,
            socket,

            init = function() {
                canvas = document.getElementById('canvas');
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                ctx = canvas.getContext('2d');
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = "high";
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                
                millisecondsPerFrame = 1000 / framerate;
                imgURLIndex = Math.max(imgURLIndex, start * framerate);
                imgURLLastIndex = Math.min(imgURLLastIndex, (end * framerate) + imgCount);

                for (let i = 0; i < imgCount; i++) {
                    images.push(new Image());
                    setNextImage();
                }

                if (captureEnabled === true) {
                    socket = io.connect('http://localhost:3000');
                    captureFrameCounter = 0;
                    setTimeout(initRun, 2000);
                } else {
                    initRun();
                }
            },
            
            initRun = function() {
                then = performance.now();
                now = then;
                run();
            },

            run = function() {
                // throttle playback 
                // captureCounter++;
                // if (captureCounter % captureThrottle !== 0) {
                //     requestAnimationFrame(capture);
                //     return;
                // }
                
                // wait for next frame
                now = performance.now();
                elapsed = now - then;
                if (elapsed > millisecondsPerFrame) {
                    then = now - (elapsed % millisecondsPerFrame);
                    
                    // draw all images on canvas
                    let img;
                    for (let i = 0; i < imgSliceCount; i++) {
                        if (imgStepForward) {
                            img = images[(imgIndex + (i * imgIndexStep)) % imgCount];
                        } else {
                            img = images[(imgIndex + imgCount - (i * imgIndexStep)) % imgCount];
                        }
                        ctx.drawImage(
                            img, 
                            imgX + (i * imgSliceWidth), 
                            imgY, 
                            imgSliceWidth, 
                            imgHeight, 
                            i * imgSliceWidth, 
                            0, 
                            imgSliceWidth, 
                            imgHeight);
                    }
                    
                    // save image to file
                    if (captureEnabled) {
                        socket.emit('render-frame', {
                            frame: captureFrameCounter,
                            file: canvas.toDataURL()
                        });
                        captureFrameCounter++;
                    }
                    
                    setNextImage();
                }
                
                // request next frame if not reached the end
                if (imgURLIndex < imgURLLastIndex) {
                    requestAnimationFrame(run);
                } else {
                    console.log('done');
                }
            },

            setNextImage = function() {
                images[imgIndex].src = imgURLPrefix + ((imgURLIndex <= 99999) ? ('0000' + imgURLIndex).slice(-5) : '99999') + imgURLSuffix;
                imgURLIndex += imgUrlIndexStep;
                imgIndex = (imgIndex + 1) % imgCount;
            };

        that = specs.that || {};

        init();

        return that;
    };

})(WH);
