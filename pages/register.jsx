import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Input from '../components/UI/input/input';
import Button from '../components/UI/button/button';
import NotificationContext from '../store/notification-context';

export default function Register() {
	const notificationCtx = useContext(NotificationContext);
	const { showNotification } = notificationCtx;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [fullName, setName] = useState('');
	const [userType, setUserType] = useState('Customer');
	const [isLoading, setIsLoading] = useState(false);
	const [emailTouched, setEmailTouched] = useState();
	const [nameTouched, setNameTouched] = useState();
	const [passwordTouched, setPasswordTouched] = useState();
	const [userTypeTouched, setUserTypeTouched] = useState();
	const router = useRouter();

	const isEmailValid = !/\S+@\S+\.\S+/.test(email) && emailTouched;
	const isPasswordValid = password.trim() === '' && passwordTouched;
	const isNameValid = fullName.trim() === '' && nameTouched;
	const isUserTypeValid = userType.trim() === '' && userTypeTouched;

	const formValid = !!(email && password && fullName);

	const submitHandler = (event) => {
		setIsLoading(true);
		event.preventDefault();
		const inputObj = {
			email,
			password,
			fullName,
			userType,
		};
		fetch(`${process.env.apiUrl}/auth/signup`, {
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
			.then(() => {
				router.replace('/login');
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				showNotification({
					title: 'Error',
					message: 'Email already exist',
					status: 'error',
				});
				setIsLoading(false);
			});
	};

	return (
		<section className='auth'>
			<h1>Create Account</h1>
			<hr />
			<form onSubmit={submitHandler}>
				<Input
					id='fullName'
					label='Full Name'
					type='text'
					isValid={!isNameValid}
					value={fullName}
					onBlur={() => setNameTouched(true)}
					onChange={(event) => setName(event.target.value)}
				/>
				{isNameValid && (
					<span className='error_message'>Please enter your full fullName</span>
				)}
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
					<span className='error_message'>Please enter your email address</span>
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

				<Input
					id='userType'
					label='User Type'
					type='select'
					control='select'
					isValid={!isUserTypeValid}
					value={userType}
					onBlur={() => setUserTypeTouched(true)}
					onChange={(event) => setUserType(event.target.value)}
				/>
				{isUserTypeValid && (
					<span className='error_message'>Please select user type</span>
				)}

				<div className='form_actions'>
					<Button
						design='stroked_button'
						disabled={!formValid}
						loading={isLoading}
						type='submit'
					>
						Register
					</Button>
					<div>
						<p>Already Registered?</p>
						<Link href='/login' className='link'>
							Sign In
						</Link>
					</div>
				</div>
			</form>
		</section>
	);
}
