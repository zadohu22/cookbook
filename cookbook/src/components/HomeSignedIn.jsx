import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchResultRequest } from './Api';
import { UserAuth } from '../context/AuthContext';
import { FallingLines } from 'react-loader-spinner';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import {
	getFirestore,
	collection,
	addDoc,
	query,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	where,
	serverTimestamp,
	getDoc,
	getDocs,
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
		props.setSearchQuery(cleanedQuery);
		props.setApiData(await searchResultRequest(cleanedQuery));
		navigate('/searchresults');
	};

	const handleClick = (event) => {
		// navigate('/recipeCard', { state: { }})
		console.log(event.target);
	};

	// useEffect(() => {
	// 	const cookBookQuery = query(
	// 		collection(getFirestore(), 'recipes'),
	// 		limit(50)
	// 	);
	// 	onSnapshot(cookBookQuery, function (snapshot) {
	// 		snapshot.docChanges().forEach(function (change) {
	// 			if (change.type === 'removed') {
	// 				//   deleteMessage(change.doc.id);
	// 			} else {
	// 				let recipe = change.doc.data();
	// 				arr.push(recipe);
	// 				setRecipes((prev) => [...prev, change.doc.data()]);
	// 			}
	// 		});
	// 	});
	// }, []);

	useEffect(() => {
		// const cookBookQuery = query(
		// 	collection(getFirestore(), 'users', `${user.uid}`, 'recipes'),
		// 	limit(50)
		// );
		// onSnapshot(cookBookQuery, function (snapshot) {
		// 	snapshot.docChanges().forEach(function (change) {
		// 		if (change.type === 'removed') {
		// 			//   deleteMessage(change.doc.id);
		// 		} else {
		// 			let recipe = change.doc.data();
		// 			arr.push(recipe);
		// 			setRecipes((prev) => [...prev, change.doc.data()]);
		// 		}
		// 	});
		// });
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

				const recipes = await getDocs(currentUserRef);
				setIsLoading(false);

				recipes.forEach((doc) => {
					console.log(doc.id, '=>', doc.data());
					setRecipes((prev) => [...prev, doc.data()]);
				});

				// const docRef = await addDoc(collection(db, currentUser), {
				// 	id: recipeObject.id,
				// 	image: recipeObject.image,
				// 	title: recipeObject.title,
				// 	recipeCard: card,
				// });
				// console.log('write successful', docRef.id);
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
					color='#65c3c8'
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
				{/* {loadCookBook()} */}

				<div className='w-full mt-10 mb-6 grid justify-items-center items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
					{recipes.map((e) => {
						return (
							<div className='flex flex-col justify-center items-center border-2 p-4 rounded-md'>
								<h3
									className='text-lg text-blue-700 hover:cursor-pointer underline mb-4'
									// onClick={handleClick}
								>
									{e.title}
								</h3>
								<img src={e.image} alt='food' />
							</div>
						);
					})}
				</div>
			</div>
			{/* <Api /> */}
		</>
	);
};

export default HomeSignedIn;
