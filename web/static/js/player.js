var WH = WH || {};

(function(WH) {

    WH.createPlayer = function(specs = {}, my = {}) {
        let that,
            dataObject = specs.dataObject,
            isCapture = specs.isCapture,
            data,
            video,
            canvas,
            ctx,
            clips,
            origin,
            position,
            throttle = 2,
            throttleCounter = 0,
            captureCounter,
            captureEndTime,
            frameCounter,
            socket;
            // settings = {
            //     videoPath: null,
            //     clipData: null,
            //     framerate: 30,
            //     canvasHeight: 360,
            //     canvasWidth: 480,
            //     startOffset: 0,
            //     isCapture: false
            // };

        const dev = {
                info: true,
                infoTimeEl: document.querySelector('.info__time'),
                startOffset: 0
            },

            init = function() {
                data = WH.createData({
                    dataObject: dataObject
                });

                canvas = document.getElementById('canvas');
                canvas.width = data.get().settings.canvasWidth;
                canvas.height = data.get().settings.canvasHeight;
                ctx = canvas.getContext('2d');
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.imageSmoothingQuality = "high";
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;

                clips = WH.createClips();

                // resources = WH.createResources({
                //     data: data.get().resources,
                //     loadedCallback: start
                // });
            // },

            // start = function() {
                console.log('start');
                origin = performance.now();
                position = 0;
                addNewClips();
                requestAnimationFrame(draw);
            },

            addNewClips = function() {
                const clipdata = data.getNewClipsData(position);
                if (clipdata && clipdata.length > 0) {
                    clips.startClips(clipdata, data.resources, isCapture);
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

            // setup = function() {
            //     video = document.createElement('video');
            //     video.src = data.resources[0].url;
            //     video.addEventListener('loadeddata', onVideoLoaded);
            // },

            // onVideoLoaded = function() {
            //     // create clips to play video fragments
            //     // for (let i = 0; i < numClips; i++) {
            //     //     clips.push(WH.createClip({
            //     //         video: video.cloneNode()
            //     //     }));
            //     // }
            //
            //     video.currentTime = settings.startOffset;
            //
            //     // start later in the video (while developing)
            //     if (dev.startOffset > 0) {
            //         video.currentTime += dev.startOffset;
            //
            //         // adjust the clipDataIndex to skip clips
            //         let isAllSkipped = true;
            //         for (let i = 0, n = clipData.length; i < n; i++) {
            //             console.log(clipData[i].start, video.currentTime);
            //             clipDataIndex = i;
            //             if (clipData[i].start >= video.currentTime) {
            //                 isAllSkipped = false;
            //                 break;
            //             }
            //         }
            //
            //         // if all clips skipped
            //         if (isAllSkipped && clipData.length > 0) {
            //             clipDataIndex = clipData.length;
            //         }
            //     }
            //
            //     if (settings.isCapture === true) {
            //         socket = io.connect('http://localhost:3000');
            //         frameCounter = 0;
            //         captureCounter = 0;
            //         captureEndTime = video.currentTime + 2;
            //         capture();
            //     } else {
            //         video.play();
            //         draw();
            //     }
            // },
            //
            // drawOld = function() {
            //     ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            //
            //     let isDone = false;
            //     while (!isDone) {
            //         isDone = checkClipData();
            //     }
            //
            //     clips.forEach(function(clip) {
            //         if (clip.getIsPlaying(video.currentTime)) {
            //             clip.draw(ctx);
            //         }
            //     });
            //
            //     if (dev.info) {
            //         dev.infoTimeEl.innerHTML = video.currentTime.toFixed(1);
            //     }
            //
            //     requestAnimationFrame(draw);
            // },

            capture = function() {
                if (captureCounter % 30 === 0) {
                    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    video.currentTime += 1 / settings.framerate;

                    let isDone = false;
                    while (!isDone) {
                        isDone = checkClipData();
                    }

                    clips.forEach(function(clip) {
                        if (clip.getIsPlaying(video.currentTime)) {
                            clip.capture(ctx, settings.framerate);
                        }
                    });

                    if (dev.info) {
                        dev.infoTimeEl.innerHTML = video.currentTime.toFixed(1);
                    }

                    socket.emit('render-frame', {
                        frame: frameCounter,
                        file: canvas.toDataURL()
                    });

                    frameCounter++;
                }

                if (video.currentTime < captureEndTime) {
                    captureCounter++;
                    requestAnimationFrame(capture);
                }
            };

            // checkClipDataOld = function() {
            //     let isNothingToStart = true;
            //     if (clipDataIndex < clipData.length && clipData[clipDataIndex].start <= video.currentTime) {
            //         clips[clipIndex].start(clipData[clipDataIndex], settings.isCapture);
            //         clipDataIndex++;
            //         clipIndex = (clipIndex + 1) % numClips;
            //         isNothingToStart = false;
            //     }
            //     return isNothingToStart;
            // };

        that = specs.that || {};

        init();

        return that;
    };

})(WH);
