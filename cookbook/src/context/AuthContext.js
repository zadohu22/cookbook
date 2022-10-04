import { useContext, createContext, useEffect, useState } from 'react';
import {
	GoogleAuthProvider,
	signInWithPopup,
	// signInWithRedirect,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../components/firestore';
import {
	getFirestore,
	collection,
	addDoc,
	query,
	where,
	getDocs,
} from 'firebase/firestore';
import { db } from '../components/firestore';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});
	const googleSignIn = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider).then((cred) => {
			let userExists = false;
			const checkIfUserExists = async () => {
				const currentUser = query(
					collection(db, 'users'),
					where('id', '==', `${cred.user.uid}`)
				);

				const querySnapshot = await getDocs(currentUser);

				querySnapshot.forEach((doc) => {
					if (doc.data().id === cred.user.uid) {
						userExists = true;
						console.log('USER EXISTS', userExists);
					}
				});
				if (userExists === false) {
					addDoc(collection(getFirestore(), 'users'), {
						id: cred.user.uid,
					});
				}
			};
			checkIfUserExists();
		});
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
