const express = require('express');
const router = express.Router();

let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'}
]


// Get all posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        res.status(200).json(posts.slice(0, limit));
    } else {
        res.status(200).json(posts);
    }
}); 

// Get single post
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const selectedPost = posts.find(post => post.id === id);

    if (!selectedPost) {
        res.status(404).send(`<h1>404 NOT FOUND WITH ID ${id}</h1>`);
    } else {
        res.status(200).json(selectedPost);
    }
});

// create new posts
router.post('/', (req, res) => {
    const title = req.body.title;
    if (!title) {
        res.status(400).json({ msg: "Please include a title" });
    }

    posts.push({
        id: posts.length + 1,
        title: title
    })

    res.status(201).json({ msg: "Successfully added post!"});
})


module.exports = router