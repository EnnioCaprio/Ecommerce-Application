const userReducer = (state, action) => {
    switch(action.type){
        case 'REGISTRATION':
            return [
                ...state,
                {
                    name: action.name,
                    email: action.email,
                    password: action.password,
                    wallet: action.wallet
                }
            ]
        case 'CONFIRM_ALL':
            return state.map(s => s._id === action.id ? {...s, totalSpent: action.totalSpent, boughtProducts: action.boughtProducts} : s)
        case 'ADDED_WALLET':
            return state.map(s => s._id === action.id ? {...s, wallet: [{ amount: action.amount }]} : s)
        case 'UPDATE_AMOUNT':
            return state.map(s => s._id === action.id ? {...s, wallet: [{ active: true, amount: action.amount }]} : s)
        case 'POPULATE_USER':
            return [action.user]
        case 'DELETE_WALLET':
            return state.map(k => k._id === action.id ? {...k, wallet: [{ active: action.active, amount: action.amount }], totalSpent: action.totalSpent } : k)
        default:
            return state
    }
}



export { userReducer as default }