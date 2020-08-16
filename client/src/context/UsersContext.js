import React, {createContext, useReducer, useEffect} from 'react';
import usersReducer from '../reducers/usersReducer';
import axios from 'axios';

export const UsersContext = createContext();

export const UsersProvider = (props) => {

    let url = window.location.origin;

    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    const [users, dispatchUsers] = useReducer(usersReducer, []);

    useEffect(() => {
        axios.get(`${url}/api/user`)
        .then(res => {
            dispatchUsers({
                type: 'POPULATE_USERS',
                users: res.data.users
            })
        })
    }, [])

    return(
        <UsersContext.Provider value={[users, dispatchUsers]}>
            {props.children}
        </UsersContext.Provider>
    )

}