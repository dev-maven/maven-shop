import React from 'react';
import ProductCard from './product-card';
import classes from './product-list.module.css';

export default function ProductList() {
	const products = [
		{
			id: 1,
			title: 'My product',
			description: 'short description here',
			price: 30000,
			imageSrc:
				'https://i.pinimg.com/originals/64/e5/a5/64e5a5550a736333598787879987d199.jpg',
		},
		{
			id: 2,
			title: 'My product',
			description: 'short description here',
			price: 30000,
			imageSrc:
				'https://i.pinimg.com/originals/64/e5/a5/64e5a5550a736333598787879987d199.jpg',
		},
		{
			id: 3,
			title: 'My product',
			description: 'short description here',
			price: 30000,
			imageSrc:
				'https://i.pinimg.com/originals/64/e5/a5/64e5a5550a736333598787879987d199.jpg',
		},
		{
			id: 4,
			title: 'My product',
			description: 'short description here',
			price: 30000,
			imageSrc:
				'https://i.pinimg.com/originals/64/e5/a5/64e5a5550a736333598787879987d199.jpg',
		},
		{
			id: 5,
			title: 'My product',
			description: 'short description here',
			price: 30000,
			imageSrc:
				'https://i.pinimg.com/originals/64/e5/a5/64e5a5550a736333598787879987d199.jpg',
		},
	];
	return (
		<div className={classes.container}>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					_id={product.id}
					title={product.title}
					description={product.description}
					price={product.price}
					imageSrc={product.imageSrc}
				/>
			))}
		</div>
	);
}
