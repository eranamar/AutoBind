describe("bindSingleInstance test suit:", function () {

    var SpiderClass, AnimalClass;    
    var spider1, spider2;
    var spider1Name = 'spider1', spider2Name = 'spider2';
    
    function initClasses() {
        var classes = buildClassesDefinitions(); 
        SpiderClass = classes.SpiderClass;
        AnimalClass = classes.AnimalClass;
    }    
  
    function initInstances() {            
        spider1 = new SpiderClass(spider1Name);        
        spider2 = new SpiderClass(spider2Name);        
        
        bindSingleInstance(spider1);
    }
    
    describe('already owned properties:', function(){
    
        beforeEach(function(){
            initClasses();
        });        

        it("should NOT change already own methods", function () {                
            var spider = new SpiderClass(spider1Name); 
            spider.ownedMethod = function iDoNothing(){};
            var ownedMethod = spider.ownedMethod;
            bindSingleInstance(spider);
            
            expect(spider.ownedMethod).toBe(ownedMethod);      
        });
        
        it("should return the same instance (for chaining)", function () {                
            var spider = new SpiderClass(spider1Name);  
            var returnValue = bindSingleInstance(spider);;            
            
            expect(returnValue).toBe(spider);      
        });
                
        it("should NOT remove or change existing properties", function () {               
            var spider = new SpiderClass(spider1Name); 
            var originalProperties = _.cloneDeep(spider);
            
            bindSingleInstance(spider);
            
            _.forOwn(originalProperties, function (propValue, propName){
                expect(spider[propName]).toBe(propValue);      
            });            
        });
        
    });
    
    describe('getName method (inherited from Aminel):', function(){
    
        beforeEach(function(){
            initClasses();
            initInstances();
        });

        it("should bound getName method to spider1", function () {                
            expect(spider1.getName.call(spider2)).toBe(spider1Name); // get name should be bount to spider1
            expect(spider2.getName.call(spider1)).toBe(spider1Name); // should be able to borrow Class method              
        });
        
        it("regular behabiour should NOT change", function () {
            expect(spider1.getName()).toBe(spider1Name);
            expect(spider2.getName()).toBe(spider2Name);
        });
        
        it("should NOT impact inheritance of newer instances", function () {
            var spider3 = new SpiderClass('spider3');
            expect(spider3.getName()).toBe('spider3');                
        });
        
        it("should NOT change behaviour of instances from parent class", function () {
            var animal = new AnimalClass('animal');                
            expect(animal.getName).toBe(AnimalClass.prototype.getName);                                
        });            
    });

    describe('getWebsCount method (inherited from Spider):', function(){
        
        function assumeNumberOfSpinWebs(instance, websCount){
            _.times(websCount, function (){
                SpiderClass.prototype.spinWeb.call(instance);
            });
        }
        
        var spider1Webs = 5, spider2Webs = 10;
        
        beforeEach(function (){
            initClasses();
            initInstances();
            assumeNumberOfSpinWebs(spider1, spider1Webs);
            assumeNumberOfSpinWebs(spider2, spider2Webs);
        });

        it("should bound getWebsCount method to spider1", function () {                
            expect(spider1.getWebsCount.call(spider2)).toBe(spider1Webs); // get name should be bount to spider1
            expect(spider2.getWebsCount.call(spider1)).toBe(spider1Webs); // should be able to borrow Class method              
        });
        
        it("should bound spinWeb method to spider1 (case 1)", function () {                    
            spider1.spinWeb.call(spider2); // should increase spider1 counter                
            expect(spider1.getWebsCount()).toBe(spider1Webs + 1);
            expect(spider2.getWebsCount()).toBe(spider2Webs);
        });
        
        it("should bound spinWeb method to spider1 (case 2)", function () {                    
            spider2.spinWeb.call(spider1); // should increase spider1 counter                
            expect(spider1.getWebsCount()).toBe(spider1Webs + 1);
            expect(spider2.getWebsCount()).toBe(spider2Webs);                
        });
                   
        it("regular behabiour should NOT change", function () {
            expect(spider1.getWebsCount()).toBe(spider1Webs);
            expect(spider2.getWebsCount()).toBe(spider2Webs);
        });
    });
});
