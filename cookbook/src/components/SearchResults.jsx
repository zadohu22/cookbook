/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { api2 } from './Api';
import { useNavigate } from 'react-router-dom';

const SearchResults = (props) => {
	const navigate = useNavigate();
	console.log(props.apiData);

	const handleClick = async (id, index) => {
		props.setApi2Data(await api2(id));
		props.setIndexOfTargetRecipe(props.apiData[index]);
		// props.setIndexOfTargetRecipe(id);

		console.log(props.apiData[index]);
		navigate('/recipe');
	};
	const info = props.apiData.map(
		(element, index) => (
			<div className='flex flex-col justify-center items-center'>
				<img src={element.image} className='h-52 w-52 object-contain' />
				<h3
					onClick={async () => await handleClick(element.id, index)}
					className='text-blue-600 text=xl underline cursor-pointer'
				>
					{element.title}
				</h3>
			</div>
		)

		// </div>;
	);

	return (
		<div className='flex flex-col gap-2'>
			<p>search results for {props.searchQuery}</p>
			{/* {console.log(props.apiData)} */}
			<div className='h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center items-center'>
				{info}
				{/* <img
					src={props.apiData[0].image}
					alt='blah'
					className='h-52 w-52 object-contain'
				/>
				<h3 href='#' className='text-blue-600 text-xl underline'>
					{props.apiData[0].title}
				</h3> */}
			</div>
		</div>
	);
};

export default SearchResults;
