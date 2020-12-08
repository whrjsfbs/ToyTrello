const express = require('express');
const router = express.Router();
const { getDB } = require('../mongodb/mongo_common');
const { insertUser, loginUser, isLogined } = require('../mongodb/mongo_users');
const { 
    USER_ALREADY_LOGINED 
} = require('../mongodb/ERROR_STRING');

router.post('/user', async (req, res) => {
    try {
        let result = await insertUser(getDB(), {
            id: req.body.id, 
            password: req.body.password,
        });
        res.json(result);
    } catch (err) {
        res.status(err.status).json({ error: err.error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const loginCheck = await isLogined(getDB(), req.body.id);
        if(loginCheck.remarks === USER_ALREADY_LOGINED) {
            // TODO 기존 로그인 세션 삭제
            console.log("기존 로그인 세션 삭제");
        }
        const result = await loginUser(getDB(), req.body.id, req.body.password);
        req.session.user = result.user;
        res.json(result);
    }
    catch (err) {           
        res.status(err.status).json({ error: err.error });
    }
})

module.exports = router;