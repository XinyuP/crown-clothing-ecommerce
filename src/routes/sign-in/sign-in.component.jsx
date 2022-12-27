// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';

import {
	auth,
	signInWithGooglePopup,
	// signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
	// useEffect(
	// 	() => async () => {
	// 		const response = await getRedirectResult(auth);
	// 		if (response) {
	// 			const userDocRef = await createUserDocumentFromAuth(response.user);
	// 		}
	// 	},
	// 	[]
	// );

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
			{/* <button onClick={signInWithGoogleRedirect}>
				Sign in with Google Redirect
			</button> */}
			<SignUpForm />
		</div>
	);
};

export default SignIn;
