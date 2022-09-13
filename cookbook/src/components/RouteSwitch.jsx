import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSignedIn from './HomeSignedIn';
import HomeSignedOut from './HomeSignedOut';
import SearchResults from './SearchResults';
import Nav from './Nav';
import Recipe from './Recipe';

const RouteSwitch = (props) => {
	const [apiData, setApiData] = useState([]);
	const [api2Data, setApi2Data] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	return (
		<Routes>
			<Route
				path='/'
				element={<HomeSignedOut setIsLoggedIn={props.setIsLoggedIn} />}
			/>
			<Route
				path='/home'
				element={
					<HomeSignedIn
						setApiData={setApiData}
						apiData={apiData}
						setSearchQuery={setSearchQuery}
					/>
				}
			/>
			<Route
				path='/searchresults'
				element={
					<SearchResults
						apiData={apiData}
						searchQuery={searchQuery}
						setApi2Data={setApi2Data}
						api2Data={api2Data}
					/>
				}
			/>

			<Route path='/recipe' element={<Recipe api2Data={api2Data} />} />
			{props.isLoggedIn && (
				<Route
					path='/nav'
					element={<Nav setIsLoggedIn={props.setIsLoggedIn} />}
				/>
			)}
		</Routes>
	);
};

export default RouteSwitch;
