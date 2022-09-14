import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
} from 'firebase/firestore';

// Saves a new message to Cloud Firestore.

export default async function saveRecipe(recipeObject) {
	// Add a new message entry to the Firebase database.
	try {
		await addDoc(collection(getFirestore(), 'recipes'), {
			// name: getUserName(),
			text: messageText,
			profilePicUrl: getProfilePicUrl(),
			timestamp: serverTimestamp(),
		});
	} catch (error) {
		console.error('Error writing new message to Firebase Database', error);
	}
}