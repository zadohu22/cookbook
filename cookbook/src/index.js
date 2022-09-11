import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './components/firebase-config';
import SignIn from './components/SignIn';
import HomeSignedOut from './components/HomeSignedOut';
import HomeSignedIn from './components/HomeSignedIn';
import Nav from './components/Nav';
import Api from './components/Api';
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		{/* <HomeSignedOut /> */}
		<Nav />
		{/* <HomeSignedIn /> */}
		<Api />
	</>
);

initializeApp(firebaseConfig);
