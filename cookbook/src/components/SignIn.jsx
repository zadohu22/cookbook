import React from 'react';
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const SignIn = () => {
	async function signIn() {
		// Sign in Firebase using popup auth and Google as the identity provider.
		let provider = new GoogleAuthProvider();
		await signInWithPopup(getAuth(), provider);
	}
	return (
		<button className='btn btn-primary rounded-md' onClick={signIn}>
			Sign In
		</button>
	);
};

export default SignIn;
