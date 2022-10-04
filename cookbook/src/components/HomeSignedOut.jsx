import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const HomeSignedOut = (props) => {
	const { googleSignIn, user } = UserAuth();

	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();

			console.log(user.uid);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user != null) {
			navigate('/home');
		}
		console.log(user);
	}, [user]);

	return (
		<>
			<div
				className={`h-full w-full flex justify-center items-center bg-[url('./brooke-lark-08bOYnH_r_E-unsplash.jpg')] bg-[40%_center] bg-cover `}
			>
				<div className='flex justify-center items-center border h-4/6 w-72 bg-opacity-70 bg-gray-300 rounded-md border-primary md:w-96 md:ml-96'>
					<div className='signInPageTitle text-3xl text-[#0f1729]'>
						CookBook
					</div>
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
