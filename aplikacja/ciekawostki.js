var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
    section: function(name, options){
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
    }}});
    
app.engine('handlebars',  handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/static/public'));

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
   });

app.use(function(req, res, next){
    if(!res.locals.partials);
    res.locals.partials = {};
    res.locals.partials.time = (new Date()).toString();
    next();
});

app.use(express.urlencoded({extended: false}));

app.get('', function(req, res){
    res.render('home', {
        pageTestScript: '/qa/tests-home.js'
    });
});

app.get('/js', function(req, res){
    res.render('js', {
        pageTestScript: '/qa/tests-js.js'
    });
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/newsletter', function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' });
   });

app.post('/process', function(req, res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/thank-you');
});

app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
    year: now.getFullYear(),month: now.getMonth()
    });
});

var formidable = require('formidable');

app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
    if(err) return res.redirect(303, '/error');
    console.log('received fields:');
    console.log(fields);
    console.log('received files:');
    console.log(files);
    res.redirect(303, '/thank-you');
    });
   });
   

app.listen(3000);

