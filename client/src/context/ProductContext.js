import React, { createContext, useReducer, useEffect, useState } from 'react';
import productReducer from '../reducers/productReducer';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [products, dispatch] = useReducer(productReducer, []);

    let url = window.location.origin;
    
    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    useEffect(() => {
        axios.get(`${url}/api/product/`)
        .then(res => {
            dispatch({
                type: 'POPULATE_PRODUCTS',
                products: res.data
            })
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        console.log('starts')
    }, [])

    return(
        <ProductContext.Provider value={[products, dispatch]}>
                {props.children}
        </ProductContext.Provider>
    )
}