var WH = WH || {};

(function(WH) {
    
    WH.createResources = function(specs, my) {
        let that,
            data = specs.data,
            resources = {},
            numToLoad = data.length,
            
            init = function() {
                let resource, resourceData;
                for (let i = 0, n = data.length; i < n; i++) {
                    resourceData = data[i];
                    resource = {};
                    resource.video = document.createElement('video');
                    resource.video.src = resourceData.url;
                    resource.video.addEventListener('loadeddata', onVideoLoaded);
                    resources[resourceData.id] = resource;
                }
            },
            
            onVideoLoaded = function() {
                numToLoad--;
                if (numToLoad === 0) {
                    specs.loadedCallback();
                }
            };
        
        that = specs.that || {};
        
        init();
        
        return that;
    };

})(WH);

            