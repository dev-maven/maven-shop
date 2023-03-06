const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../middleware/is-auth');

const productController = require('../controllers/product');

const router = express.Router();

//GET /products
router.get('/products', productController.getProducts);

//GET /product
router.get('/:productId', productController.getProduct);

//Put /product
router.put(
	'/update-product/:productId',
	isAuth,
	[
		body('title').trim().not().isEmpty(),
		body('description').trim().not().isEmpty(),
		body('price').trim().not().isEmpty(),
	],
	productController.updateProduct
);

//POST /product
router.post(
	'/add-product',
	isAuth,
	[
		body('title').trim().isLength({ min: 3 }),
		body('description').trim().isLength({ min: 3 }),
		body('price').trim().isLength({ min: 2 }),
	],
	productController.createProduct
);

//DELETE /product
router.delete(
	'/delete-product/:productId',
	isAuth,
	productController.deleteProduct
);

module.exports = router;
