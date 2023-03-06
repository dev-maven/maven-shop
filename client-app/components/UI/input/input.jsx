/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './input.module.css';

function Input(props) {
	const { control, isValid, id, label, type, value, onChange, onBlur, rows } =
		props;
	let content;

	if (control === 'textarea') {
		content = (
			<textarea
				type={type}
				id={id}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				rows={rows}
			/>
		);
	} else if (control === 'image') {
		content = (
			<input
				type='file'
				accept='image/jpg, image/png, image.jpeg'
				id={id}
				value={value}
				onBlur={onBlur}
				onChange={(e) => onChange(e.target.files)}
			/>
		);
	} else if (control === 'select') {
		content = (
			<select
				type='input'
				id={id}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
			>
				<option value='Customer'>Customer</option>
				<option value='Admin'>Admin</option>
			</select>
		);
	} else {
		content = (
			<input
				type={type}
				id={id}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
			/>
		);
	}

	return (
		<div
			className={`${classes.control} ${
				isValid === false ? classes.invalid : ''
			}`}
		>
			<label htmlFor={id}>{label}</label>
			{content}
		</div>
	);
}

export default Input;

Input.propTypes = {
	isValid: PropTypes.bool.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
	rows: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func,
	control: PropTypes.string,
};

Input.defaultProps = {
	rows: '5',
	control: 'input',
	type: 'input',
	value: '',
	onBlur: null,
};
