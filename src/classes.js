'use strict';
function buildClassesDefinitions() {
    
    var AnimalClass = getAnimalDefinition(); 
    
    // =========================================================
    
    // Your implementation here.    
    
    // =========================================================
    
    return {
        AnimalClass: AnimalClass,
        SpiderClass: SpiderClass        
    };
}

window.buildClassesDefinitions = buildClassesDefinitions;