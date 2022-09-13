import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import HomeSignedIn from './components/HomeSignedIn';
import HomeSignedOut from './components/HomeSignedOut';
import Nav from './components/Nav';
import RouteSwitch from './components/RouteSwitch';

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	return (
		<>
			<Router>
				{isLoggedIn && <Nav setIsLoggedIn={setIsLoggedIn} />}
				<RouteSwitch isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
			</Router>
		</>
	);
};

export default App;
