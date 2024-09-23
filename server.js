//import express from 'express'
const express = require('express');
const path = require('path');
const session = require('express-session');
const routesTodo = require('./routes/todo.routes.js');
const routesFormSuccessFailure = require('./routes/form.routes.js');
const routesBlog = require('./routes/blogs.routes.js');

const app = express();

// const hostname = '127.0.0.1';
const port = process.env.PORT || 1337

// Initialize the session middleware
app.use(session({
    secret: 'yourSecretKey', // Replace with your own secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

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

console.log(new Date().toISOString() + ", "+Date.now());


app.get('/*bc*/', (req, res)=>{
    res.send('/bc/ called');
});
app.listen(port, ()=>{    
    console.log(`browse this url http://localhost:${port}`)
});
