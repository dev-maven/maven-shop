import React from 'react';
import Image from 'next/image';
import DateIcon from '../icons/date-icon';
import classes from './product-detail.module.css';

export default function ProductDetail() {
	return (
		<>
			<div className={classes.header}>
				<h1>title</h1>
			</div>

			<div className={classes.card}>
				<div className={classes.image}>
					{/* <Image src={`/${image}`} alt={imageAlt} width={300} height={300} /> */}
				</div>
				<ul className={classes.list}>
					<li className={classes.item}>
						<span className={classes.icon}>
							<Image src='/user.svg' alt='avatar' width={50} height={50} />
						</span>
						<span className={classes.list_item}>User</span>
					</li>
					<li className={classes.item}>
						<span className={classes.icon}>
							<DateIcon />
						</span>
						<span className={classes.list_item}>Date</span>
					</li>
				</ul>
			</div>
			<div className={classes.content}>Description</div>
		</>
	);
}
