const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// express app
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// Routes
const productsRoute = require('./routes/products');

app.use('/api/products' , productsRoute);

app.listen(PORT , () => {
    console.log(`listening to port: ${PORT}`);
})