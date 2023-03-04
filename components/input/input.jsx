/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import PropTypes from 'prop-types';
import classes from './input.module.css';

function Input(props) {
	// const inputRef = useRef();

	// const activate = () => {
	// 	inputRef.current.focus();
	// };

	// useImperativeHandle(ref, () => ({
	// 	focus: activate,
	// }));

	let content;

	if (props.control === 'textarea') {
		content = (
			<textarea
				type={props.type}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				rows={props.rows}
			/>
		);
	} else if (props.control === 'image') {
		content = (
			<input
				type='file'
				id={props.id}
				value={props.value}
				onBlur={props.onBlur}
				onChange={(e) => props.onChange(e.target.files)}
			/>
		);
	} else {
		content = (
			<input
				type={props.type}
				id={props.id}
				value={props.value}
				onBlur={props.onBlur}
				onChange={props.onChange}
			/>
		);
	}

	return (
		<div
			className={`${classes.control} ${
				props.isValid === false ? classes.invalid : ''
			}`}
		>
			<label htmlFor={props.id}>{props.label}</label>
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
