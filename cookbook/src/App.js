import React from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './components/firebase-config';

// TODO: Replace the following with your app's Firebase project configuration

const app = initializeApp(firebaseConfig);

const App = () => {
	return <div className='text-green-700'>App</div>;
};

export default App;
