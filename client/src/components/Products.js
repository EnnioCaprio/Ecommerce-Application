import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import ListProducts from './ListProducts';
import axios from 'axios';
import { TokensContext } from '../context/TokensContext';

const Products = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState();
    const [products, dispatch] = useContext(ProductContext);
    const [cart, dispatchTwo] = useContext(CartContext);
    const [count, setCount] = useState(1);
    const [error, setError] = useState(false)
    const [tokens, dispatchThree] = useContext(TokensContext)

    let url = window.location.origin;

    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    const addProduct = (e) => {
        e.preventDefault()
        const names = products.map((p) => {
            return p.name
        })
        if(!(names.indexOf(name) > -1)){
            const config = {
                name,
                price,
                quantity: count
            }
            
            axios.post(`${url}/api/product/createProduct`, config)
            .then(res => {
                dispatch({
                    type: 'ADD_PRODUCT',
                    data: res.data.product
                })
            })
            .catch(err => err)
            setError(false)
        }else{
            setError(true)
        }
        setName('')
        setPrice()
        setCount(1)
    }

    const updateProduct = (id) => {
        const newName = prompt('add new name')
        const newPrice = prompt('add new price')
        const updates = {
            name: newName,
            price: newPrice
        }
        axios.patch(`${url}/api/product/` + id, updates)
        .then(res => {
            dispatch({
                type: 'UPDATE_PRODUCTS',
                id: res.data._id,
                name: res.data.name,
                price: res.data.price
            })
        })
        .catch(err => console.log(err))
    }

    const updateQuantity = (id, name, quantity) => {
        const updates = {
            quantity
        }
        const cartData = cart.map(cart => cart.cartName)
        if(!(cartData.indexOf(name) > -1)){
        axios.patch(`${url}/api/product/` + id, updates)
        .then(res => {
            dispatch({
                type: 'UPDATE_PRODUCT',
                id: res.data._id,
                quantity: res.data.quantity
            })
            console.log(res)
        })
        .catch(err => console.log(err))
        }
    }

    const buyProduct = (cartId, cartName, cartPrice, cartQuantity) => {
        const cartData = cart.map((cart) => cart.cartName)
        const cartInfo = cart.map((c) => c)
        if(!(cartData.indexOf(cartName) > -1)){
            const configuration = {
                cartId,
                cartName, 
                cartPrice,
                cartQuantity,
                owner: cartInfo.owner
            }
            const params = {
                headers: {
                    Authorization: `Bearer ${tokens}`
                }
            }
            axios.post(`${url}/api/listProduct/addProduct`, configuration, params)
            .then(res => {
                dispatchTwo({
                    type: 'ADD_CART_PRODUCT',
                    data: res.data.listProduct
                })
                console.log(res)
            })
            .catch(err => console.log(err))
            setError(false)
        }else{
            setError(true)
        }
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
            <div className="container-form">
                <button onClick={() => {
                    axios.delete(`${url}/api/product/`)
                    .then(res => {
                        dispatch({
                            type: 'DELETE_ALL_PROD',
                            data: res.data
                        })
                        console.log(res)
                    })
                    .catch(err => console.log(err))
                }} disabled={products.length === 0} className="delete-button">Delete all products</button>
                <form onSubmit={addProduct} className="form-submit-products">
                    <div className="form-inputs">
                        <input type="text" value={name || ''} className="main-inputs-f-one" onChange={(e) => setName(e.target.value)} placeholder="Name" />
                    </div>
                    <div className="form-inputs">
                        <input type="number" value={price || ''} className="main-inputs-f-one" onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    </div>
                    <div className="form-inputs">
                        <input type="button" value="+1" className="main-inputs-f-two" onClick={incrementCount} />
                        <input type="button" value="-1" className="main-inputs-f-two" disabled={count === 1} onClick={decrementCount} />
                        <input type="button" value="Reset" className="main-inputs-f-two" onClick={resetCount} />
                    </div>
                    <div className="form-results">
                        <div>
                            <label className="form-count">{count}</label>
                        </div>
                        <div>
                            <button className="form-submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
            { products.length === 0 ? <h2 className="title-product">No products</h2> : <h2 className="title-product">Here the list of products</h2> }
            {
                error === true ? <h2>Cannot add same name</h2> : ''
            }
            <div className="products-list">
                {
                    products.map(product => (
                        <ListProducts
                            key={product._id}
                            info={product}
                            update={updateProduct}
                            buy={buyProduct}
                            quantity={updateQuantity}
                        />
                    ))
                }
            </div>
        </div>
    )
}



export { Products as default }