var WH = WH || {};

(function(WH) {

    WH.createPlayer = function(specs = {}, my = {}) {
        let that,
            video,
            canvas,
            ctx,
            data,
            clipData,
            clipDataIndex = 0,
            clipIndex = 0,
            captureCounter,
            captureEndTime,
            frameCounter,
            socket,
            settings = {
                videoPath: null,
                clipData: null,
                framerate: 30,
                canvasHeight: 360,
                canvasWidth: 480,
                startOffset: 0,
                isCapture: false
            };
            
        const dev = {
                info: true,
                infoTimeEl: document.querySelector('.info__time'),
                startOffset: 0
            },
            clips = [],
            numClips = 8,

            init = function() {
                data = WH.createData({
                    dataObject: WH.dataBerlinerDom
                });
            },
                
            setup = function() {
                console.log('setup');
                return;
                
                settings = Object.assign(settings, specs);
                
                canvas = document.getElementById('canvas');
                canvas.width = settings.canvasWidth;
                canvas.height = settings.canvasHeight;
                ctx = canvas.getContext('2d');

                video = document.createElement('video');
                video.src = settings.videoPath;
                video.addEventListener('loadeddata', onVideoLoaded);
                
                clipData = settings.clipData;
                clipData.forEach(function(data) {
                    data.start += settings.startOffset;
                    data.end += settings.startOffset;
                    data.clipStart += settings.startOffset;
                    data.width = data.xx - data.x;
                    data.height = data.yy - data.y;
                });
            },

            onVideoLoaded = function() {
                // create clips to play video fragments
                for (let i = 0; i < numClips; i++) {
                    clips.push(WH.createClip({
                        video: video.cloneNode()
                    }));
                }

                video.currentTime = settings.startOffset;

                // start later in the video (while developing)
                if (dev.startOffset > 0) {
                    video.currentTime += dev.startOffset;

                    // adjust the clipDataIndex to skip clips
                    let isAllSkipped = true;
                    for (let i = 0, n = clipData.length; i < n; i++) {
                        console.log(clipData[i].start, video.currentTime);
                        clipDataIndex = i;
                        if (clipData[i].start >= video.currentTime) {
                            isAllSkipped = false;
                            break;
                        }
                    }

                    // if all clips skipped
                    if (isAllSkipped && clipData.length > 0) {
                        clipDataIndex = clipData.length;
                    }
                }

                if (settings.isCapture === true) {
                    socket = io.connect('http://localhost:3000');
                    frameCounter = 0;
                    captureCounter = 0;
                    captureEndTime = video.currentTime + 2;
                    capture();
                } else {
                    video.play();
                    draw();
                }
            },

            draw = function() {
                ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

                let isDone = false;
                while (!isDone) {
                    isDone = checkClipData();
                }

                clips.forEach(function(clip) {
                    if (clip.getIsPlaying(video.currentTime)) {
                        clip.draw(ctx);
                    }
                });

                if (dev.info) {
                    dev.infoTimeEl.innerHTML = video.currentTime.toFixed(1);
                }

                requestAnimationFrame(draw);
            },
            
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
            },

            checkClipData = function() {
                let isNothingToStart = true;
                if (clipDataIndex < clipData.length && clipData[clipDataIndex].start <= video.currentTime) {
                    clips[clipIndex].start(clipData[clipDataIndex], settings.isCapture);
                    clipDataIndex++;
                    clipIndex = (clipIndex + 1) % numClips;
                    isNothingToStart = false;
                }
                return isNothingToStart;
            };

        that = specs.that || {};

        init();

        return that;
    };

})(WH);
