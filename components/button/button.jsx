/* eslint-disable react/button-has-type */
/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
	const { design, onClick, disabled, loading, type, children } = props;
	return (
		<button
			className={['button', `${design}`].join(' ')}
			onClick={onClick}
			disabled={disabled || loading}
			type={type}
		>
			{loading ? 'Loading...' : children}
		</button>
	);
}

Button.propTypes = {
	design: PropTypes.string,
	onClick: PropTypes.func,
	disabled: PropTypes.bool.isRequired,
	loading: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};

Button.defaultProps = {
	onClick: null,
	design: '',
};
