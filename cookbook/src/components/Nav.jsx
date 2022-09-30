/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Nav = (props) => {
	const { logOut, user } = UserAuth();
	const navigate = useNavigate();
	const handleClick = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
		console.log('logout', user);
		// await props.setIsLoggedIn(false);
		navigate('/');
	};

	const handleRouteClick = () => {
		navigate('/home');
	};

	// const auth = getAuth();
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
	// 		// User is signed in, see docs for a list of available properties
	// 		// https://firebase.google.com/docs/reference/js/firebase.User
	// 		const uid = user.uid;
	// 		console.log(uid);
	// 	} else {
	// 		console.log('not signed in');
	// 	}
	// });
	return (
		<>
			<div className='navbar sticky top-0 z-10 bg-primary text-primary-content flex h-[5%] justify-between'>
				<a
					className='btn btn-ghost normal-case text-xl rounded-md'
					onClick={handleRouteClick}
				>
					CookBook
				</a>
				<a
					onClick={handleClick}
					className='btn btn-ghost normal-case text-xl rounded-md'
				>
					Sign Out
				</a>
			</div>
		</>
	);
};

export default Nav;
