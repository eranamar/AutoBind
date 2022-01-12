'use strict';
(function (window) {    
         
    function autoBind(ctorFunc){
        // Your implementation here! (note that you should return a ctor function, and assume it always will be invoked with "new")
        // Remark: don't assume anything about the methods of that constructor, it might have override built-in methods.        
        // Remark 2: for testing purpose, use "window.bindSingleInstance" instead of "bindSingleInstance"
    }

    window.autoBind = autoBind;

})(window);