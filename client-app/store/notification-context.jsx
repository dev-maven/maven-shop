/* eslint-disable operator-linebreak */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import React, { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
	notification: null,
	showNotification(notificationData) {},
	hideNotification() {},
});

export function NotificationContextProvider(props) {
	const [activeNotification, setActiveNotification] = useState();

	useEffect(() => {
		if (
			activeNotification &&
			(activeNotification.status === 'success' ||
				activeNotification.status === 'error')
		) {
			const timer = setTimeout(() => {
				hideNotificationHandler();
			}, 3000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [activeNotification]);

	function showNotificationHandler(notificationData) {
		setActiveNotification(notificationData);
	}

	function hideNotificationHandler() {
		setActiveNotification(null);
	}

	const context = {
		notification: activeNotification,
		showNotification: showNotificationHandler,
		hideNotification: hideNotificationHandler,
	};
	return (
		<NotificationContext.Provider value={context}>
			{props.children}
		</NotificationContext.Provider>
	);
}

export default NotificationContext;
