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
                          name
                          gallery
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