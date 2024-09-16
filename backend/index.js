const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

const database = require('./connection/database');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Welcome");
})

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`.bgCyan);
    await database();
})