const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

const database = require('./connection/database');
const authRoutes = require('./routes/auth.routes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
    await database();
    console.log(`Server is running on port ${PORT}`.bgBlue);
})