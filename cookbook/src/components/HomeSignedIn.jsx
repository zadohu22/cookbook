import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchResultRequest } from './Api';
import { UserAuth } from '../context/AuthContext';
import { FallingLines } from 'react-loader-spinner';
import {
	collection,
	query,
	where,
	getDocs,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { db } from './firestore';

const HomeSignedIn = (props) => {
	const { user } = UserAuth();
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecipes] = useState([]);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let query = e.target.userInput.value;
		let cleanedQuery = query.replace(/ /g, '_');
		localStorage.setItem('cleanedQuery', cleanedQuery);
		localStorage.setItem('dirtyQuery', query);
		props.setSearchQuery(cleanedQuery);
		props.setApiData(await searchResultRequest(cleanedQuery));
		navigate('/searchresults', {
			state: { recipeArr: recipes },
		});
	};

	const handleClick = (recipeCard) => {
		navigate('/recipeCard', {
			state: { card: recipeCard },
		});
	};

	const handleDelete = async (index) => {
		let userRef;
		let targetRecipe = recipes[index].recipeId;
		try {
			const currentUser = query(
				collection(db, 'users'),
				where('id', '==', `${user.uid}`)
			);

			const querySnapshot = await getDocs(currentUser);
			querySnapshot.forEach((doc) => {
				if (doc.data().id === `${user.uid}`) {
					userRef = `${doc.id}`;
				}
			});

			const currentUserRef = collection(db, 'users', `${userRef}`, 'recipes');

			const listOfRecipes = await getDocs(currentUserRef);
			listOfRecipes.forEach(async (recipe) => {
				if (`${recipe.data().recipeId}` === `${targetRecipe}`) {
					await deleteDoc(doc(db, 'users', `${userRef}`, 'recipes', recipe.id));
					let filtered = recipes.filter((_, i) => i !== index);
					setRecipes(filtered);
				}
			});
		} catch (error) {
			console.log('error deleting', error);
		}
	};

	useEffect(() => {
		const getRecipes = async () => {
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

				setRecipes([]);
				listOfRecipes.forEach((doc) => {
					setRecipes((prev) => [...prev, doc.data()]);
				});
				setIsLoading(false);
			} catch (error) {
				console.log('error adding doc', error);
			}
		};
		getRecipes();
	}, [isLoading]);

	if (isLoading) {
		return (
			<div className='h-full w-full flex justify-center items-center'>
				<FallingLines
					color='#3abff8'
					width='100'
					visible={true}
					ariaLabel='falling-lines-loading'
				/>
			</div>
		);
	}
	return (
		<>
			<div className='h-full flex flex-col items-center'>
				<div>
					<form onSubmit={handleSubmit} className='form-control mt-10'>
						<div className='input-group'>
							<input
								type='text'
								placeholder='Search for new Recipes'
								className='input input-bordered hover:outline-none focus:outline-none active:outline-none'
								name='userInput'
							/>
							<button
								type='submit'
								className='btn btn-square bg-primary hover:bg-secondary'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='black'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
									/>
								</svg>
							</button>
						</div>
					</form>
				</div>
				<h1 className='text-3xl mt-4'>Your CookBook</h1>

				<div className='w-full mt-10 mb-6 grid justify-items-center items-center grid-cols-1 small:grid-cols-2 md:grid-cols-3 gap-6'>
					{recipes.length === 0 ? (
						<div className='flex w-full justify-center items-center text-center col-span-3'>
							<h1>
								You haven't added any recipes yet, search for recipes above!
							</h1>
						</div>
					) : (
						recipes.map((e, i) => {
							return (
								<div
									key={i}
									className='flex flex-col h-[360px] justify-center items-center border-2 p-4 rounded-md max-w-[350px]'
								>
									<h3
										className='text-sm font-bold text-center text-[#3abff8] hover:cursor-pointer underline mb-4'
										onClick={() => handleClick(e.recipeCard)}
									>
										{e.title}
									</h3>
									<img src={e.image} alt='food' className='max-w-[350px]' />
									<button
										key={i}
										className='btn btn-sm btn-primary btn-outline mt-4'
										onClick={() => handleDelete(i)}
									>
										Delete Recipe
									</button>
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
};

export default HomeSignedIn;
