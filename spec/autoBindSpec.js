describe("autoBind test suit:", function () {

    var AnimalClass, AutoBindAnimalClass, SpiderClass;    
    var animal1, animal1Name = 'animal1';
    var bindSingleInstanceSpy;
    
    function initClasses() {
        var classes = buildClassesDefinitions();         
        AnimalClass = classes.AnimalClass;
        SpiderClass = classes.SpiderClass;
    }        

    beforeEach(function(){
        initClasses();
        bindSingleInstanceSpy = spyOn(window, 'bindSingleInstance').and.callThrough();
        AutoBindAnimalClass = autoBind(AnimalClass);
        animal1 = new AutoBindAnimalClass(animal1Name);
        
    });

    it("should still be instance of AnimalClass (after using autoBind)", function () {                            
        expect(animal1 instanceof AnimalClass).toBeTruthy(); 
    });
    
    it("should NOT affect instance creates with original constructor", function () {                            
        var nonBoundInstance = new AnimalClass('free animal');
        expect(nonBoundInstance.getName).toBe(AnimalClass.prototype.getName); 
    });
    
    it("should NOT affect inheritance (spider still inherit methods from original Animal prototype)", function () {                            
        var spider = new SpiderClass('free spider');               
        expect(spider.getName).toBe(AnimalClass.prototype.getName); 
    });
    
    it("should be able to pass arbitrary number of parametes to AnimalClass constructor", function () {                
        animal1 = new AutoBindAnimalClass(animal1Name, 2, 3, 4, 5, 6, 7, 8, 9);
        expect(animal1.getNumOfArguments()).toBe(9); 
    });
    
    it("should bind each new instance of animal with call to 'bindSingleInstance'", function () {                
        bindSingleInstanceSpy.calls.reset()
        var animals = [];
        
        _.times(3, function (i){
            animals.push(new AutoBindAnimalClass('animal_' + i));
        });
        
        var allArgArrays = bindSingleInstanceSpy.calls.allArgs(); // array of arguments for each call
        var firstArgInEachCall = _.map(allArgArrays, _.first);
        expect(firstArgInEachCall).toEqual(animals); 
    });

    
});
