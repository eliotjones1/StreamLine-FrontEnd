import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { StreamLineAxios } from 'api/axios.config';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isLoggedIn: true,
				isAdmin: action.payload.isAdmin,
			};
		case 'LOGOUT':
			return {
				...state,
				isLoggedIn: false,
				isAdmin: false,
			};
		default:
			return state;
	}
};

export const LoginContext = createContext();

export default function LoginProvider({ children }) {
	const nav = useNavigate();
	const [state, dispatch] = useReducer(authReducer, {
		isLoggedIn: false,
		isAdmin: false,
	});

	useEffect(() => {
		checkLoginStatus();
	}, []);

	const checkLoginStatus = async () => {
		try {
			await StreamLineAxios.get('/settings/is-authenticated/');
			dispatch({ type: 'LOGIN', payload: { isAdmin: false } });
		} catch (error) {
			dispatch({ type: 'LOGOUT' });
		}
	};

	const signUp = async (userData) => {
		await StreamLineAxios.post('/auth/register/', userData);
		login(userData);
	};

	const login = async (userData) => {
		await StreamLineAxios.post('/auth/login/', userData);
		dispatch({ type: 'LOGIN', payload: { isAdmin: false } });
		nav('/user-dash');
	};

	const logout = async () => {
		await StreamLineAxios.post('/auth/logout/', {});
		dispatch({ type: 'LOGOUT' });
		nav('/');
	};

	const resetPassword = async (email) => {
		await StreamLineAxios.post('/auth/password_reset/', { email: email });
		nav('/signin');
	};

	const confirmedReset = async (authData) => {
		await StreamLineAxios.post('/auth/password_reset/confirm/', authData);
		nav('/signin');
	};

	return (
		<LoginContext.Provider
			value={{
				isLoggedIn: state.isLoggedIn,
				isAdmin: state.isAdmin,
				login,
				logout,
				resetPassword,
				signUp,
				confirmedReset,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
}

LoginProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
