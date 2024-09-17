const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const database = require('./connection/database');
const authRoutes = require('./routes/auth.routes');

dotenv.config();

const app = express();

// allow us to parse incoming request:req.body
app.use(express.json());

// allow us to parse incoming cookeies
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
    await database();
    console.log(`Server is running on port ${PORT}`.bgBlue);
})