const tokensReducers = (state, action) => {
    switch(action.type){
        case 'ADD_TOKENS':
            return action.data
        case 'LOGOUT_USER':
            return ''
        case 'POPULATE_TOKENS':
            return action.parsedToken
        default:
            return state;
    }
}


export { tokensReducers as default }