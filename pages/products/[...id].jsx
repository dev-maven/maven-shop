/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import ProductDetail from '../../components/product/product-detail';
import NotificationContext from '../../store/notification-context';
import Loader from '../../components/loader/loader';

export default function Detail() {
	const router = useRouter();
	const notificationCtx = useContext(NotificationContext);
	const { showNotification } = notificationCtx;
	const [isLoading, setIsLoading] = useState(false);
	const [product, setProduct] = useState(null);
	useEffect(() => {
		if (router.isReady) {
			const productId = router.query.id?.[0];
			setIsLoading(true);

			fetch(`${process.env.apiUrl}/product/${productId}`)
				.then((response) => {
					if (response.ok) {
						return response.json();
					}
					setIsLoading(false);

					return response.json().then((data) => {
						throw new Error(data.message || 'Something went wrong');
					});
				})
				.then((data) => {
					if (data.product) {
						setProduct(data.product);
					}
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
		}
	}, [router.isReady]);

	return (
		<>
			{isLoading && (
				<div className='loader_wrapper'>
					<Loader />
				</div>
			)}
			{!isLoading && product && (
				<ProductDetail
					title={product.title}
					price={product.price}
					description={product.description}
					imageSrc={product.imageSrc}
					_id={product._id}
					createdAt={product.createdAt}
					avatar={product.avatar}
					username={product.username}
				/>
			)}
		</>
	);
}
