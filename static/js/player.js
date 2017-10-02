var WH = WH || {};

(function(WH) {

    WH.createPlayer = function(specs = {}, my = {}) {
        let that,
            video,
            canvas,
            ctx,
            clipDataIndex = 0,
            clipIndex = 0;


        const clipData = WH.clipData,
            dev = {
                info: true,
                infoTimeEl: document.querySelector('.info__time'),
                startOffset: 0
            },
            clips = [],
            fileURL = 'static/video/weesperplein_2017-07-21-mvi_0535.mp4',
            startOffset = 12,
            width = 640,
            height = 360,
            numClips = 8,

            init = function() {
                canvas = document.getElementById('canvas');
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');

                video = document.createElement('video');
                video.src = fileURL;
                video.addEventListener('loadeddata', onVideoLoaded);

                clipData.forEach(function(data) {
                    data.start += startOffset;
                    data.end += startOffset;
                    data.clipStart += startOffset;
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

                video.currentTime = startOffset;

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

                video.play();
                draw();
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

            checkClipData = function() {
                let isNothingToStart = true;
                if (clipDataIndex < clipData.length && clipData[clipDataIndex].start <= video.currentTime) {
                    clips[clipIndex].start(clipData[clipDataIndex]);
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
