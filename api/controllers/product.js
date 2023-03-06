const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
	Product.find()
		.then((products) => {
			res.status(200).json({ success: true, data: products });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.getProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.findById(productId)
		.then((product) => {
			if (!product) {
				const error = new Error('Could not find product.');
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ success: true, data: product });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.createProduct = (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		const error = new Error('Validation failed, data is incorrect');
		error.statusCode = 422;
		throw error;
	}
	if (!req.file) {
		const error = new Error('No image provided');
		error.statusCode = 422;
		throw error;
	}
	const imageUrl = req.file.path;

	const product = new Product(req.body);
	product.imageSrc = imageUrl;
	const id = Math.floor(Math.random() * 9);
	product.username = req.name;
	product.avatar = `${id}.svg`;
	product
		.save()
		.then((result) => {
			res.status(201).json({
				success: true,
				data: result,
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.updateProduct = (req, res, next) => {
	const error = validationResult(req);
	if (!error.isEmpty()) {
		const error = new Error('Only Admins are allowed to edit products');
		error.statusCode = 422;
		throw error;
	}
	if (req.userType !== 'Admin') {
		const error = new Error('Unauthorized');
		error.statusCode = 401;
		throw error;
	}
	const productId = req.params.productId;
	const title = req.body.title;
	const price = req.body.price;
	const description = req.body.description;
	let imageSrc = req.body.image;

	if (req.file) {
		imageSrc = req.file.path;
	}

	if (!imageSrc) {
		const error = new Error('No image provided');
		error.statusCode = 422;
		throw error;
	}

	Product.findById(productId)
		.then((product) => {
			if (!product) {
				const error = new Error('No product found');
				error.statusCode = 404;
				throw error;
			}
			if (imageSrc !== product.imageSrc) {
				clearImage(product.imageSrc);
			}
			product.title = title;
			product.imageSrc = imageSrc;
			product.description = description;
			product.price = price;
			return product.save();
		})
		.then((result) => {
			res.status(200).json({ success: true, data: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.deleteProduct = (req, res, next) => {
	const productId = req.params.productId;
	Product.findById(productId)
		.then((product) => {
			if (!product) {
				const error = new Error('No product found');
				error.statusCode = 404;
				throw error;
			}
			if (req.userType !== 'Admin') {
				const error = new Error('Only Admins are allowed to delete products');
				error.statusCode = 401;
				throw error;
			}
			clearImage(product.imageSrc);
			return Product.findByIdAndRemove(productId);
		})
		.then((result) => {
			res.status(200).json({ success: true, data: result });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

const clearImage = (filePath) => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, (err) => console.log(err));
};
