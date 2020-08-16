import React, { createContext, useReducer, useEffect, useContext } from 'react';
import listReducer from '../reducers/listReducer';
import { TokensContext } from '../context/TokensContext';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = (props) => {

    const [cart, dispatchTwo] = useReducer(listReducer, []);

    const [tokens, dispatchThree] = useContext(TokensContext);

    const token = JSON.parse(sessionStorage.getItem('token'));
    
    let url = window.location.origin;



    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if(token.length > 0){
            axios.get(`${url}/api/listProduct/`, config)
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