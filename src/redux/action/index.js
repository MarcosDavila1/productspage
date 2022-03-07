import axios from "axios"

export function getCategories(){
    return async function(dispatch){
        try {
            const get = await axios.post('http://localhost:4000/', {query: `
                query{
                    categories{
                        name
                    }
                }
            `})
            dispatch({
                type: 'GET_CATEGORIES',
                payload: get.data
            })
        } catch (error) {
            return console.log(error)
        }
    }
}

export function getProducts(){
    return async function(dispatch){
        try {
            const get = await axios.post('http://localhost:4000/', {query: `
                query{
                    categories{
                        name
                        products{
                            id
                          name
                          gallery
                          category
                          brand
                          description
                          attributes{
                            name
                            items{
                              displayValue
                              value
                            }
                          }
                          prices{
                            currency{
                              label
                              symbol
                            }
                            amount
                          }
                        }
                      }
                }
            `})
            dispatch({
                type: 'GET_PRODUCTS',
                payload: get.data
            })
        } catch (error) {
            return console.log(error)
        }
    }
}

export function getCurrencies(){
    return async function(dispatch){
        try {
            const get = await axios.post('http://localhost:4000/', {query: `
                query{
                    currencies{
                            label
                            symbol
                        }
                }
            `})
            dispatch({
                type: 'GET_CURRENCYS',
                payload: get.data
            })
        } catch (error) {
            return console.log(error)
        }
    }
}

export function getProductDetail(category,id){
    return{
        type: 'GET_PRODUCT_DETAIL',
        payload: {category, id}
    }
}

export function addCart(product){
    return{
        type: 'ADD_CART',
        payload: product
    }
}