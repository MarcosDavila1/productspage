import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getCategories, getCurrencies, setCurrentCurrency, removeItemCart, addItemCart, decrementItemCart } from '../redux/action';
import styles from '../styles/navbar.module.css'
import cart from '../images/cart.png'
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import bag from '../images/bag.png'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            despliegue: false,
            currency: '$ USD',
            despliegueCart: false
        }
      }

    componentDidMount(){
        this.props.getCategories()
        this.props.getCurrencies()
    }

    handleClick(e){
        this.setState(prev => {
            return (prev.despliegue = !prev.despliegue,
                    prev.currency = e.target.innerText)
        })
        const pika = e.target.textContent.split(" ")
        this.props.setCurrentCurrency(pika[1])
        const back = document.getElementById('background')
        const backgrounddetail = document.getElementById('backgrounddetail')
        const currencycontainer = document.getElementById('currencycontainer')
        back?.classList.toggle('dontshow')
        backgrounddetail?.classList.toggle('dontshow')
        currencycontainer?.classList.toggle('backcart')
    }

    handleClickCart(){
        this.setState(prev => {
            return prev.despliegueCart = !prev.despliegueCart
        })
        const back = document.getElementById('background')
        const backgrounddetail = document.getElementById('backgrounddetail')
        const backgroundcart = document.getElementById('backgroundcart')
        back?.classList.toggle('dontshow')
        backgrounddetail?.classList.toggle('dontshow')
        backgroundcart?.classList.toggle('dontshow')
    }

    handleCloseMiniCart(){
        this.setState(prev => {
            return prev.despliegueCart = false
        })
        const back = document.getElementById('background')
        back?.classList.remove('dontshow')
    }

    handleRemoveItem(name, cantidad){
        if(cantidad === 1){
            this.props.removeItemCart(name)
        } else{
            this.props.decrementItemCart(name)
        }
    }

    handleAddItem(name){
        this.props.addItemCart(name)
    }

    render() {
        const cIndex = this.props.currentCurrencyIndex
        let sum = 0
        const sym = this.props.cart[0]?.prices[cIndex].currency.symbol
        this.props.cart.map(el => sum = sum + el.prices[cIndex]?.amount)
        return (
            <Fragment>
            <div className={styles.container}>
                <div className={styles.categories}>
                    {this.props.categories.length > 0 && (
                        this.props.categories.map((el, index) => (
                            <NavLink onClick={()=> this.handleCloseMiniCart()} to={`/home/${el.name}`} className={styles.navlink} activeClassName={styles.activenav} key={index}>{el.name.toUpperCase()}</NavLink>
                        ))
                    )}
                </div>
                <div className={styles.bag}>
                    <img src={bag} alt="bag logo"/>
                </div>
                <div className={styles.clientcontainer}>
                    <div id='currencycontainer' className={styles.currencycontainer}>
                        {this.props.currencies.length > 0 && (
                            !this.state.despliegue
                            ? <h4 className={styles.currency} onClick={(e)=> this.handleClick(e)}>{this.state.currency}</h4>
                            : this.props.currencies.map((el, index) => (
                                <h4 className={styles.currency} onClick={(e)=> this.handleClick(e)} key={index}>{el.symbol} {el.label}</h4>
                            ))
                        )}
                    </div>                    
                    <div className={styles.cartcontainer}>
                        {/* <Link to={'/resume/cart'}> */}
                            <img onClick={()=> this.handleClickCart()} src={cart} alt='cart logo'/>  
                        {/* </Link>                       */}
                    </div>
                    <div className={styles.cartlength}>
                        {this.props.cart.length > 0 && (
                            <p>{this.props.cart.length}</p>
                        )}
                    </div>
                </div>
            </div>
            {this.state.despliegueCart
                &&
                <div className={styles.minicart}>
                    <h4><span>My Bag, </span>{this.props.cart.length} items</h4>
                    {this.props.cart.length > 0 ? (
                        this.props.cart.map((el,i)=> (
                            <Fragment key={i}>
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
                                        <button onClick={()=> this.handleAddItem(el.name)} type='button'>+</button>
                                            <p>{el.cantidad}</p>
                                        <button onClick={()=> this.handleRemoveItem(el.name, el.cantidad)} type='button'>-</button>
                                    </div>
                                    <img src={el.gallery[0]} alt={el.name}/>
                                </div>
                            </div>
                            </Fragment>
                        ))
                    )
                    : <h4 className={styles.emptycart}>Your cart is empty</h4>
                    }
                    <div className={styles.totalcart}>
                        <h4 className={styles.total}>Total</h4>
                        <h4 className={styles.totalamount}>{sym}{Math.trunc(sum)}</h4>
                    </div>
                    <div className={styles.checkoutcart}>
                        <Link to={'/resume/cart'} onClick={()=> this.handleCloseMiniCart()}>                                
                            <button type='button' className={styles.viewbag}>VIEW BAG</button>
                            <button type='button' className={styles.checkout}>CHECKOUT</button>
                        </Link>
                    </div>
                </div>
            }
            </Fragment>
        )
    }
}

function mapStateToProps(state){
    return{
        categories: state.categories,
        currencies: state.currencies,
        cart: state.cart,
        currentCurrencyIndex: state.currentCurrencyIndex
    }
}

function mapDispatchToProps(dispatch){
    return{
        getCategories: () => dispatch(getCategories()),
        getCurrencies: () => dispatch(getCurrencies()),
        setCurrentCurrency: (currency) => dispatch(setCurrentCurrency(currency)),
        removeItemCart: (name)=> dispatch(removeItemCart(name)),
        addItemCart: (name)=> dispatch(addItemCart(name)),
        decrementItemCart: (name)=> dispatch(decrementItemCart(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
