const listReducer = (state, action) => {
    switch(action.type){
        case 'ADD_CART_PRODUCT':
            return[
                ...state,
                {
                    _id: action.data._id,
                    cartName: action.data.cartName,
                    cartPrice: action.data.cartPrice,
                    cartQuantity: action.data.cartQuantity,
                    owner: action.data.owner
                }
            ]
        case 'REMOVE_CART_PRODUCT':
            return state.filter((cart) => cart._id !== action._id)
        case 'CLEANING_CART':
            return action.cart
        case 'POPULATE_CART':
            return action.cart
        case 'DELETE_ALL_CART':
            return action.cart = []
        default:
            return state
    }
}

export { listReducer as default }