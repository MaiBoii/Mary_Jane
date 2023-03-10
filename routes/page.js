const express = require('express');
const {isLoggedIn, isNotLoggedIn } = require('./logged');
const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    next();
});

router.get('/', (req, res, next)=> {
    res.render('home');
});

router.get('/error', (req, res)=>{
    res.render('error');
});

module.exports = router;