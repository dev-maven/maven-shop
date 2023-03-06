/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

function parseJwt(token) {
	if (!token) {
		return null;
	}
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
}

const AuthContext = React.createContext({
	token: '',
	isLoggedIn: false,
	isAdmin: false,
	login: (token) => {},
	logout: () => {},
});

let logoutTimer;

const retrieveToken = (token, time) => {
	const remainingTime = calculateRemainingTime(time);
	if (remainingTime <= 6000) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return {
		token,
		duration: remainingTime,
	};
};

export function AuthContextProvider(props) {
	const [token, setToken] = useState();
	const [isAdmin, setIsAdmin] = useState(false);
	const userIsLoggedIn = !!token;
	let tokenData;

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedExpiration = localStorage.getItem('expirationTime');
		tokenData = retrieveToken(storedToken, storedExpiration);
		const initialToken = tokenData?.token ? tokenData.token : null;
		setToken(initialToken);
		const obj = parseJwt(initialToken);
		if (obj?.['userType'] === 'Admin') {
			setIsAdmin(true);
		}
	}, []);

	const logoutHandler = useCallback(() => {
		setToken(null);
		setIsAdmin(false);
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (tokenInput, expirationTime, userType) => {
		localStorage.setItem('token', tokenInput);
		localStorage.setItem('expirationTime', expirationTime);
		setToken(tokenInput);
		const obj = parseJwt(tokenInput);
		if (obj?.['userType'] === 'Admin') {
			setIsAdmin(true);
		}

		const remainingTime = calculateRemainingTime(expirationTime);
		logoutTimer = setTimeout(logoutHandler, remainingTime);
	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const contextValue = {
		token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		isAdmin,
	};
	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
}

export default AuthContext;
