'use strict';
(function (window) {  

    // here you can put additional functions.
  
    function bindSingleInstance(instanceObj) {               
        // Your implementation here!
        // For each inherited function that this instanceObj has: careate a bounded version of that function and 
        //          attach it back to the instanceObj shadowing the original method.
        // Remark: don't assume anything about the methods' names, that object might overrided built-in methods.
    }   

    window.bindSingleInstance = bindSingleInstance;

})(window);