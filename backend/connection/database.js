const mongoose = require('mongoose');

const database = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`Sucessfully Connected to MongoDB : ${process.env.MONGODB_URL}`.bgGreen);
        
    } catch (error) {
        console.log(`Failed to connect to MongoDB: ${error.message}`.bgRed);
    } 
}

module.exports=database;