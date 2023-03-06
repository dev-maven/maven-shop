/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './product-card.module.css';
import Button from '../UI/button/button';
import AuthContext from '../../store/auth-context';

export default function ProductCard(props) {
	const {
		title,
		price,
		imageSrc,
		_id,
		createdAt,
		onEdit,
		onDelete,
		isLoading,
		avatar,
		username,
	} = props;
	const productLink = `/products/${_id}`;
	const date = new Date(createdAt).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});
	const formattedPrice = new Intl.NumberFormat().format(price);
	const image = ` ${process.env.apiUrl}/${imageSrc}`;
	const authCtx = useContext(AuthContext);
	const { isAdmin } = authCtx;
	console.log(avatar);

	return (
		<div className={styles.card}>
			<div className={styles.card_header}>
				<Image
					className={styles.image}
					src={image}
					alt={title}
					width={300}
					height={200}
				/>
			</div>
			<div className={styles.card_body}>
				<h4>{title}</h4>
				<div className={styles.content_header}>
					<p className={styles.price}>N{formattedPrice}</p>
				</div>
				<div className={styles.user}>
					<Image
						className={styles.image}
						src={avatar}
						alt={title}
						width={40}
						height={40}
					/>
					<div className={styles.user_info}>
						<h5>{username}</h5>
						<small>{date}</small>
					</div>
				</div>
				<div className={styles.actions}>
					<Link href={productLink}>
						<Button
							design='stroked_button'
							disabled={false}
							loading={false}
							type='button'
						>
							View Detail
						</Button>
					</Link>
				</div>

				{isAdmin && (
					<div className={styles.card_actions}>
						<Button
							onClick={() => onEdit(_id)}
							design='stroked_button'
							disabled={false}
							loading={false}
							type='button'
						>
							Edit Product
						</Button>

						<Button
							onClick={() => onDelete(_id)}
							design='danger_button'
							disabled={false}
							loading={isLoading}
							type='button'
						>
							Delete Product
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

ProductCard.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	_id: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	isLoading: PropTypes.bool.isRequired,
};
