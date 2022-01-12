describe("SpiderClass test suit:", function () {
    
    var AnimalClass, SpiderClass;
    var spider, spiderName = 'spider';
    var animal, animalName = 'animal';
    
    function initClasses() {
        var classes = buildClassesDefinitions(); 
        SpiderClass = classes.SpiderClass;
        AnimalClass = classes.AnimalClass;
    }    
    
    beforeEach(function(){
        initClasses();
        spider = new SpiderClass(spiderName);
    });        

    it("should inherit from AnimalClass", function () {                
        expect(spider instanceof AnimalClass).toBeTruthy();              
    });
    
    it("should have different prototype object than AnimalClass.prototype", function () {                
        expect(SpiderClass.prototype).not.toBe(AnimalClass.prototype);              
    });    
    
    it("should have spinWeb method on the prototype", function () {                                
        expect(spider.getWebsCount()).toBe(0);
        SpiderClass.prototype.spinWeb.call(spider);
        expect(spider.getWebsCount()).toBe(1);
    });
    
    
    it("getIdSquared: should return the square of the id", function () {                                        
        var id = AnimalClass.prototype.getId.call(spider);
        var result = spider.getIdSquared();
        expect(result).toBe(Math.pow(id, 2));
        
    });
    
    it("should have getIdSquared method on the prototype", function () {                                
        var spy = spyOn(SpiderClass.prototype, 'getIdSquared').and.callThrough();        
        expect(spy.calls.count()).toBe(0);
        spider.getIdSquared();
        expect(spy.calls.count()).toBe(1);        
    });

});
