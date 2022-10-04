import { addDoc } from 'firebase/firestore';
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { getRecipesFromDb } from '../db';

const Recipe = (props) => {
	const { user } = UserAuth();
	const [clicked, setClicked] = useState(false);
	let includes = false;
	const saveRecipe = async (recipeObject, card) => {
		try {
			const listOfRecipes = await getRecipesFromDb(user);
			console.log(listOfRecipes[0], listOfRecipes[1], listOfRecipes[2]);

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
				setClicked(true);
			}
		} catch (error) {
			console.log('error adding doc', error);
		}
	};
	return (
		<>
			{props.api2Data.url != undefined ? (
				<div className='flex flex-col justify-center items-center'>
					<div className='flex gap-2 w-full justify-center items-center'>
						<button
							onClick={() =>
								saveRecipe(props.indexOfTargetRecipe, props.api2Data.url)
							}
							className='btn btn-primary h-auto text-2xl rounded:md w-2/5 mt-8 mb-8'
						>
							Add To CookBook
						</button>
						{clicked && includes === false && (
							<div className='wrapper'>
								<svg
									className='checkmark'
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 52 52'
								>
									<circle
										className='checkmark__circle'
										cx='26'
										cy='26'
										r='25'
										fill='none'
									/>
									<path
										className='checkmark__check'
										fill='none'
										d='M14.1 27.2l7.1 7.2 16.7-16.8'
									/>
								</svg>
							</div>
						)}
					</div>
					{clicked && includes === true && (
						<h3 className='text-md text-white'>
							This recipe is already in your cookbook!
						</h3>
					)}

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
