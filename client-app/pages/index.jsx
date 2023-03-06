/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import ProductList from '../components/product/product-list';
import NotificationContext from '../store/notification-context';
import Loader from '../components/loader/loader';
import Button from '../components/UI/button/button';
import FormWrapper from '../components/product/form-wrapper';
import AuthContext from '../store/auth-context';

export default function Index() {
	const notificationCtx = useContext(NotificationContext);
	const { showNotification } = notificationCtx;
	const [isLoading, setIsLoading] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProduct] = useState();
	const [formLoading, setFormLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const authCtx = useContext(AuthContext);
	const { isLoggedIn, token } = authCtx;

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
		setEditMode(false);
		setSelectedProduct(null);
	};
	const onSubmitHandler = (value) => {
		setFormLoading(true);
		const formData = new FormData();
		formData.append('title', value.title);
		formData.append('description', value.description);
		formData.append('price', value.price);
		formData.append('image', value.image);

		const url = editMode
			? `update-product/${selectedProduct._id}`
			: 'add-product';
		const method = editMode ? 'PUT' : 'POST';
		fetch(`${process.env.apiUrl}/product/${url}`, {
			method,
			body: formData,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}

				return response.json().then((data) => {
					setFormLoading(false);

					throw new Error(data.message || 'Something went wrong');
				});
			})
			.then((resData) => {
				if (editMode) {
					const newObj = {
						title: resData.data.title,
						description: resData.data.description,
						price: resData.data.price,
						imageSrc: resData.data.imageSrc,
					};

					const newProducts = [...products];
					const index = newProducts.findIndex(
						(item) => item._id === selectedProduct._id
					);
					newProducts[index] = {
						...newProducts[index],
						...newObj,
					};
					setProducts(newProducts);
				} else {
					setProducts((prevValue) => [...prevValue, resData.data]);
				}
				showNotification({
					title: 'Success',
					message: editMode
						? 'Product updated Successfully'
						: 'Product created Successfully',
					status: 'success',
				});
				setFormLoading(false);
				closeModal();
			})
			.catch((error) => {
				setFormLoading(false);
				showNotification({
					title: 'Error',
					message: error.message || 'Something went wrong!',
					status: 'error',
				});
			});
	};

	const onEditHandler = (id) => {
		const selected = products.find((item) => item._id === id);
		setSelectedProduct(selected);
		setEditMode(true);
		setShowModal(true);
	};

	const onDeleteHandler = (id) => {
		setFormLoading(true);
		fetch(`${process.env.apiUrl}/product/delete-product/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				setFormLoading(false);

				return response.json().then((data) => {
					throw new Error(data.message || 'Something went wrong');
				});
			})
			.then(() => {
				const updatedProducts = products.filter((item) => item._id !== id);
				setProducts(updatedProducts);
				setFormLoading(false);
			})
			.catch((error) => {
				showNotification({
					title: 'Error',
					message: error.message || 'Something went wrong!',
					status: 'error',
				});
				setFormLoading(false);
			});
	};

	useEffect(() => {
		setIsLoading(true);

		fetch(`${process.env.apiUrl}/product/products`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
				setIsLoading(false);

				return response.json().then((data) => {
					throw new Error(data.message || 'Something went wrong');
				});
			})
			.then((resData) => {
				setProducts(resData.data);
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
	}, []);
	return (
		<>
			<Head>
				<title>Maven Shop</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='home'>
				{isLoading && (
					<div className='loader_wrapper'>
						<Loader />
					</div>
				)}
				{!isLoading && isLoggedIn && (
					<div className='home_action'>
						<Button
							design=''
							disabled={false}
							loading={false}
							onClick={openModal}
							type='button'
						>
							Add Product
						</Button>
					</div>
				)}
				{products && !isLoading && (
					<ProductList
						products={products}
						editProduct={onEditHandler}
						deleteProduct={onDeleteHandler}
						isLoading={formLoading}
					/>
				)}
				{showModal && !isLoading && (
					<FormWrapper
						header={editMode ? 'Edit Product' : 'Create Product'}
						submitHandler={onSubmitHandler}
						hideModal={closeModal}
						isLoading={formLoading}
						product={selectedProduct}
						edit={editMode}
					/>
				)}
			</div>
		</>
	);
}