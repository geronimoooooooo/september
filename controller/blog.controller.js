const express = require('express');
const { logger } = require("../logger");

const loginGet = (req, res) => {
    res.render('pages-blog/login');
}

const loginPost = (req, res) =>{    
    const {username, password} = req.body;
    if(username == 'a' && password == 'a'){
        isAuthenticated = true;
        logger.log(isAuthenticated);
        console.log(res.locals.isAuthenticated);
        res.locals.isAuthenticated = isAuthenticated;        
        console.log("a "+res.locals.isAuthenticated);
        
        req.session.isAuthenticated = true;
        // res.redirect('/blogs')
        console.log(`/blogs/pages-blog/${req.session.postId}`);
        
        res.redirect(`/blogs/pages-blog/${req.session.postId}`);
        // res.render('pages-blog/blogs', {blogPosts, isAuthenticated});
    }else{
        res.render('failure');
    }    
}

module.exports = {loginGet, loginPost}