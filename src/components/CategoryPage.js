import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProducts } from '../redux/action'
import styles from '../styles/categorypage.module.css'

class CategoryPage extends Component {

    componentDidMount(){
        this.props.getProducts()
    }

    render() {
        const category = this.props.match.params.category;
        const indexCategory = this.props.products.data?.categories.findIndex(el => el.name === category)
        const cIndex = this.props.currentCurrencyIndex
        console.log(cIndex)
        return (
            <div id='background' className={styles.container}>
                <div className={styles.title}>
                    <h3>{category}</h3>
                </div>
                <div className={styles.containercards}>
                    {this.props.products.data?.categories.length > 0 && (
                        this.props.products.data?.categories[indexCategory]?.products?.map((el, i) => (
                            <Link to={`/home/${el.category}/${el.id}`} key={i} className={styles.cards}>
                                <img src={el.gallery[0]} alt={`${el.name}`}/>
                                <h4>{el.name}</h4>
                                <h4>{el.prices[cIndex].currency.symbol}{el.prices[cIndex].amount}</h4>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        products: state.products,
        currentCurrencyIndex: state.currentCurrencyIndex
    }
}

function mapDispatchToProps(dispatch){
    return{
        getProducts: () => dispatch(getProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
