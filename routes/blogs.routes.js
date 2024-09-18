const express = require('express');
const router = express.Router();

let blogPosts = [
    {id:1, title: 'blog 1', text: 'text of blog 1', comments: ['a']},
    {id:2, title: 'blog 2', text: 'text of blog 2', comments: ['b']}    
    ];

router.use((req, res, next)=>{
    res.locals.isAuthenticated = isAuthenticated;
    next();
});
let isAuthenticated = false;

router.get('/', (req, res) => {
    console.log(res.locals.isAuthenticated);
    isAuthenticated = res.locals.isAuthenticated;
    // console.log('/ ' + isAuthenticated);
    res.render('pages-blog/blogs', {blogPosts, isAuthenticated: isAuthenticated});
});

router.get('/pages-blog/:id',(req, res)=>{
    const postID = req.params.id;
    const post = blogPosts.find(post=>post.id == postID);
    console.log('pages-blog/:id' + res.locals.isAuthenticated);
    console.log('pages-blog/:id ' + isAuthenticated);
    if(post){
        // res.render(`pages/post${postID}`, {post} );
        res.render(`pages-blog/blog`, {post, isAuthenticated});
    }else{        
        res.status(404);
    }
})

router.get('/login', (req, res)=>{
    res.render('pages-blog/login');
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    if(username == 'a' && password == 'a'){
        isAuthenticated = true;
        res.locals.isAuthenticated = isAuthenticated;        
        res.redirect('/blogs')
        // res.render('pages-blog/blogs', {blogPosts, isAuthenticated});
    }else{
        res.render('failure');
    }    
});

router.get('/logout', (req, res)=>{
    isAuthenticated = false;
    res.redirect('/blogs');
})

router.post('/comment/:id', (req, res)=>{
    const postId = req.params.id;
    console.log(postId);
    
    const post  = blogPosts.find(post=>post.id==postId)

    if(!isAuthenticated){
        // return res.status(404).send({"msg":"404"});
        return res.redirect('/blogs/login');
    }
    if(post){
        post.comments.push(req.body.comment);
        return res.redirect(`/blogs/pages-blog/${postId}`);
    }else{
        res.redirect('/blogs');
    }
})

router.post('/add', (req, res) => {
    const {task} = req.body;
    tasks.push(task);
    res.redirect('/todo');
});

module.exports = router;