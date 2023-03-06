const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	const { email, fullName, password, userType } = req.body;
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed, data is incorrect');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}

	bcrypt
		.hash(password, 12)
		.then((hashedPassword) => {
			const user = new User({
				email,
				password: hashedPassword,
				fullName,
				userType,
			});
			return user.save();
		})
		.then((result) => {
			res.status(201).json({ success: true, data: 'result' });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findOne({ email })
		.then((user) => {
			if (!user) {
				const error = new Error('Invalid username or password');
				error.statusCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Invalid username or password');
				error.statusCode = 401;
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString(),
					userType: loadedUser.userType,
					name: loadedUser.fullName,
				},
				'xyervsvsjbkdndodbryrbdnkp',
				{ expiresIn: '1h' }
			);
			res
				.status(200)
				.json({
					success: true,
					data: { token, userId: loadedUser._id.toString() },
				});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};
