const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('../'));

let posts = [];

app.get('/posts', (req, res) => res.json(posts));

app.post('/posts', (req, res) => {
    const post = {
        id: Date.now(),
        content: req.body.content,
        likes: 0,
        comments: []
    };
    posts.unshift(post);
    res.json(post);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
