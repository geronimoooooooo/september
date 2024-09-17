const express = require('express');
const router = express.Router();

let tasks= [];

router.get('/', (req, res) => {    
    console.log("some test");    
    res.render('todo', {tasks:tasks, date: new Date()});  
})

router.post('/add', (req, res) => {
    const {task} = req.body;
    tasks.push(task);
    res.redirect('/todo');
});

module.exports = router;

