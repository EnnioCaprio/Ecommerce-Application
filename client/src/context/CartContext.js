import React, { createContext, useReducer, useEffect, useContext } from 'react';
import listReducer from '../reducers/listReducer';
import { TokensContext } from '../context/TokensContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = (props) => {

    const [cart, dispatchTwo] = useReducer(listReducer, []);

    const [tokens, dispatchThree] = useContext(TokensContext);


    
    const token = JSON.parse(localStorage.getItem('token')) 


    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if(token.length > 0){
            axios.get('http://localhost:5000/api/listProduct/', config)
            .then(res => {
                dispatchTwo({
                    type: 'POPULATE_CART',
                    cart: res.data
                })
                console.log(res)
            })
            .catch(err => console.log(err))
        }
        console.log('called')
    }, [])
    

    return(
        <CartContext.Provider value={[cart, dispatchTwo]}>
            {props.children}
        </CartContext.Provider>
    )
}