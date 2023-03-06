/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import DateIcon from '../icons/date-icon';
import classes from './product-detail.module.css';

export default function ProductDetail(props) {
	const { title, price, description, imageSrc, createdAt, avatar, username } =
		props;
	const date = new Date(createdAt).toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
	const image = ` ${process.env.apiUrl}/${imageSrc}`;
	const formattedPrice = new Intl.NumberFormat().format(price);
	const avatarSrc = `/${avatar}`;

	return (
		<>
			<div className={classes.header}>
				<h1>{title}</h1>
			</div>

			<div className={classes.card}>
				<div className={classes.image}>
					<Image src={image} alt={title} width={300} height={300} />
				</div>
				<ul className={classes.list}>
					<li className={classes.item}>
						<span className={classes.price}>N{formattedPrice}</span>
					</li>
					<li className={classes.item}>
						<span className={classes.icon}>
							<Image src={avatarSrc} alt='avatar' width={50} height={50} />
						</span>
						<span className={classes.list_item}>{username}</span>
					</li>
					<li className={classes.item}>
						<span className={classes.icon}>
							<DateIcon />
						</span>
						<span className={classes.list_item}>{date}</span>
					</li>
				</ul>
			</div>
			<div className={classes.content}>{description}</div>
		</>
	);
}

ProductDetail.propTypes = {
	title: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	createdAt: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
};
