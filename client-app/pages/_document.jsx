/* eslint-disable react/jsx-indent */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body>
				<div id='backdrop-root' />
				<div id='modal-root' />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
