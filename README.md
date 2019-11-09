# Video Edit

JavaScript to render video fragments on a canvas element. 

Video files must first be converted to PNG image sequences, as I found that JavaScript handles image sequences much faster than video files. Additionally by using images it's possible to use a flag in the code to throttle the frame rate. Set thottling as an argument of createPlayer in main.js:

```javascript
createPlayer({
  throttle: 4,
});
```

To create a final video files the app generates a PNG image sequence in a directory 'tmp' within the installation directory. This is done with a Node.js Express app that opens a socket connection to receive the image data. Please see the file server.js. Capture is enabled as an argument of createPlayer in main.js:

```javascript
createPlayer({
  isCapture: true,
});
```

## Installation


As usual, clone the repo and:

```bash
yarn install
yarn start
```

The app will be available at http://localhost:3000

## Note on using the app

Please note that this is in no way a ready to use application. I use this as a collection of files that I adjust to my needs for a current video project that I work on.

Also I don't think I will further develop this project. I've now moved to a new project [video-edit-3d](https://github.com/hisschemoller/video-edit-3d) where I combine these video scripts with WebGL 3D scenes using three.js. Follow the link to that project's repository here on GitHub.

## Videos made with this app

[Weesperplein](https://youtu.be/qBblh8aPP38)

[Berliner Dom](https://youtu.be/E3PbfHYp2gE)

[Three Day Walk](https://youtu.be/cnD8Nd36EC0)

## FFMPEG

FFMPEG is a convenient command line tool to transfer between video and image sequences, and too add audio to video files.

Convert AVI to MP4:

```
ffmpeg -i input.avi -c:v libx264 -crf 19 -preset slow -c:a aac -b:a 192k -ac 2 output.mp4
```

Convert AVI to PNG image sequence.
'%05d' generates a zero padded five digit integer.

```
ffmpeg -i input.avi output_%05d.png
```

Convert PNG image sequence to MP4.

```
ffmpeg -framerate 30 -i tmp/frame_%05d.png -c:v libx264 -crf 19 -preset slow -c:a aac -b:a 192k -ac 2 output.mp4
```
Convert PNG image sequence to MP4. This one works in Quicktime.

```
ffmpeg -framerate 30 -i tmp/frame_%05d.png -f mp4 -vcodec libx264 -pix_fmt yuv420p output.mp4
```

Convert MP4 to MOV.

```
ffmpeg -i input.mp4 -acodec copy -vcodec copy -f mov output.mov
```

Crop video with the crop filter.
out_w and out_h are width and height of the output rectangle.
out_x and out_y are the left top corner of the output rectangle.

```
ffmpeg -i input.avi -filter:v "crop=out_w:out_h:out_x:out_y" output.avi
```

Extract a time slice of an original video.
-ss is the start time,
-t is the slice duration.
Timestamps are in HH:MM:SS.xxx format or in seconds (s.msec).

```
ffmpeg -ss 00:00:30.0 -i input.avi -c copy -t 00:00:10.0 output.avi
ffmpeg -ss 30 -i input.avi -c copy -t 10 output.avi
```

Extract sound from video to wav.

```
ffmpeg -i input.mp4 -vn -acodec pcm_s16le -ar 44100 -ac 2 output.wav
```

Add wav audio to mp4 video

```
ffmpeg -i input_vid.mp4 -i input_audio.wav -vcodec copy output.mp4
ffmpeg -i input_vid.mp4 -i input_audio.wav -vcodec libx264 -acodec libmp3lame output.mp4
```

### Tags
three-day-walk, berliner-dom, weesperplein
