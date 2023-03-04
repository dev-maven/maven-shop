import React, { useState } from 'react';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';
import Button from '../button/button';
import CreateProduct from '../product/create-product';

function MainNavigation() {
	const [session, loading] = useSession();
	const [showModal, setShowModal] = useState(false);

	const onLogoutHandler = () => {
		signOut();
	};

	const openModal = () => {
		setShowModal(true);
	};

	return (
		<>
			<header className={classes.header}>
				<Link href='/'>
					<div className={classes.logo}>Maven Shop</div>
				</Link>
				<nav>
					<ul>
						{session && !loading && (
							<li>
								<Link href='/auth'>Login</Link>
							</li>
						)}
						{session && !loading && (
							<li>
								<Link href='/auth'>Register</Link>
							</li>
						)}

						{!session && (
							<li>
								<Button
									design=''
									disabled={false}
									loading={false}
									onClick={openModal}
									type='button'
								>
									Add Product
								</Button>
							</li>
						)}
						{!session && (
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
			{showModal && <CreateProduct hideModal={() => setShowModal(false)} />}
		</>
	);
}

export default MainNavigation;
