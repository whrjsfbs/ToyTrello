const express = require('express')
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getDB } = require('../mongodb/mongo_common');
const { insertUser } = require('../mongodb/mongo_users');

passport.use(new GoogleStrategy({
    clientID: "320795379479-l50fq88porptr2gp7klcd7hm5agbunm6.apps.googleusercontent.com",
    clientSecret: "Gik3dKunrWbyVTu6VWiaROgz",
    callbackURL: "http://localhost:8081/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("[profile]")
    if(accessToken)
        profile.accessToken = accessToken;
    if(refreshToken)
        profile.refreshToken = refreshToken;
    
    try {
        await insertUser(
            getDB(), 
            {
                id: profile.emails[0].value,
                createFrom: "google",
            }
        );
    } catch (err) {
        // 이미 등록된 사용자일 경우도 있음 해당 err는 err가 아님
        // if(err.error === UNDONE_LIST)
        //      undone
    }

    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
    console.log("[serializeUser]")
    done(null, user);
});
passport.deserializeUser((user, done) => {
    console.log("[deserializeUser]")
    done(null, user);
});

router.get('/login', 
    passport.authenticate('google', { 
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'openid',
            'https://www.googleapis.com/auth/userinfo.profile'
        ] 
    })
);

router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:8080/',
        successRedirect: 'http://localhost:8080/'
    })
);

router.get('/logout', (req, res) => {
    console.log("[logout]: " + req.user.displayName)
    req.logout();
    req.session.destroy((err) => {
        res.redirect('http://localhost:8080/');
    });
});

router.get('/user-info', (req, res) => {
    console.log(req.headers.origin);
    if(!req.user || ( req.user != null && typeof req.user == "object" && !Object.keys(req.user).length ))
        res.status(401)
    else
        res.status(200).send(req.user._raw)
})

module.exports = router;