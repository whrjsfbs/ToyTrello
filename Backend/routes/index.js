const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ why: 'this is temp page' })
});

module.exports = router;