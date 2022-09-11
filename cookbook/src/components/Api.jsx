import React from 'react';
import key from './key';

const Api = () => {
	let apiKey = key;
	const call = async () => {
		let request = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=beef_stew&number=2`
		);
		let response = await request.json();
		let results = response.results;
		console.log(results[0].title);
	};
	call();
	return <div>Api</div>;
};

export default Api;
