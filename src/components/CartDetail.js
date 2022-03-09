import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import styles from '../styles/cartdetail.module.css'

class CartDetail extends Component {

    handleSelect(el){
        const i = document.getElementById(el)
        i.classList.toggle('active')
    }

    render() {
        const cIndex = this.props.currentCurrencyIndex
        return (
            <div id='backgroundcart' className={styles.container}>
                <h4 className={styles.title}>CART</h4>
                {this.props.cart.length > 0 ? (
                    this.props.cart.map((el,i)=> (
                        <div key={i} className={styles.containeritem}>
                            <div className={styles.infoitem}>
                                <h4 className={styles.name}>{el.name}</h4>
                                <h4 className={styles.brand}>{el.brand}</h4>
                                <h4 className={styles.amount}>{el.prices[cIndex].currency.symbol}{el.prices[cIndex].amount}</h4>                                
                                {el.attributes && el.attributes?.map((ele, i) => (
                                    <Fragment key={i}>
                                        <h4 className={styles.attribute}>{ele.name.toUpperCase()}:</h4>
                                        <div className={styles.selectattributes}>
                                        {ele.items.map((elem, i) => (
                                                <p id={elem.displayValue} onClick={()=> this.handleSelect(elem.displayValue)} key={i}>{elem.displayValue}</p>
                                        ))}
                                        </div>
                                    </Fragment>
                                ))} 
                            </div>
                            <div className={styles.image}>
                                <div className={styles.btn}>
                                    <button type='button'>+</button>
                                        <p>{el.cantidad}</p>
                                    <button type='button'>-</button>
                                </div>
                                <img src={el.gallery[0]} alt={el.name}/>
                            </div>
                        </div>
                    ))
                )
                : <div className={styles.containercartempty}><h2 className={styles.cartempty}>Your cart is empty</h2></div>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        cart: state.cart,
        currentCurrencyIndex: state.currentCurrencyIndex
    }
}

export default connect(mapStateToProps, null)(CartDetail)
