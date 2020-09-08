const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const pizza = require('./routes/api/pizza');
const user = require('./routes/api/user');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = process.env.MONGO_URI || 'mongodb://127.0.0.1/pizza-app';

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
    }) 
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err));

app.use('/api/pizzas', pizza);
app.use('/api/user', user);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = server;