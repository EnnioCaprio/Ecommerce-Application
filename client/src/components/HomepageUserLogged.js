import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { TokensContext } from '../context/TokensContext';
import HomepageNewItems from '../components/HomepageNewItems';
import axios from 'axios';

const HomepageUserLogged = (props) => {

    const [user, dispatch] = useContext(UserContext)

    const [tokens, dispatchThree] = useContext(TokensContext)

    const [newItems, setNewItems] = useState([])

    let url = window.location.origin;

    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    useEffect(() => {
        const config = {
            headers:{
                Authorization: 'Bearer ' + tokens
            }
        }
        axios.get(`${url}/api/user/me`, config)
        .then(res => {
            const userProductLength = res.data.boughtProducts.length;
            if(userProductLength === 1){
                setNewItems(res.data.boughtProducts.slice(-1))
            }else if(userProductLength === 2){
                setNewItems(res.data.boughtProducts.slice(-2))
            }
        })
        .catch(err => console.log(err))
    }, [])
    
    return(
        <div className="container-logged-content">
                <div className="background-logged-overview">
                    <div className="background-logged-text">
                        <h1>Here you can buy and sell products</h1> 
                        <h3>Find everything you want</h3>               
                    </div>
                </div>
                <div className="user-products">
                <h1 className="user-products-main">Hi {props.text.name}</h1>
                    {
                        newItems.length === 0 ? 
                        <h1>You did not buy anything yet</h1>
                        :
                        <div>
                        <h3 className="user-products-sub">Those are your last bought products</h3>
                            <div className={newItems.length > 1 ? "user-products-items" :  "user-products-item"}>
                                {
                                    newItems.map(n => (
                                        <HomepageNewItems 
                                            key={n._id}
                                            text={n}
                                            length={newItems.length}
                                        />
                                    ))
                                }
                            </div>
                    </div>
                    }
                </div>
            </div>
    )
}

export { HomepageUserLogged as default }