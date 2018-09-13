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

var js = require('./routes/js');
var main = require('./routes/main');

app.use(function(req, res, next){
    if(!res.locals.partials);
    res.locals.partials = {};
    res.locals.partials.time = (new Date()).toString();
    next();
});

app.use(function(req, res, next){
    res.locals.showTests = app.get('env') !== 'production' &&
    req.query.test === '1';
    next();
});

app.use('/js', js);
app.use('/', main);

app.use(express.urlencoded({extended: false}));

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/svg-converter', function(req, res){
    res.render('svg-converter-interface');
});

var formidable = require('formidable');
var fs = require('fs');

app.post('/xd', function(req, res){
    function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
        });
    }
    



    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        fs.readFile( files.svg.path, function(err, data){
            console.log(files.svg.path);
        data = 'data:image/svg+xml;utf8;base64,' + String(Buffer.from(b64EncodeUnicode(data)).toString('base64'));
        res.render('download', {data: data});
    });
});
});

app.post('/process', function(req, res){
    console.log('Form (from querystring): ' + req.query.form);
    console.log('CSRF token (from hidden form field): ' + req.body._csrf);
    console.log('Name (from visible form field): ' + req.body.name);
    console.log('Email (from visible form field): ' + req.body.email);
    res.redirect(303, '/thank-you');
});

app.get('/newsletter', function(req, res){
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' });
   });



app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
    year: now.getFullYear(),month: now.getMonth()
    });
});

app.listen(3000);

