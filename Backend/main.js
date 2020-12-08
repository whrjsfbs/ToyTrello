require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
require('./mongodb/mongo_common');

const indexRouter = require('./routes/index');
const googleRouter = require('./routes/google');
const mongoRouter = require('./routes/mongo');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

app.use(cookieParser());
app.use(express.json());

app.use(session({ 
    secret: 'abcdefg', 
    resave: false, 
    saveUninitialized: true,
    store: new MongoStore({ 
        url: process.env.MONGO_URL,
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
app.use('/mongo', mongoRouter);

app.get('/test', (req, res) => {
    console.log(req.session);
    req.session.num = req.session.num + 1;
    req.session.cookie.expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    res.send({ test: "test" });
})

app.listen(8081, () => {
    console.log(`서버가 구동되었습니다. localhost:8081`);
});