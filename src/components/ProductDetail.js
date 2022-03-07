import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { getProductDetail, getProducts, addCart } from '../redux/action'
import styles from '../styles/productdetail.module.css'

class ProductDetail extends Component {

    async componentDidMount(){
        await this.props.getProducts()
        await this.props?.getProductDetail(this.props.match.params.category, this.props.match.params.id)
    }

    handleClick(e, product){
        e.preventDefault()
        this.props.addCart(product)
    }

    render() {
        const product = this.props.productDetail
        const description = product[0]?.description
        return (
            <div className={styles.container}>
                {product.length > 0 && (
                    <Fragment>
                        <div className={styles.previewimages}>
                            {product[0]?.gallery.map((el, i) => (
                                <img key={i} src={el} alt={product[0]?.name}/>
                            ))}
                        </div>
                        <div className={styles.image}>
                            <img src={`${product[0]?.gallery[0]}`} alt={`${product[0]?.name}`}/>
                        </div>
                        <div className={styles.content}>
                            <h4 className={styles.name}>{product[0]?.name}</h4>
                            <h4 className={styles.brand}>{product[0]?.brand}</h4>
                            {product[0]?.attributes.map((el, i) => (
                                <h4 key={i} className={styles.attribute}>{el.name.toUpperCase()}:</h4>
                            ))}                            
                            <h4 className={styles.price}>PRICE:</h4>
                            <h4 className={styles.amount}>{product[0]?.prices[0].currency.symbol}{product[0].prices[0].amount}</h4>
                            <button onClick={(e)=>this.handleClick(e, product)} className={styles.btnaddcart}>Add to Cart</button>
                            <p className={styles.description}>{description}</p>
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        allProducts: state.allProducts,
        productDetail: state.productDetail,
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return{
        getProductDetail: (category, id)=> dispatch(getProductDetail(category, id)),
        getProducts: () => dispatch(getProducts()),
        addCart: (product) => dispatch(addCart(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)