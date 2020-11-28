const express = require('express')
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "320795379479-l50fq88porptr2gp7klcd7hm5agbunm6.apps.googleusercontent.com",
    clientSecret: "Gik3dKunrWbyVTu6VWiaROgz",
    callbackURL: "http://localhost:8081/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log("[profile]")
    console.log(profile)
    console.log("[access token]: " + accessToken);
    console.log("[refresh token]: " + refreshToken);
    if(accessToken)
        profile.accessToken = accessToken
    if(refreshToken)
        profile.refreshToken = refreshToken
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
    // req.session.save(() => {
    //     res.redirect('http://localhost:8080/');
    // });
});

module.exports = router;