import React from 'react';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';

function MainNavigation() {
	const [session, loading] = useSession();

	function onLogoutHandler() {
		signOut();
	}

	return (
		<header className={classes.header}>
			<Link href='/'>
				<div className={classes.logo}>Maven Shop</div>
			</Link>
			<nav>
				<ul>
					{!session && !loading && (
						<li>
							<Link href='/auth'>Login</Link>
						</li>
					)}
					{session && (
						<li>
							<Link href='/profile'>Profile</Link>
						</li>
					)}
					{session && (
						<li>
							<button type='button' onClick={onLogoutHandler}>
								Logout
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
