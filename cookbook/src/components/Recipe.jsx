import React from 'react';

const Recipe = (props) => {
	console.log(props.api2Data.url);
	return (
		// <div className={`w-full h-full bg[url(${props.api2Data.url})]`}>
		// 	whyyyyy
		// </div>
		<img src={props.api2Data.url} alt='sdf' />
	);
};

export default Recipe;
