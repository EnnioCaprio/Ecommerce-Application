import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars } from '@fortawesome/free-solid-svg-icons';
import { TokensContext } from '../context/TokensContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [tokens, dispatchThree] = useContext(TokensContext);
    const [cart, dispatchTwo] = useContext(CartContext);
    const [user, dispatch] = useContext(UserContext)

    const [activeIcon, setActiveIcon] = useState(false)

    return(
        <div className="navbar clearfix">
            <div className="navbar-center action">
                <Link to="/">
                    <h3 className="navbar-title">Homepage</h3>
                </Link>
                <div className="container-fa-bars">
                    <button className="fa-bars" onClick={() => setActiveIcon(!activeIcon)}>
                        <FontAwesomeIcon icon={faBars} size="2x"/>
                    </button>
                </div>
                <div className="header-list">
                    <ul className="list-link" id={activeIcon === true ? 'open' : ''}>
                        <Link to="/products" className="list-links">
                            <li>Product</li>
                        </Link>
                        {
                        tokens.length > 0 ? 
                        <Link to="/shopping" className="list-links" style={{textDecoration: 'none'}}>
                            <li><FontAwesomeIcon icon={faShoppingCart} size="1x" /><span className="number-item">{cart.length}</span></li>
                            </Link> 
                                : 
                            ''
                        }
                        {
                            tokens.length > 0 ? 
                            <Link to="/" className="list-links" onClick={() => { 
                                dispatchThree({type: 'LOGOUT_USER'})
                                dispatchTwo({type: 'CLEANING_CART', cart})
                            }}><li>Logout</li></Link>
                                : 
                            <Link to="/login" className="list-links"><li>Login</li></Link>
                        }
                        {
                            tokens.length > 0 ? <Link to="/me" className="list-links"><li>Profile</li></Link> : ''
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}


export { Navbar as default }