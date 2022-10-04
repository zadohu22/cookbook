import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './components/firestore';

let userRef;
const getRecipesFromDb = async (user) => {
	const currentUser = query(
		collection(db, 'users'),
		where('id', '==', `${user.uid}`)
	);

	const querySnapshot = await getDocs(currentUser);
	querySnapshot.forEach((doc) => {
		if (doc.data().id === `${user.uid}`) {
			userRef = `${doc.id}`;
		}
	});

	const currentUserRef = collection(db, 'users', `${userRef}`, 'recipes');

	const listOfRecipes = await getDocs(currentUserRef);

	return [listOfRecipes, `${userRef}`, currentUserRef];
};

export { getRecipesFromDb };
