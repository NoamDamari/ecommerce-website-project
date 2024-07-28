
const express = require('express');
const cors = require('cors')
const connectToDatabase = require('./database/db');

// Initialize Express app
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Connect to the database
connectToDatabase();

// Import routes
const productsRoutes = require('./routes/productsRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Define routes
app.use('/api/products' , productsRoutes);
app.use('/api/cart', cartRoutes);

app.listen(PORT , () => {
    console.log(`listening to port: ${PORT}`);
});