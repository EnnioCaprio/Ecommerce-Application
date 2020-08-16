import React, { createContext, useReducer, useEffect } from 'react';
import userReducer from '../reducers/userReducer';
import axios from 'axios';

export const UserContext = createContext();


export const UserProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, []);
    const token = JSON.parse(localStorage.getItem('token'));

    console.log(user);

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
        if(token){
            axios.get(`${url}/api/user/me`, config)
            .then(res => {
                dispatch({
                    type: 'POPULATE_USER',
                    user: res.data.users
                })
            })
            .catch(err => console.log(err))
            }
    }, [])

    return(
        <UserContext.Provider value={[user, dispatch]}>
            {props.children}
        </UserContext.Provider>
    )
}