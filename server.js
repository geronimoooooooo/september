//import express from 'express'
const express = require('express');
const path = require('path');
const routesTodo = require('./routes/todo.routes.js');
const routesFormSuccessFailure = require('./routes/form.routes.js');
const routesBlog = require('./routes/blogs.routes.js');

const app = express();

// const hostname = '127.0.0.1';
const port = process.env.PORT || 1337

// Middleware to parse JSON

app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');
// Set the 'views' folder as the root for EJS templates
app.set('views', path.join(__dirname, 'views')); // assuming 'views' is in the project root

app.use('/todo', routesTodo);
app.use('/form', routesFormSuccessFailure);
app.use('/blogs', routesBlog);

app.get('/' , (req , res)=>{
   res.send('hello from simple server :)')
})

app.listen(port, ()=>{    
    console.log(`browse this url http://localhost:${port}`)
});
