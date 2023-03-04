/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Modal from '../modal/modal';
import Input from '../input/input';
import Button from '../button/button';
import generateBase64FromImage from '../../util/image';

export default function ProductForm(props) {
	const {
		header,
		cancelModal,
		acceptModal,
		isLoading,
		title,
		description,
		price,
		imageSrc,
	} = props;

	const [titleInput, setTitleInput] = useState(title);
	const [descriptionInput, setDescriptionInput] = useState(description);
	const [imageInput, setImageInput] = useState(imageSrc);
	const [priceInput, setPriceInput] = useState(price);
	const [titleTouched, setTitleTouched] = useState(false);
	const [descriptionTouched, setDescriptionTouched] = useState(false);
	const [imageTouched, setImageTouched] = useState(false);
	const [priceTouched, setPriceTouched] = useState(false);

	const isTitleValid = titleInput.trim() === '' && titleTouched;
	const isDescriptionValid =
		descriptionInput.trim() === '' && descriptionTouched;
	const isPriceValid = priceInput.trim() === '' && priceTouched;
	const isImageValid = imageInput.trim() === '' && imageTouched;

	const formValid = !!(
		titleInput &&
		descriptionInput &&
		imageInput &&
		priceInput
	);

	const submitHandler = (event) => {
		event.preventDefault();
		const inputObj = {
			title: titleInput,
			description: descriptionInput,
			imageSrc: imageInput,
			price: priceInput,
		};
		acceptModal(inputObj);
	};
	const imageUploadHandler = (files) => {
		if (files) {
			generateBase64FromImage(files[0])
				.then((b64) => {
					setImageInput(b64);
				})
				.catch(() => {
					setImageInput('');
				});
		}
	};

	return (
		<Modal title={header} dismiss={cancelModal}>
			<form onSubmit={submitHandler}>
				<Input
					id='title'
					label='Name'
					type='text'
					isValid={!isTitleValid}
					value={titleInput}
					onBlur={() => setTitleTouched(true)}
					onChange={(event) => setTitleInput(event.target.value)}
				/>
				{isTitleValid && (
					<span className='error_message'>Please enter product name</span>
				)}
				<Input
					id='description'
					label='Description'
					control='textarea'
					rows='5'
					type='text'
					isValid={!isDescriptionValid}
					value={descriptionInput}
					onBlur={() => setDescriptionTouched(true)}
					onChange={(event) => setDescriptionInput(event.target.value)}
				/>
				{isDescriptionValid && (
					<span className='error_message'>Please enter description</span>
				)}

				<Input
					id='price'
					label='Price'
					type='text'
					isValid={!isPriceValid}
					value={priceInput}
					onBlur={() => setPriceTouched(true)}
					onChange={(event) => setPriceInput(event.target.value)}
				/>
				{isPriceValid && (
					<span className='error_message'>Please enter price</span>
				)}

				<Input
					id='image'
					label='Image'
					control='image'
					onBlur={() => setImageTouched(true)}
					onChange={imageUploadHandler}
					isValid={!isImageValid}
				/>
				<div className='new-post__preview-image'>
					{isImageValid && (
						<span className='error_message'>Please choose an image.</span>
					)}
					{imageInput && (
						<Image
							className='uploaded_image'
							src={imageInput}
							alt='uploaded image'
							width={100}
							height={100}
						/>
					)}
				</div>

				<div className='form_actions'>
					<Button
						design='stroked_button'
						onClick={cancelModal}
						disabled={false}
						loading={isLoading}
						type='button'
					>
						Cancel
					</Button>

					<Button
						design=''
						disabled={!formValid}
						loading={isLoading}
						type='submit'
					>
						Add Product
					</Button>
				</div>
			</form>
		</Modal>
	);
}

ProductForm.propTypes = {
	header: PropTypes.string.isRequired,
	cancelModal: PropTypes.func.isRequired,
	acceptModal: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
	title: PropTypes.string,
	price: PropTypes.string,
	imageSrc: PropTypes.string,
	description: PropTypes.string,
};

ProductForm.defaultProps = {
	title: '',
	description: '',
	imageSrc: '',
	price: '',
};
