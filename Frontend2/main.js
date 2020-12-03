const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const axios = require("axios")

app.use(cookieParser())

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send(`
        <div>
            <a href="http://localhost:8081/google/login">로그인</a>
            <br />
            <button onClick={getTest}>axios_GET</button>
            <br />
            <button onClick={postTest}>axios_POST</button>
            <br />
            <a href="http://localhost:8081/test">a_GET</a>
            <br />
            <form id="myfrom" method="get" action="http://localhost:8081/test">
                <input type="submit" value="form_GET" />
            </form>
            <br />
            <form id="myfrom" method="post" action="http://localhost:8081/test">
                <input type="submit" value="form_POST" />
            </form>
        </div>
    `)
})

app.post('/', (req, res) => {
    console.log(req.cookies);
    res.send(`
        <div>
            <a href="http://localhost:8081/google/login">로그인</a>
            <br />
            <button onClick={getTest}>axios_GET</button>
            <br />
            <button onClick={postTest}>axios_POST</button>
            <br />
            <a href="http://localhost:8081/test">a_GET</a>
            <br />
            <form id="myfrom" method="get" action="http://localhost:8081/test">
                <input type="submit" value="form_GET" />
            </form>
            <br />
            <form id="myfrom" method="post" action="http://localhost:8081/test">
                <input type="submit" value="form_POST" />
            </form>
        </div>
    `)
})

app.get('/get', (req, res) => {
    console.log(req.cookies);
    axios.get("http://localhost:8080/getTest").then((result) => {
      console.log(result);
    });
    res.send('result')
})

app.get('/getTest', (req, res) => {
    console.log(req.cookies);
    res = { result: 123 };
})

app.get('/post', (req, res) => {
    console.log(req.cookies);
    axios.post("http://localhost:8081/test").then((result) => {
      console.log(result);
    });
    res.send('result')
})

app.listen(8080, () => {
    console.log(`서버가 구동되었습니다. localhost:8080`);
});