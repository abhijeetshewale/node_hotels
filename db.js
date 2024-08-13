// const mongoose = require('mongoose');

// // define the MongoDB connection URL
// const mongoURL = 'mongodb://localhost:27017/hotels'   //hotel is database name in 

// //set  up MongoDB Connection
// mongoose.connect(mongoURL, {
//     useNewUrlParser: true,
//     userUnifiedTopology: true,
// })


// //get the default connection
// //Mongoose Maintains a default connection object representing the MongoDB connection
// const db = mongoose.connection;

// //define event listeners for database connection

// db.on('connected', () =>{
//     console.log('connected to mongodb server');
// })

// db.on('error', (err) =>{
//     console.error('mongodb connection error', err);
// })

// db.on('disconnected', () =>{
//     console.log('mongodb disconnected');
// })

// //export the database connection
// module.exports = db;






const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; // 'hotels' is the database name

// Set up MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

db.on('reconnected', () => {
    console.log('MongoDB reconnected');
});

// Export the database connection
module.exports = db;