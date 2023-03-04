/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React from 'react';
import { Provider } from 'next-auth/client';
import Layout from '../components/layout/layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<Provider session={pageProps.session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}
