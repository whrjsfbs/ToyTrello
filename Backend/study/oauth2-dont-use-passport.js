const express = require('express')
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
});

app.get('/login', (req, res) => {
    res.json({
        "clientID": "320795379479-l50fq88porptr2gp7klcd7hm5agbunm6.apps.googleusercontent.com",
        "redirectURI": "http://localhost:8081/login/google/callback"
    })
})

app.get('/login/google/callback', (req, res) => {
    console.log(req.query)
    axios
      .post("https://accounts.google.com/o/oauth2/token", {
        code: req.query.code,
        client_id: "320795379479-l50fq88porptr2gp7klcd7hm5agbunm6.apps.googleusercontent.com",
        client_secret: "Gik3dKunrWbyVTu6VWiaROgz",
        redirect_uri: "http://localhost:8081/login/google/callback",
        grant_type: "authorization_code"
      })
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      })
    res.json({"status": "success"})
});