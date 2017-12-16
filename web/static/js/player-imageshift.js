/**
 * ffmpeg -ss 140 -i 'dom2.avi' -c copy -t 60 'dom2a_sliced.avi'
 * ffmpeg -i dom2a_sliced.avi -filter:v "crop=600:100:40:380" dom2b_cropped.avi
 * ffmpeg -i dom2b_cropped.avi dom2fietsers_%04d.png
 */

var WH = WH || {};

(function(WH) {

    WH.createPlayerImageShift = function(specs = {}, my = {}) {

        let images = [],
            imgCount = 600,
            imgIndex = 0,
            imgIndexStep = 5,
            imgWidth = 600,
            imgHeight = 100,
            imgSliceWidth = 10,
            imgURLPrefix = 'static/tmp_dom2_fietsers/dom2fietsers_',
            imgURLSuffix = '.png',
            imgURLIndex = 1,
            imgUrlIndexStep = 1,
            imgURLLastIndex = 1836,
            canvas,
            ctx,
            captureEnabled = true,
            captureCounter = 0,
            captureThrottle = 20,
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

                for (let i = 0; i < imgCount; i++) {
                    images.push(new Image());
                    setNextImage();
                }

                if (captureEnabled === true) {
                    socket = io.connect('http://localhost:3000');
                    captureFrameCounter = 0;
                    setTimeout(capture, 2000);
                } else {
                    capture();
                }
            },

            setNextImage = function() {
                images[imgIndex].src = imgURLPrefix + ((imgURLIndex <= 9999) ? ('000' + imgURLIndex).slice(-4) : '9999') + imgURLSuffix;
                imgURLIndex += imgUrlIndexStep;
                imgIndex = (imgIndex + 1) % imgCount;
            },

            capture = function() {
                captureCounter++;
                if (captureCounter % captureThrottle !== 0) {
                    requestAnimationFrame(capture);
                    return;
                }

                let img;
                for (let i = 0; i < imgCount; i++) {
                    img = images[(imgIndex + (i * imgIndexStep)) % imgCount];
                    ctx.drawImage(img, i * imgSliceWidth, 0, imgSliceWidth, imgHeight, i * imgSliceWidth, 0, imgSliceWidth, imgHeight);
                }

                if (captureEnabled) {
                    socket.emit('render-frame', {
                        frame: captureFrameCounter,
                        file: canvas.toDataURL()
                    });
                    captureFrameCounter++;
                }

                setNextImage();

                if (imgURLIndex < imgURLLastIndex) {
                    console.log(imgURLIndex);
                    requestAnimationFrame(capture);
                } else {
                    console.log('done');
                }
            };

        that = specs.that || {};

        init();

        return that;
    };

})(WH);
