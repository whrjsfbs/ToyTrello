const express = require('express')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport');
const MongoStore = require('connect-mongo')(session)

const indexRouter = require('./routes/index')
const googleRouter = require('./routes/google')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

app.use(cookieParser())

app.use(session({ 
    secret: 'abcdefg', 
    resave: true, 
    saveUninitialized: false,
    store: new MongoStore({ 
        url: "mongodb://mydb:1234@127.0.0.1:27017/myDB",
        mongoOptions: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
        }
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/google', googleRouter);

app.listen(8081, () => {
    console.log(`서버가 구동되었습니다. localhost:8081`);
});