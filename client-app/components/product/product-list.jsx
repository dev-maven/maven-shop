/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ProductCard from './product-card';
import classes from './product-list.module.css';

export default function ProductList(props) {
	const { products, editProduct, deleteProduct, isLoading } = props;
	return (
		<div className={classes.container}>
			{products.map((product) => (
				<ProductCard
					key={product._id}
					_id={product._id}
					title={product.title}
					description={product.description}
					username={product.username}
					price={product.price}
					avatar={product.avatar}
					imageSrc={product.imageSrc}
					createdAt={product.createdAt}
					onEdit={editProduct}
					onDelete={deleteProduct}
					isLoading={isLoading}
				/>
			))}
		</div>
	);
}
