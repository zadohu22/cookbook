import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const SignIn = (props) => {
	let navigate = useNavigate();

	async function signIn() {
		// Sign in Firebase using popup auth and Google as the identity provider.
		let provider = new GoogleAuthProvider();
		await signInWithPopup(getAuth(), provider);
		await props.setIsLoggedIn(true);
		navigate('/home');
	}
	return (
		<button className='btn btn-primary rounded-md' onClick={signIn}>
			Sign In
		</button>
	);
};

export default SignIn;
