import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { TokensContext } from '../context/TokensContext';
import HomepageUserLogged from '../components/HomepageUserLogged';

const Homepage = () => {
    const [user, dispatch] = useContext(UserContext);
    const [tokens, dispatchThree] = useContext(TokensContext);
 
    return(
        <div>
            {
                tokens.length === 0 || null ?
                <div>
                    <div className="container-content">
                        <div className="background-overview">
                            <h1 className="background-overview-title">Welcome to the main page of our Ecommerce</h1>
                            <div className="presentation-content">
                                <h2 className="presentation-title">Click the icon below to get started</h2>
                                <div className="registration-link">
                                    <Link to="/registration" style={{textDecoration: 'none'}} className="presentation-link">Register here</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                user.map((u) => (
                    <HomepageUserLogged 
                        key={'logged'}
                        text={u}
                    />
                ))
            }
        </div>
    )
}



export { Homepage as default }