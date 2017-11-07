var WH = WH || {};

(function(WH) {

    WH.createClips = function(specs = {}, my = {}) {

        let that,
            numClips = 8,
            clips = [],
            
            init = function() {
                for (var i = 0; i < numClips; i++) {
                    clips.push(WH.createClip());
                }
            };
        
        that = specs.that || {};
        
        init();
        
        return that;
    };

})(WH);