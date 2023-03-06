const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imageSrc: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		avatar: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
