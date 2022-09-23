import React, { useState } from 'react';
import { ingredients, instructions } from './Api';
import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore';

const Recipe = (props) => {
	console.log(props.api2Data.url);
	console.log(props.indexOfTargetRecipe);

	const [food, setFood] = useState([]);

	let ingredientsList = async () => {
		let data = await ingredients(props.indexOfTargetRecipe.id);
		setFood(data);
		console.log('state change');
		// 	// <div>
		// 	// 	{data.map((e) => {
		// 	// 		e.map((i) => {
		// 	// 			return <p>{i}</p>;
		// 	// 		});
		// 	// 	})}
		// 	// </div>
		// 	return data;
	};

	ingredientsList();
	console.log(food);

	async function saveRecipe(recipeObject) {
		// Add a new message entry to the Firebase database.
		try {
			await addDoc(collection(getFirestore(), 'recipes'), {
				id: recipeObject.id,
				image: recipeObject.image,
				title: recipeObject.title,
			});
		} catch (error) {
			console.error('Error writing new message to Firebase Database', error);
		}
	}
	return (
		// <div className={`w-full h-full bg[url(${props.api2Data.url})]`}>
		// 	whyyyyy
		// </div>
		<div className='flex flex-col justify-center items-center'>
			<button
				onClick={() => saveRecipe(props.indexOfTargetRecipe)}
				className='btn btn-primary text-2xl rounded:md w-2/5 mt-8 mb-8'
			>
				Add To CookBook
			</button>
			<img src={props.indexOfTargetRecipe.image} alt='dish' />
			{/* <img
				src={props.api2Data.url}
				className='object-contain h-full w-full'
				alt='sdf'
			/> */}
		</div>
	);
};

export default Recipe;
