require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const productRoute = require('./routes/productRoute');

const errorMiddleware = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

// routes
app.use('/api/products', productRoute);

app.use(errorMiddleware);

const runServer = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.`);
        });
    } catch (error) {
        console.log(error);
    }
};

runServer();