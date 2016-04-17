// https://github.com/gsouf/photon/commit/0313cccd6d505117730199210fd59bd76817b807
var photon = (function(){

    var photon = {};

    photon.start = function(section){

        section = section || document;

        // helper to iterate over selector
        var _foreachElement = function(selector, callback){
            var nodeList = section.querySelectorAll(selector);
            Array.prototype.forEach.call(nodeList, function (item) {
                callback(item);
            })
        };

        var remoteWindow = require('remote').getCurrentWindow();

        // Close window
        _foreachElement("[action-close-window]", function(item){
            item.addEventListener("click", function(){
                remoteWindow.close();
            });
        });

        // Minimize window
        _foreachElement("[action-minimize-window]", function(item){
            item.addEventListener("click", function(){
                remoteWindow.minimize();
            });
        });

        // (un)Maximize window
        _foreachElement("[action-maximize-window]", function(item){
            item.addEventListener("click", function(){
                if (remoteWindow.isMaximized()) {
                    remoteWindow.unmaximize();
                } else {
                    remoteWindow.maximize();
                }
            });
        });


    };

    return photon;

})();