/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Nav = (props) => {
	const navigate = useNavigate();
	const handleClick = async () => {
		await signOut(getAuth());
		await props.setIsLoggedIn(false);
		navigate('/');
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
			<div className='navbar bg-primary text-primary-content flex h-[5%] justify-between'>
				<a className='btn btn-ghost normal-case text-xl'>CookBook</a>
				<a onClick={handleClick} className='btn btn-ghost normal-case text-xl'>
					Sign Out
				</a>
			</div>
		</>
	);
};

export default Nav;
