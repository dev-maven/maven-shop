import React, { useState } from 'react';
import Link from 'next/link';
import Input from '../components/UI/input/input';
import Button from '../components/UI/button/button';

export default function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [emailTouched, setEmailTouched] = useState('');
	const [nameTouched, setNameTouched] = useState('');
	const [passwordTouched, setPasswordTouched] = useState('');

	const isEmailValid = !/\S+@\S+\.\S+/.test(email) && emailTouched;
	const isPasswordValid = password.trim() === '' && passwordTouched;
	const isNameValid = name.trim() === '' && nameTouched;

	const formValid = !!(email && password && name);

	const submitHandler = (event) => {
		event.preventDefault();
		const inputObj = {
			email,
			password,
			name,
		};
		console.log(inputObj);
	};

	return (
		<section className='auth'>
			<h1>Create Account</h1>
			<hr />
			<form onSubmit={submitHandler}>
				<Input
					id='name'
					label='Full Name'
					type='text'
					isValid={!isNameValid}
					value={name}
					onBlur={() => setNameTouched(true)}
					onChange={(event) => setName(event.target.value)}
				/>
				{isNameValid && (
					<span className='error_message'>Please enter your full name</span>
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
