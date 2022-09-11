import React from 'react';
import SignIn from './SignIn';
// import foodPicture from '../brooke-lark-08bOYnH_r_E-unsplash.jpg';

const HomeSignedOut = () => {
	return (
		<>
			<div
				className={`h-full w-full flex justify-center items-center bg-[url('./brooke-lark-08bOYnH_r_E-unsplash.jpg')] bg-[40%_center] bg-cover `}
			>
				<div className='flex justify-center items-center border h-4/6 w-60 bg-opacity-70 bg-gray-300 rounded-md border-primary sm:ml-60 sm:w-80'>
					<div className='signInPageTitle text-3xl'>CookBook</div>
					<SignIn />
				</div>
			</div>
		</>
	);
};

export default HomeSignedOut;
