const express = require('express');
const mongoose = require('mongoose');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello from Node');
});

const runServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://root:PT9ukN1mO5bBQPgi@cluster0.kipkylu.mongodb.net/Node-Api?retryWrites=true&w=majority');
        console.log('Connected to MongoDB!');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}.`);
        });
    } catch (error) {
        console.log(error);
    }

};

runServer();