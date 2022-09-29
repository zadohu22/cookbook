import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/AuthContext';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './components/firebase-config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<>
		<AuthContextProvider>
			<App />
		</AuthContextProvider>
	</>
);

initializeApp(firebaseConfig);
