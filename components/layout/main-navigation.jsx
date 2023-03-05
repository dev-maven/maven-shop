import React, { useState } from 'react';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';

import classes from './main-navigation.module.css';
import Button from '../UI/button/button';
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
						{!session && !loading && (
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

						{!session && !loading && (
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

						{session && (
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
						{session && (
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
