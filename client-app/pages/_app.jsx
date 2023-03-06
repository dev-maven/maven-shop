/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';
import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { NotificationContextProvider } from '../store/notification-context';
import { AuthContextProvider } from '../store/auth-context';

export default function App({ Component, pageProps }) {
	return (
		<NotificationContextProvider>
			<AuthContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthContextProvider>
		</NotificationContextProvider>
	);
}
