import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Registration = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, dispatch] = useContext(UserContext);
    const [active, setActive] = useState(false)

    let url = window.location.origin;

    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    const [amount, setAmount] = useState(0);

    const registerUser = (e) => {
        e.preventDefault();
        const configuration = {
            name,
            email,
            password,
            wallet: [{
                active,
                amount
            }]
        }
        axios.post(`${url}/api/user/registration`, configuration)
        .then(res => {
            dispatch({
                type: 'REGISTRATION',
                name: res.name,
                email: res.email,
                password: res.password,
                wallet: res.wallet
            })
            console.log(res.data)
        })
        setName('')
        setEmail('')
        setPassword('')
        setActive()
        setAmount()
    }

    return(
        <div>
            <div className="container-registration">
                <div className="container-sub-registration">
                <h3 className="registration-title">Registration</h3>
                    <form onSubmit={registerUser} className="form-registration">
                        <input type="text" value={name || ''} className="input-registration" onChange={(e) => setName(e.target.value)} placeholder="name" /><br />
                        <input type="text" value={email || ''} className="input-registration" onChange={(e) => setEmail(e.target.value)} placeholder="email" /><br />
                        <input type="password" value={password || ''} className="input-registration" onChange={(e) => setPassword(e.target.value)} placeholder="password" /><br />
                        <h3 className="wallet-title">Wallet</h3>
                        <div>
                            <label>Yes</label><input type="radio" value="true" name="wallet" onChange={(e) => setActive(e.target.value)} />
                            <label>No</label><input type="radio" value="false" name="wallet" onChange={(e) => setActive(e.target.value)} />
                            <br />
                            {
                                active === 'true' ? 
                                <input type="text" value={amount || ''} className="input-amount" onChange={(e) => setAmount(e.target.value)} placeholder="amount" />
                                :
                                ''
                            }
                        </div>
                        <button className="registration-button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export { Registration as default }