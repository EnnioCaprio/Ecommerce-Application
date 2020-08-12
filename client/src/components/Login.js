import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TokensContext } from '../context/TokensContext';
import axios from 'axios';

const Login = () => {
    const [tokens, dispatchThree] = useContext(TokensContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const loginSystem = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/user/login', {
            email,
            password
        })
        .then(res => {         
            dispatchThree({
                type: 'ADD_TOKENS',
                data: res.data
            })
            history.push('/')
            window.location.reload()
        })
        .catch(err => console.log(err))
        setEmail('');
        setPassword('');
    }
    const getUsers = () => {
        axios.get('http://localhost:5000/api/user/')
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    return(
        <div>
            <div className="container-login">
                <div className="container-sub-login">
                <h3 className="title-login">Login</h3>
                    <form onSubmit={loginSystem} className="form-login">
                        <div>
                            <input type="text" value={email || ''} className="input-login" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                        </div>
                        <div>
                            <input type="password" value={password || ''} className="input-login" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                        </div>
                        <button className="form-button">Login</button>
                    </form>
                    <h6 className="registration-info">If you don't have an account click below</h6>
                    <Link to="/registration" style={{textDecoration: 'none'}}>
                        <span className="registration-redirect">Registration</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}



export { Login as default }