import React from 'react';
import PropTypes from 'prop-types';
import classes from './loader.module.css';

function Loader(props) {
	const { type } = props;
	const extraClass = type === 'button' ? classes.button_loader : '';

	return (
		<div className={`${classes.loader} ${extraClass}`}>
			<div />
			<div />
			<div />
			<div />
		</div>
	);
}

export default Loader;

Loader.propTypes = {
	type: PropTypes.string,
};

Loader.defaultProps = {
	type: '',
};
