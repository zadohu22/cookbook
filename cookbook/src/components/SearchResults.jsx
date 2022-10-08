/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { recipeCardRequest, searchResultRequest } from './Api';
import { useNavigate } from 'react-router-dom';

const SearchResults = (props) => {
	const navigate = useNavigate();
	const [searchData, setSearchData] = useState([]);
	const cleanedQuery = localStorage.getItem('cleanedQuery');
	const dirtyQuery = localStorage.getItem('dirtyQuery');

	useEffect(() => {
		const searchRecipes = async () => {
			let response = await searchResultRequest(cleanedQuery);
			setSearchData(response);
		};
		searchRecipes();
	}, [cleanedQuery]);

	const handleClick = async (id, index) => {
		props.setApi2Data(await recipeCardRequest(id));
		props.setIndexOfTargetRecipe(props.apiData[index]);
		navigate('/recipe');
	};

	const info = searchData.map((element, index) => (
		<div
			key={element.id}
			className='flex flex-col h-[360px] justify-center items-center border-2 p-4 rounded-md max-w-[350px]'
		>
			<h3
				onClick={async () => await handleClick(element.id, index)}
				className='text-sm font-bold text-center text-[#3abff8] hover:cursor-pointer underline mb-4'
			>
				{element.title}
			</h3>
			<img src={element.image} className='max-w-[350px]' alt='search results' />
		</div>
	));

	return (
		<div className='flex flex-col gap-2 justify-center items-center mt-6'>
			<p className='text-xl'>Search results for: {dirtyQuery}</p>
			<div className='w-full mt-10 mb-6 grid justify-items-center items-center grid-cols-1 small:grid-cols-2 md:grid-cols-3 gap-6'>
				{info}
			</div>
		</div>
	);
};

export default SearchResults;
