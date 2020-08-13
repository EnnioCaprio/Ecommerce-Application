import React, { createContext, useReducer, useEffect, useState } from 'react';
import productReducer from '../reducers/productReducer';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [products, dispatch] = useReducer(productReducer, []);

    const url = window.location.origin;

    useEffect(() => {
        axios.get(`http://localhost:5000/api/product/`)
        .then(res => {
            dispatch({
                type: 'POPULATE_PRODUCTS',
                products: res.data
            })
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