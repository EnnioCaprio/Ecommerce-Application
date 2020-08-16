import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { TokensContext } from '../context/TokensContext';
import axios from 'axios';

const ListProduct = (props) => {
    const [count, setCount] = useState(1);
    const [tokens, dispatchThree] = useContext(TokensContext);
    const [products, dispatch] = useContext(ProductContext);

    let url = window.location.origin;

    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    const incrementCount = () => {
        setCount(count + 1)
    }

    const decrementCount = () => {
        setCount(count - 1)
    }

    const resetCount = () => {
        setCount(1)
    }

    return(
        <div>
            <div className="product-item">
                <div className="product-background">
                    <button onClick={() => {
                        const id = props.info._id
                        axios.delete(`${url}/api/product/` + id)
                        .then(res => {
                            dispatch({
                                type: 'DELETE_PRODUCTS',
                                id: res.data.product._id
                            })
                            console.log(res)
                        })
                    }} className="product-button-delete">X</button> 
                </div>
                <div className="product-descriptions">    
                    <ul className="product-descriptions-items">
                        <li>{props.info.name}</li>
                        <li>{props.info.price}</li>
                        <li>{props.info.quantity}</li>
                    </ul>
                </div>
                <div className="product-button-quantity">
                    <div>
                        <input type="button" value="+1" onClick={incrementCount} disabled={count === props.info.quantity || props.info.quantity === 0} />
                        <input type="button" value="-1" disabled={count <= 1} onClick={decrementCount} />
                        <input type="button" value="Reset" onClick={resetCount} />
                    </div>
                    <label>{count}</label><br /> 
                </div>
                <div className="product-buttons">
                    <button onClick={() => {
                        const id = props.info._id;
                        const name = props.info.name;
                        const price = props.info.price * count;
                        const quantity = props.info.quantity - count;
                        props.buy(id, name, price, count)
                        props.quantity(id, name, quantity)
                        props.delete(id, name, quantity)
                    }} disabled={(tokens.length === 0 && count < 1) || (tokens.length < 3)}>Add to the cart</button>
                    <button onClick={() => {
                        const id = props.info._id;
                        props.update(id)
                    }}>Update</button> 
                </div>
            </div>  
        </div>
    )
}

export { ListProduct as default }