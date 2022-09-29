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
			const exists = async () => {
				const currentUser = query(
					collection(db, 'users'),
					where('id', '==', `${cred.user.uid}`)
				);

				const querySnapshot = await getDocs(currentUser);
				querySnapshot.forEach((doc) => {
					// if doc.data().id === user.uid set some varaible to true

					// then only add to collection if that variable is true

					//or something. try to avoid doing it that way probably..
					console.log(doc.id, doc.data().id);
				});
			};
			exists();

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
