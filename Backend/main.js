const express = require('express')
const app = express()
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const cookieParser = require('cookie-parser')
const passport = require('passport');

const indexRouter = require('./routes/index')
const googleRouter = require('./routes/google')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

app.use(cookieParser())

app.use(session({ 
    secret: 'abcdefg', 
    resave: true, 
    saveUninitialized: false, 
    store: new fileStore() 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/google', googleRouter);

app.get('/test', (req, res) => {
    console.log(req.cookies);
    res.send("test get")
})

app.post('/test', (req, res) => {
    console.log(req.cookies);
    res.send("test post")
})

app.listen(8081, () => {
    console.log(`서버가 구동되었습니다. localhost:8081`);
});