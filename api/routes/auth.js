var express = require('express');
var router = express.Router();
const { body } = require('express-validator');

const authController = require('../controllers/auth');

const User = require('../models/user');

//POST /login
router.post('/login', authController.login);

//POST /user
router.post(
	'/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject('Email already exists');
					}
				});
			}),
		body('password').trim().not().isEmpty(),
		body('fullName').trim().not().isEmpty(),
		body('userType').trim().not().isEmpty(),
	],
	authController.signup
);

module.exports = router;
