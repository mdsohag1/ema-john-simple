import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
    // const total = cart.reduce((price, product) => price + product.price , 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price
    }
    let shipping = 0;
    if(total > 35){
        shipping = 2.89
    }
    else if( total > 15){
        shipping = 4.99
    }
    else if(total > 0){
        shipping = 12.99
    }
    const  tax = total / 10
    const grandeTotal = total + shipping + tax
    const formateNember = num => {
        const precesiion = num.toFixed(2);
        return Number(precesiion)
    }
    return (
        <div>
            <h1 className='order-s'>Order Summery</h1>
            <h4>Items Ordered: {cart.length}</h4>
            <h5>Shipping fee: $ {shipping}</h5>
            <h5>Tax + VAT: $ {formateNember(tax)}</h5>
            <h4>Total Price (before tax): $ {formateNember(total + shipping)}</h4>
            <h2 className='order-total'>Order Total: $ {formateNember(grandeTotal)}</h2>
            <button className='review-button'>Review your Order</button>
        </div>
    );
};

export default Cart;