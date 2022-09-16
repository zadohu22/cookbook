import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from './Api';
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
	getDoc,
} from 'firebase/firestore';

const HomeSignedIn = (props) => {
	let arr = [];

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		let query = e.target.userInput.value;
		let cleanedQuery = query.replace(/ /g, '_');
		props.setSearchQuery(cleanedQuery);
		props.setApiData(await api(cleanedQuery));
		navigate('/searchresults');
	};

	// Loads chat messages history and listens for upcoming ones.
	function loadCookBook() {
		// Create the query to load the last 12 messages and listen for new ones.
		const cookBookQuery = query(
			collection(getFirestore(), 'recipes'),
			// orderBy('timestamp', 'desc'),
			limit(10)
		);
		// Start listening to the query.
		onSnapshot(cookBookQuery, function (snapshot) {
			snapshot.docChanges().forEach(function (change) {
				if (change.type === 'removed') {
					//   deleteMessage(change.doc.id);
				} else {
					let recipe = change.doc.data();
					arr.push(recipe);
					console.log(arr);
					// displayCookBook(recipe.id, recipe.image, recipe.title);
				}
			});
		});
	}
	loadCookBook();
	return (
		<>
			<div className='h-[92%] flex flex-col items-center'>
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
			</div>
			{/* <Api /> */}
		</>
	);
};

export default HomeSignedIn;
