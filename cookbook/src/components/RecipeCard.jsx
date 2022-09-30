import React from 'react';
import { useLocation } from 'react-router-dom';

const RecipeCard = () => {
	const location = useLocation();

	return (
		<img
			src={location.state.card}
			className='object-contain h-full w-full'
			alt='recipe'
		/>
	);
};

export default RecipeCard;
