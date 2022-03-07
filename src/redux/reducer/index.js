const initialState = {
    categories: [],
    products: [],
    allProducts: [],
    productDetail: {},
    currencies: [],
    cart:[]
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
                products: action.payload,
                allProducts: action.payload
            }

        case 'GET_CURRENCYS':
            return{
                ...state,
                currencies: action.payload.data.currencies
            }

        case 'GET_PRODUCT_DETAIL':
            const indexCategory = [...state.allProducts?.data?.categories].findIndex(el => el.name === action.payload.category)
            const product = [...state.allProducts?.data?.categories[indexCategory].products].filter(el => el.id === action.payload.id)
            return{
                ...state,
                productDetail: product
            }

        case 'ADD_CART':
            return{
                ...state,
                cart: [...state.cart, action.payload[0]]
            }

        default:
            return {
                ...state
            }
    }
}

export default reducer;