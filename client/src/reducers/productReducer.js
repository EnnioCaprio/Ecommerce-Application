const productReducer = (state, action) => {
    switch(action.type){
        case 'ADD_PRODUCT':
            return[
                ...state,
                {
                    _id: action.data._id, 
                    name: action.data.name,
                    price: action.data.price,
                    quantity: action.data.quantity
                }
            ]
        case 'POPULATE_PRODUCTS':
            return action.products
        case 'DELETE_PRODUCTS':
            return state.filter(e => e._id !== action.id)
        case 'UPDATE_PRODUCTS':
            return state.map(p => p._id === action.id ? {...p, name: action.name, price: action.price} : p)
        case 'UPDATE_PRODUCT':
            return state.map(p => p._id === action.id ? {...p, quantity: action.quantity} : p)
        case 'DELETE_ALL_PROD':
            return action.data = [] 
        default:
            return state
    }
}

export { productReducer as default }