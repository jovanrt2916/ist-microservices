const mongoose = require('mongoose');

mongoose.model('Order', {
    customerId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookId: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    leaseDate: {
        type: Date,
        require: true
    },
    returnDate: {
        type: Date,
        require: true
    }
});