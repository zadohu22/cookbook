import { addDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { getRecipesFromDb } from '../db';

const Recipe = (props) => {
	const { user } = UserAuth();
	const saveRecipe = async (recipeObject, card) => {
		try {
			const listOfRecipes = await getRecipesFromDb(user);
			console.log(listOfRecipes[0], listOfRecipes[1], listOfRecipes[2]);
			let includes = false;
			listOfRecipes[0].forEach((element) => {
				if (element.data().recipeId === recipeObject.id) {
					includes = true;
				}
			});
			if (includes === false) {
				await addDoc(listOfRecipes[2], {
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
			{props.api2Data.url != undefined ? (
				<div className='flex flex-col justify-center items-center'>
					<button
						onClick={() =>
							saveRecipe(props.indexOfTargetRecipe, props.api2Data.url)
						}
						className='btn btn-primary h-auto text-2xl rounded:md w-2/5 mt-8 mb-8'
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
