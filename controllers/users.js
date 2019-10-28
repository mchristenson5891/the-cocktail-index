const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    req.session.username = req.body.username;
    req.session.logged = true;
    console.log(req.session)
    res.redirect('/bartenders'); 
})


module.exports = router;
