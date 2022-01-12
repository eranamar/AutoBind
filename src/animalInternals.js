'use strict';
function getAnimalDefinition() {
    
    // ============= DON'T CHANGE THIS FILE! =================
    
    var idsCollection = {};
    var firstId = _.random(8, 30);
    
    function instanceToKey(instance){
        return instance.name + instance.numOfWebs + instance.numOfArguments;
    }
    
    function getUniqueId(instance){        
        return idsCollection[instanceToKey(instance)];
    }
    
    function addToIdsCollection(instance){        
        var newId = _.size(idsCollection) + firstId;
        idsCollection[instanceToKey(instance)] = newId;  
    }
    
    function AnimalClass(name){        
        this.name = name;  
        this.numOfWebs = 0;        
        this.numOfArguments = arguments.length; // used for tester!      
        addToIdsCollection(this); 
    }
    
    AnimalClass.bind = function (){
        throw new Error("A wild animal can't be tamed!");
    };
    
    AnimalClass.prototype = {
        getName: function (){
            return this.name;
        },
        getWebsCount: function () {
            return this.numOfWebs;
        },
        hasOwnProperty: function () {
            return true;
        },
        getNumOfArguments: function () {
            return this.numOfArguments;
        },
        getId: function (){
            return getUniqueId(this);
        }
    }
    
    return AnimalClass;
}

window.getAnimalDefinition = getAnimalDefinition;