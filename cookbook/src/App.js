import React, { useState } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Nav from './components/Nav';
import RouteSwitch from './components/RouteSwitch';
import { UserAuth } from './context/AuthContext';

const App = () => {
	const { user } = UserAuth();

	return (
		<>
			<AuthContextProvider>
				<Router>
					{user && <Nav />}
					<RouteSwitch />
				</Router>
			</AuthContextProvider>
		</>
	);
};

export default App;
