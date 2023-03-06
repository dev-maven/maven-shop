import React, { useContext } from 'react';

import MainNavigation from './main-navigation';
import Notification from '../UI/notification/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
	const notificationCtx = useContext(NotificationContext);
	const { notification } = notificationCtx;
	// eslint-disable-next-line react/prop-types
	const { children } = props;
	return (
		<>
			<MainNavigation />
			<main>{children}</main>
			{notification && (
				<Notification
					title={notification.title}
					message={notification.message}
					status={notification.status}
				/>
			)}
		</>
	);
}

export default Layout;
