const initialState = {
    categories: [],
    products: [],
    allProducts: [],
    productDetail: {},
    currencies: [],
    currentCurrencyIndex: 0,
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
                currencies: action.payload.data.currencies,
            }

        case 'GET_PRODUCT_DETAIL':
            const indexCategory = [...state.allProducts?.data?.categories].findIndex(el => el.name === action.payload.category)
            const product = [...state.allProducts?.data?.categories[indexCategory].products].filter(el => el.id === action.payload.id)
            return{
                ...state,
                productDetail: product
            }

        case 'ADD_CART':
            Object.defineProperty(action.payload[0], 'cantidad', {value: 1})
            return{
                ...state,
                cart: [...state.cart, action.payload[0]]
            }

        case 'SET_CURRENT_CURRENCY':
            const currencyIndex = state.currencies.findIndex(el => el.label === action.payload)
            return{
                ...state,
                currentCurrencyIndex: currencyIndex
            }

        case 'REMOVE_ITEM_CART':
            const newarr = [...state.cart]?.filter(el => el.name !== action.payload)
            return{
                ...state,
                cart: newarr
            }

        case 'ADD_ITEM_CART':
            const elem = state.cart?.filter(el => el.name === action.payload)
            var {cantidad , ...myUpdatedObject} = elem[0];
            Object.defineProperty(myUpdatedObject, 'cantidad', {value: cantidad + 1})
            return{
                ...state,
                cart: [...state.cart.filter(el => el.name !== action.payload), myUpdatedObject]
            }

        case 'DECREMENT_ITEM_CART':
            const eleme = state.cart?.filter(el => el.name === action.payload)
            var {cantidad , ...myUpdatedObj} = eleme[0];
            Object.defineProperty(myUpdatedObj, 'cantidad', {value: cantidad - 1})
            return{
                ...state,
                cart: [...state.cart.filter(el => el.name !== action.payload), myUpdatedObj]
            }

        default:
            return {
                ...state
            }
    }
}

export default reducer;