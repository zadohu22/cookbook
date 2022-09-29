import React from 'react';

const recipeCard = () => {
	return (
		<img
			src={props.api2Data.url}
			className='object-contain h-3/4 w-3/4'
			alt='sdf'
		/>
	);
};

export default recipeCard;
