import React, { createContext, useReducer, useEffect } from 'react';
import tokensReducers from '../reducers/tokensReducer';
export const TokensContext = createContext();


export const TokensProvider = (props) => {

    const [tokens, dispatchThree] = useReducer(tokensReducers, '');

    useEffect(() => {
        const parsedToken = JSON.parse(localStorage.getItem('token'));
        console.log(parsedToken)
        if(parsedToken){
            dispatchThree({
                type: 'POPULATE_TOKENS',
                parsedToken
            })
        }
    }, [])


    useEffect(() => {
        localStorage.setItem('token', JSON.stringify(tokens))
    }, [tokens])

    return(
        <TokensContext.Provider value={[tokens, dispatchThree]}>
            {props.children}
        </TokensContext.Provider>
    )

}