const express = require('express');
const userSchema = require('../models/userModel'); // Adjust the path if necessary
const router = express.Router();

// Create a new user
router.post('/user', async (req, res) => {
	try {
		const newItem = new userSchema({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			canvasToken: req.body.canvasToken ?? '',
			option: req.body.option ?? 'Week',
			showCompleted: req.body.showCompleted ?? true,
			createdAt: Date.now(),
			score: 100,
		});
		// console.log(newItem);
		await newItem.save();
		res.status(201).json(newItem);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error creating new user');
	}
});

// Get all users
router.get('/user', async (req, res) => {
	try {
		const items = await userSchema.find();
		res.json(items);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error occurred while fetching users');
	}
});

// Get a user by ID
router.get('/user/:id', async (req, res) => {
	try {
		const item = await userSchema.findById(req.params.id);
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error occurred while fetching user by ID');
	}
});

router.put('/user/:id', async (req, res) => {
	try {
		const item = await userSchema.findById(req.params.id);

		if (!item) {
			return res.status(404).send('User not found');
		}
		if (req.body.canvasToken) item.canvasToken = req.body.canvasToken;
		if (req.body.option !== undefined) item.option = req.body.option;
		if (req.body.showCompleted !== undefined)
			item.showCompleted = req.body.showCompleted;
		if (req.body.score !== undefined)
			item.score = item.score - req.body.score;


		item.completed = item.completed || [];
		if (req.body.assignment_id !== undefined)
			if (req.body.mark != undefined && req.body.mark == true) {
				item.completed = [...item.completed, req.body.assignment_id];
			}
			else {
				item.completed = item.completed.filter(
					(id) => id !== req.body.assignment_id
				);
			}

		await item.save();
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error occurred while fetching user by ID');
	}
});

// Get a user by email
router.get('/user/email/:email', async (req, res) => {
	try {
		const item = await userSchema.findOne({ email: req.params.email });
		res.json(item);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error occurred while fetching user by email');
	}
});

module.exports = router;
