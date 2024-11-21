require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const tokenRouter = require('./routes/tokenRouter');

const corsOptions = {
	origin: process.env.FRONT_END_URL, // Frontend URL
	credentials: true, // Allow cookies and credentials
};

// Create Express App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// Encode credentials
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);
const cluster = process.env.MONGODB_CLUSTER;
const address = process.env.MONGODB_ADDRESS;
const database = process.env.MONGODB_DATABASE;

// Build MongoDB URI
const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?${address}`;

// Root route
app.get('/', (req, res) => res.send('<h1>RewardBot BackEnd</h1>'));

// Use the userRouter for user-related routes
app.use(userRouter);
app.use(tokenRouter);

// Connect to MongoDB
mongoose.Promise = global.Promise;

mongoose
	.connect(uri)
	.then(() => {
		console.log('Connection with MongoDB was successful');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

module.exports = app;
