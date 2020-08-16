const usersReducer = (state, action) => {
    switch(action.type){
        case 'POPULATE_USERS':
            return action.users
        default:
            return state
    }
} 

export { usersReducer as default }