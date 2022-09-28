import { useContext, createContext, useEffect, useState } from 'react';
import {
	GoogleAuthProvider,
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../components/firestore';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { db } from '../components/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((cred) => {
			return addDoc(collection(getFirestore(), 'users'), {
				id: cred.user.uid,
			});
		});

		// signInWithRedirect(auth, provider);
	};

	const logOut = () => {
		signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const test = () => {};
	test();

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
