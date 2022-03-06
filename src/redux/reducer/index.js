const initialState = {
    categories: [],
    products: [],
    currencies: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return{
                ...state,
                categories: action.payload.data.categories
            }

        case 'GET_PRODUCTS':
            return{
                ...state,
                products: action.payload
            }

        case 'GET_CURRENCYS':
            return{
                ...state,
                currencies: action.payload.data.currencies
            }

        default:
            return {
                ...state
            }
    }
}

export default reducer;