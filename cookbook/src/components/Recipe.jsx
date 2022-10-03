import { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { db } from './firestore';

const Recipe = (props) => {
	const { user } = UserAuth();
	const [recipeExists, setRecipeExists] = useState(false);

	// async function saveRecipe(recipeObject, card) {
	// 	// Add a new message entry to the Firebase database.
	// 	try {
	// 		await addDoc(collection(getFirestore(), 'users'), {
	// 			id: recipeObject.id,
	// 			image: recipeObject.image,
	// 			title: recipeObject.title,
	// 			recipeCard: card,
	// 		});
	// 	} catch (error) {
	// 		console.error('Error writing new message to Firebase Database', error);
	// 	}
	// }
	const saveRecipe = async (recipeObject, card) => {
		let userRef;
		try {
			const currentUser = query(
				collection(db, 'users'),
				where('id', '==', `${user.uid}`)
			);

			const querySnapshot = await getDocs(currentUser);
			querySnapshot.forEach((doc) => {
				console.log(doc.id, doc.data().id);
				if (doc.data().id === `${user.uid}`) {
					userRef = doc.id;
				}
			});

			const currentUserRef = collection(db, 'users', `${userRef}`, 'recipes');
			const listOfRecipes = await getDocs(currentUserRef);
			listOfRecipes.forEach((element) => {
				if (element.data().recipeId === recipeObject.id) {
					setRecipeExists(true);
				}
			});
			if (recipeExists === false) {
				await addDoc(currentUserRef, {
					recipeId: recipeObject.id,
					image: recipeObject.image,
					title: recipeObject.title,
					recipeCard: card,
				});
			}
		} catch (error) {
			console.log('error adding doc', error);
		}
	};
	return (
		<>
			{props.api2Data.url !== undefined ? (
				<div className='flex flex-col justify-center items-center'>
					<button
						onClick={() =>
							saveRecipe(props.indexOfTargetRecipe, props.api2Data.url)
						}
						className='btn btn-primary text-2xl rounded:md w-2/5 mt-8 mb-8 h-auto'
					>
						Add To CookBook
					</button>
					<img
						src={props.api2Data.url}
						className='object-contain h-3/4 w-3/4'
						alt='sdf'
					/>
				</div>
			) : (
				<div className='flex justify-center items-center mt-4'>
					<h2>
						Im sorry, I'm having trouble finding the recipe for{' '}
						{props.indexOfTargetRecipe.title} :(
					</h2>
				</div>
			)}
		</>
	);
};

export default Recipe;
