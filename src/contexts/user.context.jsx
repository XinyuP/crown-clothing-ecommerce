import { createContext, useState, useEffect } from 'react';
import {
	onAuthStateChangedListener,
	signOutUser,
	createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils';

// as the actual value you want to access
export const UserContext = createContext({
	setCurrentUser: () => null,
	currentUser: null,
});

// the actual component
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	//signOutUser();

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			// console.log(user);
			setCurrentUser(user);
			if (user) {
				createUserDocumentFromAuth(user);
			}
		});
		return unsubscribe; // unsubscribe whenever you unmount
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};