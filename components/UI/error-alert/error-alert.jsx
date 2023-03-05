import React from 'react';
import PropTypes from 'prop-types';
import classes from './error-alert.module.css';

function ErrorAlert(props) {
	const { children } = props;
	return <div className={classes.alert}>{children}</div>;
}

export default ErrorAlert;

ErrorAlert.propTypes = {
	children: PropTypes.element.isRequired,
};
