var WH = WH || {};

(function(WH) {

    let bpm,
        ppqn,
        numerator,
        denominator,

        setTiming = function (settings) {
            bpm = settings.bpm;
            ppqn = settings.ppqn;
            numerator = settings.timesignature.numerator;
            denominator = settings.timesignature.denominator;
        },

        musicToTime = function(music, numerator, denominator, bpm, ppqn) {

        },

        timeToMusic = function() {

        };

    WH.util = {
        setTiming: setTiming,
        musicToTime: musicToTime,
        timeToMusic: timeToMusic
    };

})(WH);
