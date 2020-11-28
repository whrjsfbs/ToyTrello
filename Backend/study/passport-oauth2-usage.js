const express = require('express')
const session = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;

const app = express();

app.use(session({ secret: 'Gik3dKunrWbyVTu6VWiaROgz', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

passport.use(new OAuth2Strategy({
    authorizationURL: "https://accounts.google.com/o/oauth2/auth",
    tokenURL: "https://accounts.google.com/o/oauth2/token",
    clientID: "320795379479-l50fq88porptr2gp7klcd7hm5agbunm6.apps.googleusercontent.com",
    clientSecret: "Gik3dKunrWbyVTu6VWiaROgz",
    callbackURL: "http://localhost:8081/login/google/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log("[profile]")
    console.log(profile)    // came empty object
    console.log("[access token]: " + accessToken);
    console.log("[refresh token]: " + refreshToken);
    return cb(null, profile);
  }
));

passport.serializeUser((user, done) => {
    console.log("[serializeUser]")
    console.log(user)
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log("[deserializeUser]")
    console.log(user)
    done(null, user);
});

const authenticateUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(301).redirect('/login');
    }
};

app.get('/', authenticateUser, (req, res, next) => {
    res.json({"status": "index"})
});
app.get('/login', (req, res, next)  => {
    res.json({"status": "success"})
});
app.get('/login/google', 
    passport.authenticate('oauth2', { scope: ['profile'] })
);
app.get('/login/google/callback',
    passport.authenticate('oauth2', {
        failureRedirect: 'http://localhost:8080/',
        successRedirect: 'http://localhost:8080/'
    })
);

app.listen(8081, () => {
    console.log(`서버가 구동되었습니다. localhost:8081`);
});