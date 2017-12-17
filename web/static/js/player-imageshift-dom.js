var WH = WH || {};

(function(WH) {

    WH.createPlayerImageShiftDom = function(specs = {}, my = {}) {

        let images = [],
            imgCount = 600,
            imgIndex = 0,
            imgIndexStep = specs.imgIndexStep || 0,
            imgStepForward = typeof specs.imgStepForward == 'boolean' ? specs.imgStepForward : true,
            imgHeight = specs.imgHeight,
            imgWidth = specs.imgWidth,
            imgX = specs.imgX,
            imgY = specs.imgY,
            imgSliceWidth = 10,
            imgSliceCount = Math.ceil(imgWidth / imgSliceWidth),
            imgURLPrefix = specs.imgURLPrefix,
            imgURLSuffix = '.png',
            imgURLIndex = 1,
            imgUrlIndexStep = 1,
            imgURLLastIndex = specs.imgURLLastIndex,
            canvas,
            ctx,
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
                images[imgIndex].src = imgURLPrefix + ((imgURLIndex <= 99999) ? ('0000' + imgURLIndex).slice(-5) : '99999') + imgURLSuffix;
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

                if (captureEnabled) {
                    socket.emit('render-frame', {
                        frame: captureFrameCounter,
                        file: canvas.toDataURL()
                    });
                    captureFrameCounter++;
                }

                setNextImage();

                if (imgURLIndex < imgURLLastIndex) {
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
