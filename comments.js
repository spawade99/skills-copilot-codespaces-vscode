//create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const comments = [
    {
        id: 1,
        username: 'Alice',
        comment: 'Hello, I am Alice'
    },
    {
        id: 2,
        username: 'Bob',
        comment: 'Hello, I am Bob'
    },
    {
        id: 3,
        username: 'Charlie',
        comment: 'Hello, I am Charlie'
    }
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === parseInt(id, 10));
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Not Found');
    }
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    if (!username || !comment) {
        res.status(400).send('Bad Request');
    } else {
        const id = comments.length + 1;
        comments.push({ id, username, comment });
        res.json({ id, username, comment });
    }
});

app.put('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === parseInt(id, 10));
    if (!comment) {
        res.status(404).send('Not Found');
    } else {
        const { username, comment } = req.body;
        if (!username || !comment) {
            res.status(400).send('Bad Request');
        } else {
            comment.username = username;
            comment.comment = comment;
            res.json(comment);
        }
    }
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === parseInt(id, 10));
    if (index === -1) {
        res.status(404).send('Not Found');
    } else {
        comments.splice(index, 1);
        res.status(204).send('No Content');
    }
});

app.listen(PORT, () =>console.log(`Server is listening on http://localhost:${PORT}`));