import React from 'react';

const CartProducts = (props) => {

    return(
        <div>
            <div className="cart-product">
                <div className="cart-one">
                    <ul className="cart-informations">
                        <li><label className="cart-description">Name: </label>{props.text.cartName}</li>
                        <li><label className="cart-description">Price: </label>{props.text.cartPrice}</li>
                        <li><label className="cart-description">Quantity: </label>{props.text.cartQuantity}</li>
                    </ul>
                    <button onClick={() => {
                        const _id = props.text._id;
                        props.delete(_id);
                    }} className="cart-delete">X</button>
                </div>
                <div className="cart-two">
                </div>
            </div>
        </div>
    )
}

export { CartProducts as default }