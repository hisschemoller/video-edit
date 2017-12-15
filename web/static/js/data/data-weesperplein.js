var WH = WH || {};

(function(WH) {

    const paal1l = 143,
        paal1r = 156,
        paal2l = 229,
        paal2r = 233,
        paal3l = 294,
        paal3r = 296,
        paal4l = 453,
        paal4r = 456,
        paal5l = 508,
        paal5r = 516,
        right = 640;

    let clipData = [],
        sceneStart;

    // 1
    sceneStart = 8.1;
    clipData = clipData.concat([{
            start: sceneStart, end: sceneStart + 25,
            clipStart: 30,
            x: 0,
            y: 200,
            xx: paal1l,
            yy: 360
        },{
            start: sceneStart + 2, end: sceneStart + 40,
            clipStart: 100,
            x: paal3r,
            y: 160,
            xx: paal4l,
            yy: 360
        },{
            start: sceneStart + 15, end: sceneStart + 45,
            clipStart: 300,
            x: paal5r,
            y: 160,
            xx: right,
            yy: 360
        },{
            start: sceneStart + 18, end: sceneStart + 50,
            clipStart: 220,
            x: paal1r,
            y: 120,
            xx: paal2l,
            yy: 360
        },{
            start: sceneStart + 26, end: sceneStart + 51,
            clipStart: 2,
            x: paal4r,
            y: 180,
            xx: paal5l,
            yy: 360
        }]);


    // 2
    sceneStart = 65.5;
    let clipStart = 165;
    clipData = clipData.concat([{
            start: sceneStart, end: sceneStart + 50,
            clipStart: clipStart,
            x: paal1r,
            y: 160,
            xx: paal2l,
            yy: 360
        },{
            start: sceneStart + 1, end: sceneStart + 51,
            clipStart: clipStart + 0.5,
            x: paal2r,
            y: 160,
            xx: paal3l,
            yy: 360
        },{
            start: sceneStart + 2, end: sceneStart + 52,
            clipStart: clipStart + 1,
            x: paal3r,
            y: 160,
            xx: paal4l,
            yy: 360
        },{
            start: sceneStart + 3, end: sceneStart + 53,
            clipStart: clipStart + 1.5,
            x: paal4r,
            y: 160,
            xx: paal5l,
            yy: 360
        }]);

    // 3
    sceneStart = 131.3;
    const size = 90,
        x = (right / 2) - (size * 2),
        y = 360 - (size * 2),
        y0 = y, y1 = y0 + size, y2 = y1 + size,
        x0 = x, x1 = x0 + size, x2 = x1 + size, x3 = x2 + size, x4 = x3 + size,
        clipStart1 = 55, clipStart2 = 290;
    clipData = clipData.concat([{
            start: sceneStart, end: sceneStart + 40,
            clipStart: clipStart1,
            x: x0,
            xx: x1,
            y: y0,
            yy: y1
        },{
            start: sceneStart + 0.5, end: sceneStart + 51,
            clipStart: clipStart2,
            x: x1,
            xx: x2,
            y: y0,
            yy: y1
        },{
            start: sceneStart + 1, end: sceneStart + 52,
            clipStart: clipStart1,
            x: x2,
            xx: x3,
            y: y0,
            yy: y1
        },{
            start: sceneStart + 1.5, end: sceneStart + 53,
            clipStart: clipStart2,
            x: x3,
            xx: x4,
            y: y0,
            yy: y1
        },{
            start: sceneStart + 2, end: sceneStart + 54,
            clipStart: clipStart2,
            x: x0,
            xx: x1,
            y: y1,
            yy: y2
        },{
            start: sceneStart + 2.5, end: sceneStart + 55,
            clipStart: clipStart1,
            x: x1,
            xx: x2,
            y: y1,
            yy: y2
        },{
            start: sceneStart + 3, end: sceneStart + 56,
            clipStart: clipStart2,
            x: x2,
            xx: x3,
            y: y1,
            yy: y2
        },{
            start: sceneStart + 3.5, end: sceneStart + 57,
            clipStart: clipStart1,
            x: x3,
            xx: x4,
            y: y1,
            yy: y2
        }]);

    // 4
    sceneStart = 196.9;
    clipData = clipData.concat([{
            start: sceneStart, end: sceneStart + 50,
            clipStart: 246,
            x: 0,
            xx: right,
            y: 240,
            yy: 250
        },{
            start: sceneStart + 0.5, end: sceneStart + 51,
            clipStart: 180,
            x: 0,
            xx: right,
            y: 300,
            yy: 310
        },{
            start: sceneStart + 1, end: sceneStart + 52,
            clipStart: 24,
            x: 0,
            xx: right,
            y: 270,
            yy: 280
        },{
            start: sceneStart + 1.5, end: sceneStart + 53,
            clipStart: 64,
            x: 0,
            xx: right,
            y: 310,
            yy: 320
        },{
            start: sceneStart + 2, end: sceneStart + 54,
            clipStart: 100,
            x: 0,
            xx: right,
            y: 250,
            yy: 260
        },{
            start: sceneStart + 2.5, end: sceneStart + 55,
            clipStart: 290,
            x: 0,
            xx: right,
            y: 280,
            yy: 290
        },{
            start: sceneStart + 3, end: sceneStart + 56,
            clipStart: 140,
            x: 0,
            xx: right,
            y: 260,
            yy: 270
        },{
            start: sceneStart + 3.5, end: sceneStart + 57,
            clipStart: 320,
            x: 0,
            xx: right,
            y: 290,
            yy: 300
        }]);


    // 5
    sceneStart = 262.6;
    const tram1Start = 46, tram2Start = 285;
    clipData = clipData.concat([{
        start: sceneStart, end: sceneStart + 7,
        clipStart: 157,
        x: 0,
        xx: paal1l,
        y: 160, yy: 360
    },{
        start: sceneStart + 3, end: sceneStart + 10,
        clipStart: 158,
        x: paal2r,
        xx: right,
        y: 160, yy: 360
    },{
        start: sceneStart + 5, end: sceneStart + 12,
        clipStart: 61, // tram1
        x: paal1r,
        xx: paal2l,
        y: 160, yy: 360
    },{
        start: sceneStart + 8, end: sceneStart + 19,
        clipStart: 158,
        x: 0,
        xx: paal1l,
        y: 160, yy: 360
    },{
        start: sceneStart + 10, end: sceneStart + 19,
        clipStart: 291, // tram 2
        x: paal3r,
        xx: paal4l,
        y: 160, yy: 360
    },{
        start: sceneStart + 13, end: sceneStart + 20,
        clipStart: 159, // ambulance
        x: paal5l,
        xx: right,
        y: 160, yy: 360
    },{
        start: sceneStart + 16, end: sceneStart + 33,
        clipStart: 62, // tram1
        x: paal4r,
        xx: paal5l,
        y: 160, yy: 360
    },{
        start: sceneStart + 18, end: sceneStart + 40,
        clipStart: 290.5, // tram 2
        x: paal1r,
        xx: paal2l,
        y: 160, yy: 360
    },{
        start: sceneStart + 20, end: sceneStart + 35,
        clipStart: 60, // tram1
        x: paal2r,
        xx: paal3l,
        y: 160, yy: 360
    },{
        start: sceneStart + 23, end: sceneStart + 30,
        clipStart: 291.5, // tram 2
        x: paal5r,
        xx: right,
        y: 160, yy: 360
    },{
        start: sceneStart + 25, end: sceneStart + 40,
        clipStart: 59, // tram1
        x: 0,
        xx: paal1l,
        y: 160, yy: 360
    },{
        start: sceneStart + 27, end: sceneStart + 41,
        clipStart: 292, // tram 2
        x: paal3r,
        xx: paal4l,
        y: 160, yy: 360
    },{
        start: sceneStart + 30, end: sceneStart + 50,
        clipStart: tram1Start, // tram1
        x: paal5r,
        xx: right,
        y: 160, yy: 360
    },{
        start: sceneStart + 31, end: sceneStart + 51,
        clipStart: tram2Start, // tram 2
        x: paal1r,
        xx: paal2l,
        y: 160, yy: 360
    },{
        start: sceneStart + 31.5, end: sceneStart + 52,
        clipStart: tram1Start + 2, // tram1
        x: paal2r,
        xx: paal3l,
        y: 160, yy: 360
    },{
        start: sceneStart + 32, end: sceneStart + 53,
        clipStart: tram2Start + 1, // tram 2
        x: paal4r,
        xx: paal5l,
        y: 160, yy: 360
    },{
        start: sceneStart + 32.5, end: sceneStart + 54,
        clipStart: tram2Start, // tram2
        x: 0,
        xx: paal1l,
        y: 160, yy: 360
    },{
        start: sceneStart + 33, end: sceneStart + 55,
        clipStart: tram1Start + 6, // tram1
        x: paal3r,
        xx: paal4l,
        y: 160, yy: 360
    }]);


    // 6
    sceneStart = 328.2;
    let width = 30, left = (right / 2) - (width * 4);
    for (let i = 0; i < 8; i++) {
        clipData.push({
                start: sceneStart + (i * 0.5), end: sceneStart + 40 + (Math.random() * 8),
                clipStart: Math.random() * 320,
                x: left + (i * width),
                xx: left + (i * width) + width,
                y: 0, yy: 360
            });
    }

    WH.clipDataWeesperplein = clipData;

})(WH);
