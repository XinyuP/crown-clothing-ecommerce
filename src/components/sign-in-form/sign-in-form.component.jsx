import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import {
	signInWithGooglePopup,
	createUserDocumentFromAuth,
	signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss';
import Button from '../button/button.component';
// import { compileString } from 'sass';
import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
	email: '',
	password: '',
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	// console.log(formFields);

	const { setCurrentUser } = useContext(UserContext);

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const SignInWithGoogle = async () => {
		// whenever you make call to some database, this is going to be async
		// const response = await signInWithGooglePopup();
		// const userDocRef = await createUserDocumentFromAuth(response.user);

		const { user } = await signInWithGooglePopup();
		// const userDocRef = await createUserDocumentFromAuth(user);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(
				email,
				password
			);
			setCurrentUser(user);
			// console.log(response);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case 'auth/wrong-password':
					alert('incorrect password for email');
					break;
				case 'auth/user-not-found':
					alert('no user associated with this email');
					break;
				default:
					console.log(error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-in-container'>
			<h2> Already have an account? </h2>
			<span>Sign in with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					inputOptions={{
						type: 'email',
						required: true,
						onChange: handleChange,
						name: 'email',
						value: email,
					}}
				/>
				<FormInput
					label='Password'
					inputOptions={{
						type: 'password',
						required: true,
						onChange: handleChange,
						name: 'password',
						value: password,
					}}
				/>

				<div className='buttons-container'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' buttonType='google' onClick={SignInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
