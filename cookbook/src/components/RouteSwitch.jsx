import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSignedIn from './HomeSignedIn';
import HomeSignedOut from './HomeSignedOut';
import SearchResults from './SearchResults';
import Nav from './Nav';
import Recipe from './Recipe';
import Protected from './Protected';

const RouteSwitch = (props) => {
	const [apiData, setApiData] = useState([]);
	const [api2Data, setApi2Data] = useState(0);
	const [ingredients, setIngredients] = useState([]);
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
							setIngredients={setIngredients}
							ingredients={ingredients}
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
			{/* {localStorage.getItem('login') === true && (
				<Route
					path='/nav'
					element={<Nav setIsLoggedIn={props.setIsLoggedIn} />}
				/>
			)} */}
		</Routes>
	);
};

export default RouteSwitch;
