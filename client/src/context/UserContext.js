import React, { createContext, useReducer, useEffect } from 'react';
import userReducer from '../reducers/userReducer';
import axios from 'axios';

export const UserContext = createContext();


export const UserProvider = (props) => {
    const [user, dispatch] = useReducer(userReducer, []);
    const token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if(token){
            axios.get('http://localhost:5000/api/user/me', config)
            .then(res => {
                dispatch({
                    type: 'POPULATE_USER',
                    user: res.data
                })
                console.log(res)
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