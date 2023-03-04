/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../button/button';
import styles from './modal.module.css';

const modal = (props) =>
	ReactDOM.createPortal(
		<div className={styles.modal}>
			<header className={styles.modal__header}>
				<h1>{props.title}</h1>
			</header>
			<div className={styles.modal__content}>{props.children}</div>
			<div className={styles.modal__actions}>
				<Button design='stroked_button' onClick={props.onCancelModal}>
					Cancel
				</Button>
				<Button
					onClick={props.onAcceptModal}
					disabled={!props.acceptEnabled}
					loading={props.isLoading}
				>
					Accept
				</Button>
			</div>
		</div>,
		// eslint-disable-next-line comma-dangle
		document.getElementById('modal-root')
	);

export default modal;
