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

async function saveRecipe(recipeObject) {
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

const displayCookBook = (id, timestamp, name, text, img) => {
	return (
		<div>
			{id} {timestamp} {name} {text} {img}
		</div>
	);
};

// Loads chat messages history and listens for upcoming ones.
function loadCookBook() {
	// Create the query to load the last 12 messages and listen for new ones.
	const cookBookQuery = query(
		collection(getFirestore(), 'recipes'),
		orderBy('timestamp', 'desc'),
		limit(10)
	);

	// Start listening to the query.
	onSnapshot(cookBookQuery, function (snapshot) {
		snapshot.docChanges().forEach(function (change) {
			if (change.type === 'removed') {
				//   deleteMessage(change.doc.id);
			} else {
				var recipe = change.doc.data();
				displayCookBook(
					change.doc.id,
					recipe.timestamp,
					recipe.name,
					recipe.text,
					recipe.profilePicUrl,
					recipe.imageUrl
				);
			}
		});
	});
}
