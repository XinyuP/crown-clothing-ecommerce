import { initializeApp } from 'firebase/app';

import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from 'firebase/auth';

// doc - get the document instance
// getDoc/setDoc - access the data on the document
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB-3QRWRb6-8MX5xKm6Ru627votPW9woDk',
	authDomain: 'crown-clothing-db-2110f.firebaseapp.com',
	projectId: 'crown-clothing-db-2110f',
	storageBucket: 'crown-clothing-db-2110f.appspot.com',
	messagingSenderId: '217759527095',
	appId: '1:217759527095:web:38b197da2ba6feef9f5d32',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// GoogleAuthProvider is a   get from firebase authentication and it is connected to Google auth itself
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

// this is the database we are going to pass, it is directly points to our database inside of console
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef); // already pointing to a specific place in a collection
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	// first check if user data exists
	// if not exists, create the document with the data from user in my collection using userSnapshot
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date(); // record when the user is signing in

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
                createdAt,
                ...additionalInformation,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}

	// if exists, return back userDocRef
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
