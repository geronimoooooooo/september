const express = require('express');
const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {    
    console.log('some form');    
    res.render('form', );  
})

router.post('/submit', (req, res) => {
    const {username, password} = req.body;
    console.log(password);
    // res.redirect('/form');

    if(username==='a' && password==='a'){
        res.render('form', {isAuthenticated:true});
    } else{
        res.render('form', {isAuthenticated:false});
    }
    
});

module.exports = router;