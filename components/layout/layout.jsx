import React from 'react';

import MainNavigation from './main-navigation';

function Layout(props) {
	// eslint-disable-next-line react/prop-types
	const { children } = props;
	return (
		<>
			<MainNavigation />
			<main>{children}</main>
		</>
	);
}

export default Layout;
