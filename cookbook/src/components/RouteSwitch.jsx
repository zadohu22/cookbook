import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeSignedIn from './HomeSignedIn';
import HomeSignedOut from './HomeSignedOut';
import SearchResults from './SearchResults';
import Recipe from './Recipe';
import Protected from './Protected';

const RouteSwitch = (props) => {
	const [apiData, setApiData] = useState([]);
	const [api2Data, setApi2Data] = useState(0);
	const [searchQuery, setSearchQuery] = useState('');
	const [indexOfTargetRecipe, setIndexOfTargetRecipe] = useState({});
	const [idOfTargetRecipe, setIdOfTargetRecipe] = useState(0);
	return (
		<Routes>
			<Route path='/' element={<HomeSignedOut />} />

			<Route
				path='/home'
				element={
					<Protected>
						<HomeSignedIn
							setApiData={setApiData}
							apiData={apiData}
							setSearchQuery={setSearchQuery}
						/>
					</Protected>
				}
			/>
			<Route
				path='/searchresults'
				element={
					<Protected>
						<SearchResults
							apiData={apiData}
							searchQuery={searchQuery}
							setApi2Data={setApi2Data}
							api2Data={api2Data}
							setIndexOfTargetRecipe={setIndexOfTargetRecipe}
							setIdOfTargetRecipe={setIdOfTargetRecipe}
						/>
					</Protected>
				}
			/>

			<Route
				path='/recipe'
				element={
					<Protected>
						<Recipe
							api2Data={api2Data}
							apiData={apiData}
							indexOfTargetRecipe={indexOfTargetRecipe}
							idOfTargetRecipe={idOfTargetRecipe}
						/>
					</Protected>
				}
			/>
		</Routes>
	);
};

export default RouteSwitch;
