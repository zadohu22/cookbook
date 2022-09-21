import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = (props) => {
	let navigate = useNavigate();
	console.log(localStorage.getItem('login'));
	// useEffect(() => {
	// 	props.setIsLoggedIn(localStorage.getItem('login'));
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem('login', props.isLoggedIn);
	// 	// console.log(localStorage.getItem('login'));
	// 	console.log('useEffect');
	// }, [props.isLoggedIn]);

	async function signIn() {
		// Sign in Firebase using popup auth and Google as the identity provider.
		let provider = new GoogleAuthProvider();
		await signInWithPopup(getAuth(), provider);
		await props.setIsLoggedIn(true);
		localStorage.setItem('login', true);
		console.log(localStorage.getItem('login'));
		navigate('/home');
	}
	return (
		<button className='btn btn-primary rounded-md' onClick={signIn}>
			Sign In
		</button>
	);
};

export default SignIn;
