import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const UserSubInformation = (props) => {
    const [user, dispatch] = useContext(UserContext);
    const [click, setClick] = useState(false);

    const menu = () => {
        setClick(!click)
    }


    
    const token = JSON.parse(localStorage.getItem('token'))

    let url = window.location.origin;


    if(url.includes(3)){
        url = url.replace(3, 5)
    }

    const addTheWallet = (id) => {
        const body = {
            wallet: [{
                active: true,
                amount: prompt('add the amount')
            }]
        }
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.patch(`${url}/api/user/` + id, body, config)
        .then(res => {
            dispatch({
                type: 'ADDED_WALLET',
                active: res.data.active,
                amount: res.data.amount 
            })
            window.location.reload()
        })
        .catch(err => console.log(err))
        
    }

    const deletedTheWallet = (id) => {
        const body = {
            wallet: [{
                active: false,
                amount: null
            }],
            totalSpent: 0
        }
        const configuration = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.patch(`${url}/api/user/` + id, body, configuration)
        .then(res => {
            dispatch({
                type: 'DELETE_WALLET',
                id: res.data.id,
                active: res.data.active,
                amount: res.data.amount,
                totalSpent: res.data.totalSpent
            })
            window.location.reload()
            console.log(res)
        })
        .catch(err => console.log(err))
    }


    return(
        <div>
            <div className="container-profile">
                <div className="profile-user">
                    <div className="profile-info">
                        <div className="profile-info-fa">
                            <FontAwesomeIcon icon={faEllipsisV} size="2x" onClick={menu} />
                            {
                                click === true 
                                ? 
                                <div className="profile-info-menu">
                                    <ul className="profile-info-menu-list">
                                        {
                                            props.text.wallet[0].active === false ? 
                                            <li className="profile-info-item" onClick={() => {
                                                addTheWallet(props.text._id)
                                            }}>Add Wallet</li>
                                            :
                                            <li className="profile-info-item" onClick={() => {
                                                deletedTheWallet(props.text._id)
                                            }}>Delete Wallet</li>
                                        }
                                    </ul>
                                </div>
                                :
                                ''
                            }
                        </div>
                    </div>
                    <div className="profile-description">
                        <h3 className="profile-description-title">Personal Info</h3>
                        <div className="profile-description-info">
                            <span className="profile-description-info-item">{props.text.name}</span>
                            <span className="profile-description-info-item">{props.text.email}</span>
                        </div>
                        <h3 className="profile-description-title">Your wallet</h3>
                        {
                            props.text.wallet[0].active === true
                            ?
                            <div className="profile-description-wallet">
                                <div className="profile-description-wallet-item">
                                    <h4 className="profile-description-wallet-money">Your available money</h4>
                                    <p className="profile-description-wallet-amount">{props.text.wallet[0].amount} Euro</p>
                                </div>
                                <div className="profile-description-wallet-item">
                                    <h4 className="profile-description-wallet-money">Money already spent</h4>
                                    <p className="profile-description-wallet-amount">{props.text.totalSpent} Euro</p>
                                </div>
                            </div>
                            : 
                            <div className="profile-description-blocked">
                                <h3>Not Available</h3>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export { UserSubInformation as default }