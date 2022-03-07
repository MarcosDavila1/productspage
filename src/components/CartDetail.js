import React, { Component } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/cartdetail.module.css'

class CartDetail extends Component {

    render() {
        console.log(this.props.cart[0])
        return (
            <div className={styles.container}>
                <h4 className={styles.title}>CART</h4>
                {this.props.cart.length > 0 && (
                    this.props.cart.map((el,i)=> (
                        <div key={i} className={styles.containeritem}>
                            <div className={styles.infoitem}>
                                <h4 className={styles.name}>{el.name}</h4>
                                <h4 className={styles.brand}>{el.brand}</h4>
                                <h4 className={styles.amount}>{el.prices[0].currency.symbol}{el.prices[0].amount}</h4>
                                <h4>Atributos</h4>
                            </div>
                            <div className={styles.image}>
                                <div className={styles.btn}>
                                    <button type='button'>+</button>
                                    <p>1</p>
                                    <button type='button'>-</button>
                                </div>
                                <img src={el.gallery[0]} alt={el.name}/>
                            </div>
                        </div>
                    ))
                )}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart
    }
}

export default connect(mapStateToProps, null)(CartDetail)
