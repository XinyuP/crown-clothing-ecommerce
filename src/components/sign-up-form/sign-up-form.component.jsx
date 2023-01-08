// import { useState, useContext } from 'react';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';

const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	// const { setCurrentUser } = useContext(UserContext);

	// console.log(formFields);
	//  console.log('hit');

	// const val = useContext(UserContext);
	// SignUpForm hooks in the context
	// even though we didn't do anything with the value in Context, this component needs to rerun
	// None of the actual portion of DOM updated

	// although React rerun the code, it did not rerender anything on the DOM because nothing changes on the DOM
	// If you have multiple componnets that are all listening to a Context, even though they don't use the actual values, they will rerun
	// this could be a problem

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			// setCurrentUser(user);

			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			if (error.code === 'auth/email-already-in-use') {
				alert('Cannot create user, email already in use');
			} else {
				console.log('user creation encountered an error', error);
			}
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-up-container'>
			<h2> Don't have an account? </h2>
			<span>Sign up with email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
					inputOptions={{
						type: 'text',
						required: true,
						onChange: handleChange,
						name: 'displayName',
						value: displayName,
					}}
				/>
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
				<FormInput
					label='Confirm Password'
					inputOptions={{
						type: 'password',
						required: true,
						onChange: handleChange,
						name: 'confirmPassword',
						value: confirmPassword,
					}}
				/>

				{/* <FormInput
                    label='Display Name'
					type='text'
					required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>
                
                <FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<FormInput
					label='Confirm Password'
					type='password'
					required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/> */}

				<Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
