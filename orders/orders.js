const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');

require('./Order');
const Order = mongoose.model('Order');

mongoose.connect('mongodb://127.0.0.1:27017/customers?gssapiServiceName=mongodb', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to DB');
});

app.use(bodyParser.json());

app.post('/orders', (req, res) => {
    let newOrder = {
        customerId: mongoose.Types.ObjectId(req.body.customerId),
        bookId: mongoose.Types.ObjectId(req.body.bookId),
        leaseDate: req.body.leaseDate,
        returnDate: req.body.returnDate,
    };

    let order = new Order(newOrder);

    order.save().then(() => {
        res.send('Order created');
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

app.get('/orders', (req, res) => {
    Order.find().then(orders => {
        res.json(orders);
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

app.get('/orders/:id', (req, res) => {
    Order.findById(req.params.id).then(order => {
        if (order) {
            axios.get(`http://localhost:8989/customers/${order.customerId}`).then(response => {
                let orderObject = {
                    customerName: response.data.name,
                    bookTitle: ''
                };

                axios.get(`http://localhost:8080/books/${order.bookId}`).then(response => {
                    console.log(response.data);

                    orderObject.bookTitle = response.data.title;
                    res.json(orderObject);
                }).catch(err => {
                    if (err) {
                        throw err;
                    }
                });
            }).catch(err => {
                if (err) {
                    throw err;
                }
            });
        } else {
            res.statusCode(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});

app.listen(8888, () => {
    console.log('Orders service is running...');
});


















