var WH = WH || {};

(function(WH) {
    
    let clipData = {
        timing: 'music', // 'music|seconds'
        ppqn: 24,
        bpm: 120,
        timesignature: {
            numerator: 4,
            denominator: 4
        },
        clips = []
    };
    
    clipData.clips = clipData.clips.concat([{
        start: '0:0:0', end: '0:1:0',
        clipStart: '24:0:0',
        x: 0, xx: 100,
        y: 200, yy: 360
    }];
    
    WH.clipData = clipData;

})(WH);