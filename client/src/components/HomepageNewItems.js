import React from 'react';

const HomepageNewItems = (props) => {
    return(
        <div className={props.length > 1 ? "user-products-items-item" : "user-products-item-item"}>
            <div className="user-products-items-one">
                
            </div>
            <div className="user-products-items-two">
                <ul className="user-products-list">
                    <li className="user-products-list-item"><label><b>Product</b></label> {props.text.cartName}</li>
                    <li className="user-products-list-item"><label><b>Price</b></label> {props.text.cartPrice}</li>
                    <li className="user-products-list-item"><label><b>Quantity</b></label> {props.text.cartQuantity}</li>
                </ul>
            </div>
        </div>
    )
}

export { HomepageNewItems as default }