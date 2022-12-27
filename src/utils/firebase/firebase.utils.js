import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
// GoogleAuthProvider is a classwe get from firebase authentication and it is connected to Google auth itself

provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);