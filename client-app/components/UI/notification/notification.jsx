/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import classes from './notification.module.css';
import NotificationContext from '../../../store/notification-context';

function Notification(props) {
	const notificationCtx = useContext(NotificationContext);
	const { hideNotification } = notificationCtx;

	const { title, message, status } = props;

	let statusClasses = '';

	if (status === 'success') {
		statusClasses = classes.success;
	}

	if (status === 'error') {
		statusClasses = classes.error;
	}

	if (status === 'pending') {
		statusClasses = classes.pending;
	}

	const activeClasses = `${classes.notification} ${statusClasses}`;

	return (
		<div className={activeClasses} onClick={hideNotification}>
			<h2>{title}</h2>
			<p>{message}</p>
		</div>
	);
}

export default Notification;

Notification.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
};
