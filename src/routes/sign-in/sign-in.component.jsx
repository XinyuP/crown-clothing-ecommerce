import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		// whenever you make call to some database, this is going to be async
		const response = await signInWithGooglePopup();
		createUserDocumentFromAuth(response.user);
	};

	return (
		<div>
			<h1>Sign IN</h1>
			<button onClick={logGoogleUser}>Sign in with Google Popup</button>
		</div>
	);
};

export default SignIn;
