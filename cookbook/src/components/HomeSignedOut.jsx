import React from 'react';
import SignIn from './SignIn';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// import foodPicture from '../brooke-lark-08bOYnH_r_E-unsplash.jpg';

const HomeSignedOut = (props) => {
	// const auth = getAuth();
	// onAuthStateChanged(auth, (user) => {
	// 	if (user) {
	// 		// User is signed in, see docs for a list of available properties
	// 		// https://firebase.google.com/docs/reference/js/firebase.User
	// 		const uid = user.uid;
	// 		console.log(uid);
	// 	} else {
	// 		console.log('signed out');
	// 	}
	// });
	return (
		<>
			<div
				className={`h-full w-full flex justify-center items-center bg-[url('./brooke-lark-08bOYnH_r_E-unsplash.jpg')] bg-[40%_center] bg-cover `}
			>
				<div className='flex justify-center items-center border h-4/6 w-60 bg-opacity-70 bg-gray-300 rounded-md border-primary sm:ml-60 sm:w-80'>
					<div className='signInPageTitle text-3xl'>CookBook</div>
					<SignIn setIsLoggedIn={props.setIsLoggedIn} />
				</div>
			</div>
		</>
	);
};

export default HomeSignedOut;
