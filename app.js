require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const tokenRouter = require('./routes/tokenRouter');

console.log(
	'Frontend URL:',
	process.env.NODE_ENV === 'production'
		? process.env.FRONT_END_URL
		: 'http://localhost:3000',
);

const corsOptions = {
	origin:
		process.env.NODE_ENV === 'production'
			? process.env.FRONT_END_URL
			: 'http://localhost:3000',
	credentials: true,
};
// Create Express App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

// Encode credentials
// Need to update temporary credentials
const username = encodeURIComponent(process.env.MONGODB_USERNAME ?? 'app');
const password = encodeURIComponent(process.env.MONGODB_PASSWORD ?? 'app');
const link = process.env.MONGODB_LINK ?? 'vt.ycdk5bw.mongodb.net/RewardBot?retryWrites=true&w=majority&appName=VT';
// console.log(username, password);

// Build MongoDB URI
const uri = `mongodb+srv://${username}:${password}@${link}`;

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
		console.log(`URI: ${uri}`);
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});

module.exports = app;
