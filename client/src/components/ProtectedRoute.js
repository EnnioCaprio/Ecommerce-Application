import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TokensContext } from '../context/TokensContext';

const ProtectedRoute = ({ children, ...rest }) => {
    const [tokens, dispatchThree] = useContext(TokensContext);
    return(
        <Route 
            {...rest}
            render={
                (props) => (
                    tokens.length > 0 ? 
                    ( children )
                    : ( <Redirect to={{
                        pathname: '/',
                        state: { 
                            from: props.location
                        }
                    }} /> 
                    )
                )
            }
        />
    )
}


export { ProtectedRoute as default }