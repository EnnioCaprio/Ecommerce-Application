import React, { useContext } from 'react';
import CartProducts from '../components/CartProducts';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

import axios from 'axios';

const ShoppingCart = () => {
    const [cart, dispatchTwo] = useContext(CartContext);
    const [user, dispatch] = useContext(UserContext);

    const id = user.map(u => u._id)
    const token = JSON.parse(localStorage.getItem('token'));

    const deleteProd = (_id) => {
        axios.delete('http://localhost:5000/api/listProduct/' + _id)
        .then(res => {
            dispatchTwo({
                type: 'REMOVE_CART_PRODUCT',
                _id: res.data.product._id
            })
        })
        .catch(err => console.log(err))
    }
    
    const deletedAll = () => {
        axios.delete('http://localhost:5000/api/listProduct/')   
        .then(res => {
            dispatchTwo({
                type: 'DELETE_ALL_CART',
                cart:  res.products
            })
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const totalAdd = () => {
        let total = 0;
        cart.map(c => {
            return total += parseInt(c.cartPrice)
        })
        return total;
    }


    const getAllCarts = () => {
        const data = cart.map(c => c)
        return data
    }

    const updateAmount = () => {
        const userActive = user.map(u => {
            return u.wallet[0].active
        })
        const userAmount = user.map(u => {
            return u.wallet[0].amount
        })
        const config = {
            headers:{
                Authorization: 'Bearer ' + token
            }
        }
        const body = {
            wallet: [{
                active: userActive.join(''),
                amount: userAmount.join('') - totalAdd()
            }]
        }
        axios.patch('http://localhost:5000/api/user/' + id.join(''), body, config)
        .then(res => {
            dispatch({
                type: 'UPDATE_AMOUNT',
                id: res.data._id,
                active: res.data.wallet[0].active,
                amount: res.data.wallet[0].amount
            })
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const confirmAll = () => {
        const userContent = user.map(u => {
            return u.wallet[0].amount
        })
        const id = user[0]._id;
        const data = totalAdd() + user[0].totalSpent;
        const config = {
            totalSpent: data,
            boughtProducts: getAllCarts()
        }
        const header = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        if(userContent.join('') >= totalAdd()){
            axios.patch('http://localhost:5000/api/user/' + id, config, header)
            .then(res => {
                dispatch({
                    type: 'CONFIRM_ALL',
                    totalSpent: res.data.totalSpent,
                    boughtProducts: res.data.boughtProducts,
                    id: res.data._id
                })
                deletedAll()
                updateAmount()
                console.log(res)
            })
            .catch(err => console.log(err))
        }else{
            console.log('cannot confirm the cart')
        }
    }
    

    return(
        <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <div className="cart-products">
                <button onClick={deletedAll} disabled={cart.length === 0} className="cart-deletes">Delete all items</button>
                {
                    cart.map((c) => (
                        <CartProducts 
                            key={c.cartName}
                            text={c}
                            length={c.length}
                            delete={deleteProd}
                        />
                    ))
                }
                <div className="cart-end">
                    <h3 className="cart-prices">Total price: {totalAdd()}</h3>
                    <button onClick={confirmAll} disabled={cart.length === 0}  className="confirm-cart">Confirm Cart</button>
                </div>
            </div>
        </div>
    )
}


export { ShoppingCart as default }