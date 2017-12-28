/**
 * @type {Number} imgIndexStep
 * Number of frames to jump each slice, 
 * so a time difference of (imgIndexStep / framerate) seconds.
 * 
 * ffmpeg -ss 110 -i 'dom2.avi' -c copy -t 120 'dom2a_sliced.avi'
 * ffmpeg -i dom2a_sliced.avi -filter:v "crop=600:100:40:380" dom2b_cropped.avi
 * ffmpeg -i dom2b_cropped.avi dom2fietsers_%04d.png
 */

var WH = WH || {};

(function(WH) {
    WH.createPlayerTimeShift = function(specs = {}, my = {}) {

        let images = [],
            imgCount = 1200,
            imgIndex = 0,
            imgIndexStep = specs.imgIndexStep || 0,
            imgStepForward = typeof specs.imgStepForward == 'boolean' ? specs.imgStepForward : true,
            imgHeight = specs.imgHeight || 100,
            imgWidth = specs.imgWidth || 100,
            imgX = specs.imgX || 0,
            imgY = specs.imgY || 0,
            imgSliceSize = specs.imgSliceSize || 10,
            imgSliceDirection = specs.imgSliceDirection || 'column',
            imgSliceCount = Math.ceil((imgSliceDirection === 'column' ? imgWidth : imgHeight) / imgSliceSize),
            imgURLPrefix = specs.imgURLPrefix,
            imgURLSuffix = '.png',
            imgURLIndex = 1,
            imgUrlIndexStep = 1,
            imgURLLastIndex = specs.imgURLLastIndex,
            start = specs.start,
            end = specs.end,
            direction = specs.direction || 'forward',
            canvas,
            ctx,
            framerate = specs.framerate || 30,
            millisecondsPerFrame,
            then,
            now,
            elapsed,
            infoTimeEl = document.querySelector('.info__time'),
            
            captureEnabled = specs.captureEnabled || false,
            captureFrameCounter = 0,
            captureFramerate = specs.captureFramerate || 10,
            socket,

            init = function() {
                console.log('start: ', start);
                console.log('end: ', end);
                console.log('number of frames: ', (end - start) * framerate);
                console.log('number of slices: ', imgSliceCount);
                
                canvas = document.getElementById('canvas');
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = "high";
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;
                
                millisecondsPerFrame = 1000 / (captureEnabled ? captureFramerate : framerate);
                imgURLIndex = Math.max(imgURLIndex, start * framerate);
                imgURLLastIndex = Math.floor(Math.min(imgURLLastIndex, (end * framerate) + imgCount));

                for (let i = 0; i < imgCount; i++) {
                    images.push(new Image());
                    setNextImage();
                }

                if (captureEnabled === true) {
                    socket = io.connect('http://localhost:3000');
                    captureFrameCounter = 0;
                    setTimeout(initRun, 12000);
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
                // wait for next frame
                now = performance.now();
                elapsed = now - then;
                if (elapsed > millisecondsPerFrame) {
                    then = now - (elapsed % millisecondsPerFrame);
                    
                    // draw all images on canvas
                    let img;
                    for (let i = 0; i < imgSliceCount; i++) {
                        if (imgStepForward) {
                            img = images[Math.round(imgIndex + (i * imgIndexStep)) % imgCount];
                        } else {
                            img = images[Math.round(imgIndex + imgCount - 1 - (i * imgIndexStep)) % imgCount];
                        }
                        if (imgSliceDirection === 'row') {
                            ctx.drawImage(
                                img, 
                                imgX, 
                                imgY + (i * imgSliceSize), 
                                imgWidth, 
                                imgSliceSize, 
                                0, 
                                i * imgSliceSize, 
                                imgWidth, 
                                imgSliceSize);
                        } else {
                            ctx.drawImage(
                                img, 
                                imgX + (i * imgSliceSize), 
                                imgY, 
                                imgSliceSize, 
                                imgHeight, 
                                i * imgSliceSize, 
                                0, 
                                imgSliceSize, 
                                imgHeight);
                        }
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

                    let position = (((imgURLIndex - imgCount) / framerate) - start).toFixed(1);
                    infoTimeEl.innerHTML = `${imgURLIndex} / ${imgURLLastIndex} frames, ${position} sec.`;
                }
                
                // request next frame if not reached the end
                if (imgURLIndex < imgURLLastIndex) {
                    requestAnimationFrame(run);
                } else {
                    console.log('done');
                }
            },

            setNextImage = function() {
                let localImgURLIndex = imgURLIndex;
                if (direction === 'reverse') {
                    localImgURLIndex = imgURLLastIndex + (start * framerate) - imgURLIndex;
                    localImgURLIndex = Math.max(1, Math.min(localImgURLIndex, imgURLLastIndex));
                }
                images[imgIndex].src = imgURLPrefix + ((localImgURLIndex <= 99999) ? ('0000' + localImgURLIndex).slice(-5) : '99999') + imgURLSuffix;
                imgURLIndex += imgUrlIndexStep;
                imgIndex = (imgIndex + 1) % imgCount;
            };

        that = specs.that || {};

        init();

        return that;
    };

})(WH);
