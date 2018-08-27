describe('Global Tests', function(){
    it('Should have a valid title', function(){
        assert(document.title && document.title.match(/\S/) &&
    document.title.toUpperCase() !== 'TODO');
    });
});
