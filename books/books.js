// Start mongo service: brew services start mongodb-community

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./Book');
const Book = mongoose.model('Book');

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/books?gssapiServiceName=mongodb', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected...');
});

// Landing
app.get('/', (req, res) => {
    res.send("Main something else");
});

app.get('/books', (req, res) => {

    Book.find().then((books) => {
        res.json(books);
    }).catch((err) => {
        if(err) {
            throw err;
        }
    });

});

app.delete('/books/:id', (req, res) => {
    Book.findByIdAndRemove(req.params.id).then(() => {
        res.send('Book removed');
    }).catch(err => {
        if(err) {
            throw err;
        }
    })
});

app.get('/books/:id', (req, res) => {
    Book.findById(req.params.id).then(book => {
        if (book) {
            // Book data
            res.json(book);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

// Create
app.post('/books', (req, res) => {

    let newBook = {
        title: req.body.title,
        author: req.body.author,
        pagesNumber: req.body.pagesNumber,
        publisher: req.body.publisher
    };

    // Create a new Book
    let book = new Book(newBook);

    book.save().then(() => {
        console.log('New book created!');
    }).catch((err) => {
        if (err) {
            throw err;
        }
    });

    res.send('A new book created!');
});




app.listen(8080, () => {
    console.log("Book service is up and running");
});





