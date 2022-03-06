import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../redux/action'
import styles from '../styles/categorypage.module.css'

class CategoryPage extends Component {

    componentDidMount(){
        this.props.getProducts()
    }

    render() {
        const category = this.props.match.params.category;
        const indexCategory = this.props.products.data?.categories.findIndex(el => el.name === category)
        console.log(this.props.products.data?.categories[indexCategory]?.products[0].prices[0])
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    <h3>Category Page</h3>
                </div>
                <div className={styles.containercards}>
                    {this.props.products.data?.categories.length > 0 && (
                        this.props.products.data?.categories[indexCategory]?.products?.map((el, i) => (
                            <div key={i} className={styles.cards}>
                                <img src={el.gallery[0]} alt={`${el.name}`}/>
                                <h4>{el.name}</h4>
                                <h4>{el.prices[0].currency.symbol}{el.prices[0].amount}</h4>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        products: state.products
    }
}

function mapDispatchToProps(dispatch){
    return{
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
