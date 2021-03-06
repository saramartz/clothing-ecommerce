import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { auth } from '../../../firebase/firebase.utils'

import { ReactComponent as Logo } from '../../../assets/crown.svg'
import CartIcon from '../../cart-icon/cart-icon.comp'
import CartDropdown from '../../cart-dropdown/cart-dropdown.comp'
import { selectCartHidden } from '../../../redux/cart/cart.selectors'
import { selectLoggedUser } from '../../../redux/user/user.selectors'

import './header.styles.scss'

const Header = ({ loggeduser, hidden }) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {loggeduser ? (
                <div className='option' onClick={() => auth.signOut()}>
                    SIGN OUT
                </div>
            ) : (
                <Link className='option' to='/signin'>
                    SIGN IN
                </Link>
            )}
            <CartIcon />
        </div>
        {!hidden && <CartDropdown />}
    </div>
)

const mapStateToProps = createStructuredSelector({
    loggeduser: selectLoggedUser,
    hidden: selectCartHidden,
})

export default connect(mapStateToProps)(Header)

