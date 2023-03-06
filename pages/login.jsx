/* eslint-disable comma-dangle */
import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../components/UI/input/input';
import Button from '../components/UI/button/button';
import NotificationContext from '../store/notification-context';
import AuthContext from '../store/auth-context';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [emailTouched, setEmailTouched] = useState('');
	const [passwordTouched, setPasswordTouched] = useState('');
	const notificationCtx = useContext(NotificationContext);
	const { showNotification } = notificationCtx;
	const authCtx = useContext(AuthContext);
	const { login } = authCtx;

	const isEmailValid = !/\S+@\S+\.\S+/.test(email) && emailTouched;
	const isPasswordValid = password.trim() === '' && passwordTouched;
	const router = useRouter();

	const formValid = !!(email && password);

	const submitHandler = async (event) => {
		event.preventDefault();
		setIsLoading(true);
		const inputObj = {
			email,
			password,
		};

		fetch(`${process.env.apiUrl}/auth/login`, {
			method: 'POST',
			body: JSON.stringify(inputObj),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				return response.json().then((data) => {
					setIsLoading(false);
					throw new Error(data.message || 'Something went wrong');
				});
			})
			.then((data) => {
				const remainingMilliseconds = 60 * 60 * 1000;
				const expiryDate = new Date(
					new Date().getTime() + remainingMilliseconds
				);
				login(data.token, expiryDate);
				router.replace('/');
				setIsLoading(false);
			})
			.catch((error) => {
				showNotification({
					title: 'Error',
					message: error.message || 'Something went wrong!',
					status: 'error',
				});
				setIsLoading(false);
			});
	};

	return (
		<section className='auth'>
			<h1>Login</h1>
			<hr />
			<form onSubmit={submitHandler}>
				<Input
					id='email'
					label='Email'
					type='email'
					isValid={!isEmailValid}
					value={email}
					onBlur={() => setEmailTouched(true)}
					onChange={(event) => setEmail(event.target.value)}
				/>
				{isEmailValid && (
					<span className='error_message'>Please enter email address</span>
				)}

				<Input
					id='password'
					label='Password'
					type='password'
					isValid={!isPasswordValid}
					value={password}
					onBlur={() => setPasswordTouched(true)}
					onChange={(event) => setPassword(event.target.value)}
				/>
				{isPasswordValid && (
					<span className='error_message'>Please enter password</span>
				)}

				<div className='form_actions'>
					<Button
						design='stroked_button'
						disabled={!formValid}
						loading={isLoading}
						type='submit'
					>
						Login
					</Button>
					<div>
						<p>Not yet Registered?</p>
						<Link href='/register' className='link'>
							Create Account
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
}
