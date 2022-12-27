import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import {
	auth,
	signInWithGooglePopup,
	signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	useEffect(
		() => async () => {
			const response = await getRedirectResult(auth);
			if (response) {
				const userDocRef = await createUserDocumentFromAuth(response.user);
			}
		},
		[] // pass [] here means run the callback function once when SignIn component mounts for the first time
	); 

	const logGooglePopupUser = async () => {
		// whenever you make call to some database, this is going to be async
		// const response = await signInWithGooglePopup();
		// const userDocRef = await createUserDocumentFromAuth(response.user);

		const { user } = await signInWithGooglePopup();
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	// const logGoogleRedirectUser = async () => {
	// 	// whenever you make call to some database, this is going to be async
	// 	// const response = await signInWithGooglePopup();
	// 	// const userDocRef = await createUserDocumentFromAuth(response.user);

	//     const { user } = await signInWithGoogleRedirect();
	//     console.log({ user });
	// 	// const userDocRef = await createUserDocumentFromAuth(user);
	// };

	return (
		<div>
			<h1>Sign IN</h1>
			<button onClick={logGooglePopupUser}>Sign in with Google Popup</button>
			<button onClick={signInWithGoogleRedirect}>
				Sign in with Google Redirect
			</button>
		</div>
	);
};

export default SignIn;
