import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons/faShoppingCart'
import './Product.css'

const Product = (props) => {
    const {name, img, seller, price, stock} = props.product;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={img} alt="" />
            </div>
            <div className='title-div'>
                <h3>{name}</h3>
                <h4>by {seller}</h4>
                <div className="price">
                    <div className="main-price">
                        <h3>$ {price}</h3>
                        <p>Only <b>{stock}</b> left in stock - order soon</p>
                        <button 
                            className='main-button' 
                            onClick={()=>{props.handleAddProduct(props.product)}}
                            ><FontAwesomeIcon icon={faShoppingCart} /> Add to Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;