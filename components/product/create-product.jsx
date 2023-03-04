import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ProductForm from './product-form';

export default function CreateProduct(props) {
	const { hideModal } = props;
	const [loading, setLoading] = useState(false);
	const onSubmitHandler = (value) => {
		setLoading(false);
		console.log(value);
	};
	return (
		<ProductForm
			header='Create Product'
			isLoading={loading}
			acceptModal={onSubmitHandler}
			cancelModal={hideModal}
		/>
	);
}

CreateProduct.propTypes = {
	hideModal: PropTypes.func.isRequired,
};
