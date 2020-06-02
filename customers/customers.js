const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('./Customer');
const Customer = mongoose.model('Customer');

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/customers?gssapiServiceName=mongodb', { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database "customers"...');
});

app.post('/customers', (req, res) => {
    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };

    let customer = new Customer(newCustomer);

    customer.save().then(() => {
        res.send('Customer created');
    }).catch(err => {
        if (err) {
            throw err;
        }
    })
});



app.get('/customers', (req, res) => {
    Customer.find().then(customers => {
        res.json(customers);
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

app.get('/customers/:id', (req, res) => {
    Customer.findById(req.params.id).then(customer => {
        if (customer) {
            res.json(customer);
        } else {
            res.sendStatus(404);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

app.delete('/customers/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).then(() => {
        res.send('Customer deleted');
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

app.listen(8989, () => {
    console.log('Up and running - Customers service');
});

