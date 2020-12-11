const express = require('express')
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { getDB } = require('../mongodb/mongo_common');
const { insertUser, isLogined } = require('../mongodb/mongo_users');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8081/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("[profile]")
    if(accessToken)
        profile.accessToken = accessToken;
    if(refreshToken)
        profile.refreshToken = refreshToken;
    
    try {
        await isLogined(getDB(), profile.emails[0].value);
        await insertUser(
            getDB(), 
            {
                id: profile.emails[0].value,
                createFrom: "google",
            }
        );
    } catch (err) {
        console.log(err);
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
        failureRedirect: process.env.FRONTEND_DOMAIN,
        successRedirect: process.env.FRONTEND_DOMAIN
    })
);

router.get('/logout', (req, res) => {
    console.log("[logout]: " + req.user.displayName)
    req.logout();
    req.session.destroy((err) => {
        res.redirect(process.env.FRONTEND_DOMAIN);
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