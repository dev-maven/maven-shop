/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import styles from './product-card.module.css';
import Button from '../button/button';

export default function ProductCard(props) {
	const { title, price, description, imageSrc, _id } = props;

	const handler = () => {};
	return (
		<div className={styles.card}>
			<div className={styles.card_header}>
				<Image
					className={styles.image}
					src={imageSrc}
					alt={title}
					width={300}
					height={300}
				/>
			</div>
			<div className={styles.card_body}>
				<div className={styles.content_header}>
					<span className={`${styles.tag} ${styles.tag_teal}`}>Technology</span>
					<p className={styles.price}>N{price}</p>
				</div>
				<h4>{title}</h4>
				<span>{_id}</span>
				<p className={styles.description}>{description}</p>

				<div className={styles.user}>
					<Image
						className={styles.image}
						src={imageSrc}
						alt={title}
						width={40}
						height={40}
					/>
					<div className={styles.user_info}>
						<h5>July Dec</h5>
						<small>2h ago</small>
					</div>
				</div>
				<div className={styles.actions}>
					<Button onClick={handler} disabled='false' loading='' type='button'>
						Add to Cart
					</Button>

					<Button
						design='stroked_button'
						onClick={handler}
						disabled='false'
						loading=''
						type='button'
					>
						Buy Now
					</Button>
				</div>
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	description: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	_id: PropTypes.string.isRequired,
};
