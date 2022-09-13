import key from './key';
const apiKey = key;

const api = async (query) => {
	query = query.replace(/ /g, '_');

	let request = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=12`
	);
	let response = await request.json();
	let results = response.results;
	return results;
};

const api2 = async (id) => {
	// let request = await fetch(
	// 	`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`
	// );
	let request = await fetch(
		`https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKey}`
	);
	let response = await request.json();
	return response;
};

export { api, api2 };
