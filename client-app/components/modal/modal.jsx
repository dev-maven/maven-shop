/* eslint-disable comma-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable implicit-arrow-linebreak */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css';

function Backdrop(props) {
	const { onDismiss } = props;
	return <div className={styles.backdrop} onClick={onDismiss} />;
}
function Modal(props) {
	const { dismiss, children, title } = props;
	return (
		<>
			{ReactDOM.createPortal(
				<Backdrop onDismiss={dismiss} />,
				document.getElementById('backdrop-root')
			)}
			{ReactDOM.createPortal(
				<div className={styles.modal}>
					<header className={styles.modal__header}>
						<h1>{title}</h1>
					</header>
					<div className={styles.modal__content}>{children}</div>
				</div>,
				document.getElementById('modal-root')
			)}
		</>
	);
}

export default Modal;

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.string.isRequired,
	dismiss: PropTypes.func.isRequired,
};

Backdrop.propTypes = {
	onDismiss: PropTypes.func.isRequired,
};
