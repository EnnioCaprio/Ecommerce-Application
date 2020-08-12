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
                <div className={activeIcon === true ? 'open' : ''}>
                    <ul className="list-link action">
                        <Link to="/products" className="a">
                            <li className="list-links">Product</li>
                        </Link>
                        {
                        tokens.length > 0 ? 
                        <Link to="/shopping" style={{textDecoration: 'none'}} className="a">
                            <li className="list-links"><FontAwesomeIcon icon={faShoppingCart} size="1x" /><span className="number-item">{cart.length}</span></li>
                            </Link> 
                                : 
                            ''
                        }
                        {
                            tokens.length > 0 ? 
                            <Link to="/" className="a" onClick={() => { 
                                dispatchThree({type: 'LOGOUT_USER'})
                                dispatchTwo({type: 'CLEANING_CART', cart})
                            }}><li className="list-links">Logout</li></Link>
                                : 
                            <Link to="/login" className="a"><li className="list-links">Login</li></Link>
                        }
                        {
                            tokens.length > 0 ? <Link to="/me" className="a"><li className="list-links">Profile</li></Link> : ''
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}


export { Navbar as default }