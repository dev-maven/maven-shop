import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../components/input/input';
import Button from '../components/button/button';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [emailTouched, setEmailTouched] = useState('');
	const [passwordTouched, setPasswordTouched] = useState('');

	const isEmailValid = !/\S+@\S+\.\S+/.test(email) && emailTouched;
	const isPasswordValid = password.trim() === '' && passwordTouched;

	const formValid = !!(email && password);

	const submitHandler = (event) => {
		event.preventDefault();
		const inputObj = {
			email,
			password,
		};
		console.log(inputObj);
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
