import React, { useContext } from 'react';
import Link from 'next/link';

import AuthContext from '../../store/auth-context';

import classes from './main-navigation.module.css';
import Button from '../UI/button/button';

function MainNavigation() {
	const authCtx = useContext(AuthContext);
	const { isLoggedIn, logout } = authCtx;

	const onLogoutHandler = () => {
		logout();
	};

	return (
		<header className={classes.header}>
			<Link href='/'>
				<div className={classes.logo}>Maven Shop</div>
			</Link>
			<nav>
				<ul>
					{!isLoggedIn && (
						<li>
							<Link href='/register'>
								<Button
									design=''
									disabled={false}
									loading={false}
									type='button'
								>
									Register
								</Button>
							</Link>
						</li>
					)}

					{!isLoggedIn && (
						<li>
							<Link href='/login'>
								<Button
									design='stroked_button'
									disabled={false}
									loading={false}
									type='button'
								>
									Login
								</Button>
							</Link>
						</li>
					)}

					{isLoggedIn && (
						<li>
							<Button
								design=''
								disabled={false}
								loading={false}
								onClick={onLogoutHandler}
								type='button'
							>
								Logout
							</Button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
