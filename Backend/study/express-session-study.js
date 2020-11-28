var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
  
var app = express()
  
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store:new FileStore()
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

app.get('/', (req, res, next) => {
    console.log(req.session.id)
    if(!req.session.num)
        req.session.num = 1;
    else
        req.session.num++;
    res.send(`Views: ${req.session.num}`)
})
 
app.get('/test', (req, res, next) => {
    if(!req.session.num)
        req.session.num = 1;
    else
        req.session.num++;
    res.redirect("http://localhost:3000")
})

app.listen(3000, function(){
    console.log('3000!');
});