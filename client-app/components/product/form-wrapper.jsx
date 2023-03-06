/* eslint-disable object-curly-newline */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import ProductForm from './product-form';

export default function FormWrapper(props) {
	const { hideModal, submitHandler, isLoading, product, header, edit } = props;

	return (
		<ProductForm
			header={header}
			isLoading={isLoading}
			acceptModal={submitHandler}
			cancelModal={hideModal}
			title={product?.title}
			description={product?.description}
			imageSrc={product?.imageSrc}
			price={product?.price}
			editMode={edit}
		/>
	);
}

FormWrapper.propTypes = {
	header: PropTypes.string.isRequired,
	hideModal: PropTypes.func.isRequired,
	submitHandler: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	product: PropTypes.object,
	edit: PropTypes.bool.isRequired,
};

FormWrapper.defaultProps = {
	product: null,
};
