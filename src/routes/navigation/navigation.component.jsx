import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ReactComponent as CrownLogo } from '../../assets/Royal-Crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import {
	NavigationContainer,
	LogoContainer,
	NavLinks,
	NavLink,
} from './navigation.styles.jsx';

const Navigation = () => {
	// const { currentUser, setCurrentUser } = useContext(UserContext);
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	// console.log(currentUser);

	// const signOutHandler = async () => {
	//     // const res = await signOutUser();
	//     // console.log(res); // undefined
	//     await signOutUser();
	//     // setCurrentUser(null);
	// }

	return (
		<Fragment>
			<NavigationContainer>
				<LogoContainer to='/'>
					<CrownLogo className='logo' />
				</LogoContainer>

				<NavLinks>
					<NavLink to='/shop'>SHOP</NavLink>
					{currentUser ? (
						<NavLink as='span' onClick={signOutUser}>
							{' '}
							SIGN OUT{' '}
						</NavLink>
					) : (
						<NavLink to='/auth'>SIGN IN</NavLink>
					)}
					<CartIcon />
				</NavLinks>
				{isCartOpen && <CartDropdown />}
			</NavigationContainer>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
