/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { recipeCardRequest } from './Api';
import { useNavigate } from 'react-router-dom';

const SearchResults = (props) => {
	const navigate = useNavigate();
	console.log(props.apiData);

	const handleClick = async (id, index) => {
		props.setApi2Data(await recipeCardRequest(id));
		props.setIndexOfTargetRecipe(props.apiData[index]);
		navigate('/recipe');
	};
	const info = props.apiData.map((element, index) => (
		<div className='flex flex-col justify-center items-center'>
			<img
				src={element.image}
				className='h-52 w-52 object-contain'
				alt='search results'
			/>
			<h3
				onClick={async () => await handleClick(element.id, index)}
				className='text-blue-600 text=xl underline cursor-pointer'
			>
				{element.title}
			</h3>
		</div>
	));

	return (
		<div className='flex flex-col gap-2'>
			<p>search results for {props.searchQuery}</p>
			<div className='h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center'>
				{info}
			</div>
		</div>
	);
};

export default SearchResults;
