import key from './key';
const apiKey = key;

const searchResultRequest = async (query) => {
	query = query.replace(/ /g, '_');

	let request = await fetch(
		`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=10`
	);
	let response = await request.json();
	let results = response.results;
	return results;
};

const recipeCardRequest = async (id) => {
	let request = await fetch(
		`https://api.spoonacular.com/recipes/${id}/card?apiKey=${apiKey}`
	);
	let response = await request.json();
	return response;
};

// ****************** API REQUESTS THAT I MAY USE LATER **************************

// const ingredients = async (id) => {
// 	let request = await fetch(
// 		`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${apiKey}`
// 	);
// 	let response = await request.json();
// 	// let steps = response[0].steps;
// 	let ingredientsArray = [];
// 	let ingredients = response.ingredients.map((e) => {
// 		console.log(e.amount.us.value, e.amount.us.unit, e.name);
// 		ingredientsArray.push([e.amount.us.value, e.amount.us.unit, e.name]);
// 	});
// 	return ingredientsArray;
// };

// const instructions = async (id) => {
// 	let request = await fetch(
// 		`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`
// 	);
// 	let response = await request.json();
// 	return response;
// };

export { searchResultRequest, recipeCardRequest };
