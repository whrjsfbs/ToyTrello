const express = require('express');
const router = express.Router();
const { getDB } = require('../mongodb/mongo_common');
const { insertUser, loginUser, isLogined } = require('../mongodb/mongo_users');

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
        //로그인을 성공한 이후에 기존 세션을 확인하여 삭제함
        const result = await loginUser(getDB(), req.body.id, req.body.password);
        await isLogined(getDB(), req.body.id);
        req.session.user = result.user;
        res.json(result);
    }
    catch (err) {     
        console.log("come?");      
        res.status(err.status).json({ error: err.error });
    }
})

module.exports = router;