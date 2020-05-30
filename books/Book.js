const mongoose = require('mongoose');

// Model: Reference to a collection in Mongo.
mongoose.model('Book', {
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    pagesNumber: {
        type: Number,
        require: false
    },
    publisher: {
        type: String,
        require: false
    }
});






