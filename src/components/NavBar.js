import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getCategories, getCurrencies } from '../redux/action';
import styles from '../styles/navbar.module.css'
import cart from '../images/cart.png'
import { NavLink } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            despliegue: false,
            currency: '$ USD'
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
        console.log(this.state)
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.categories}>
                    {this.props.categories.length > 0 && (
                        this.props.categories.map((el, index) => (
                            <NavLink to={`/home/${el.name}`} className={styles.navlink} activeClassName={styles.activenav} key={index}>{el.name.toUpperCase()}</NavLink>
                        ))
                    )}
                </div>
                <div className={styles.clientcontainer}>
                    <div className={styles.currencycontainer}>
                        {this.props.currencies.length > 0 && (
                            !this.state.despliegue
                            ? <h4 className={styles.currency} onClick={(e)=> this.handleClick(e)}>{this.state.currency}</h4>
                            : this.props.currencies.map((el, index) => (
                                <h4 className={styles.currency} onClick={(e)=> this.handleClick(e)} key={index}>{el.symbol}{el.label}</h4>
                            ))
                        )}
                    </div>
                    <div className={styles.cartcontainer}>
                        <img src={cart} alt='cart logo'/>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        categories: state.categories,
        currencies: state.currencies
    }
}

function mapDispatchToProps(dispatch){
    return{
        getCategories: () => dispatch(getCategories()),
        getCurrencies: () => dispatch(getCurrencies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
