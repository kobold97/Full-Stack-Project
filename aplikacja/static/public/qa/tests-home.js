describe('Main page test suite', function(){
    it('should have ul with tiles', function(){
        assert(document.querySelectorAll('ul.tiles').length);
    });
});