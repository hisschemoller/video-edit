var WH = WH || {};

(function(WH) {

    WH.createPlayer = function(specs = {}, my = {}) {
        let that,
            dataObject = specs.dataObject || {},
            isCapture = specs.isCapture || false,
            startOffset = specs.startOffset || 0,
            data,
            canvas,
            ctx,
            clips,
            origin,
            position,
            throttle = specs.throttle || 1,
            throttleCounter = 0,
            captureCounter = 0,
            frameCounter = 0,
            socket;

        const dev = {
                info: true,
                infoTimeEl: document.querySelector('.info__time')
            },

            init = function() {
                data = WH.createData({
                    dataObject: dataObject
                });

                canvas = document.getElementById('canvas');
                canvas.width = data.get().settings.canvasWidth;
                canvas.height = data.get().settings.canvasHeight;
                ctx = canvas.getContext('2d');
                ctx.webkitImageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = "high";
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;

                clips = WH.createClips({
                    framerate: data.get().settings.framerate
                });

                console.log('start');
                origin = performance.now();
                position = 0;

                if (startOffset > 0) {
                    position = startOffset * 1000;
                    origin -= position;
                    data.skipToTime(position);
                }

                if (isCapture === true) {
                    socket = io.connect('http://localhost:3000');
                    frameCounter = 0;
                }

                addNewClips();
                requestAnimationFrame(isCapture ? capture : draw);
            },

            addNewClips = function() {
                const clipdata = data.getNewClipsData(position);
                if (clipdata && clipdata.length > 0) {
                    clips.startClips(clipdata, isCapture, position);
                }
            },

            draw = function() {
                throttleCounter++;
                if (throttleCounter % throttle !== 0) {
                    requestAnimationFrame(draw);
                    return;
                }

                clips.draw(position, ctx);
                position = performance.now() - origin;
                addNewClips();

                if (dev.info) {
                    dev.infoTimeEl.innerHTML = (position / 1000).toFixed(1);
                }

                if (position < data.get().endTime) {
                    requestAnimationFrame(draw);
                } else {
                    console.log('done');
                }
            },

            capture = function() {
                captureCounter++;
                if (captureCounter % 8 !== 0) {
                    requestAnimationFrame(capture);
                    return;
                }

                clips.draw(position, ctx);
                position += 1000 / data.get().settings.framerate;
                addNewClips();

                if (dev.info) {
                    dev.infoTimeEl.innerHTML = (position / 1000).toFixed(1);
                }

                // send canvas to node app
                socket.emit('render-frame', {
                    frame: frameCounter,
                    file: canvas.toDataURL()
                });

                frameCounter++;

                // end if this was the last frame
                if (position < data.get().endTime) {
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
