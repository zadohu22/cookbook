import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { UserAuth } from '../context/AuthContext';

// import foodPicture from '../brooke-lark-08bOYnH_r_E-unsplash.jpg';

const HomeSignedOut = (props) => {
	const { googleSignIn, user } = UserAuth();
	const [isSignedIn, setIsSignedIn] = useState(false);

	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
			navigate('/home');
			console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	// useEffect(() => {
	// 	navigate('/home');
	// }, [user]);

	return (
		<>
			<div
				className={`h-full w-full flex justify-center items-center bg-[url('./brooke-lark-08bOYnH_r_E-unsplash.jpg')] bg-[40%_center] bg-cover `}
			>
				<div className='flex justify-center items-center border h-4/6 w-60 bg-opacity-70 bg-gray-300 rounded-md border-primary sm:ml-60 sm:w-80'>
					<div className='signInPageTitle text-3xl'>CookBook</div>
					<button
						className='btn btn-primary rounded-md'
						onClick={handleGoogleSignIn}
					>
						Sign In
					</button>
				</div>
			</div>
		</>
	);
};

export default HomeSignedOut;
