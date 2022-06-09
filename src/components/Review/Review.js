import React, { useEffect, useState } from 'react';
import {clearTheCart, getStoredCart} from '../../utilities/fakedb'
import fakeData from '../../fakeData'
import ReviewItems from '../ReviewItems/ReviewItems';
import {deleteFromDb} from '../../utilities/fakedb'
import Cart from '../Cart/Cart';
import happy from '../../images/giphy.gif';
import {  useNavigate } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false); 
    const navigate = useNavigate();
    // const history = createBrowserHistory();

    const handleRemove = (key) => {
        const newCart = cart.filter(pd => pd.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    }
    const handleProceedOrder = () => {
        navigate('/shipment')
        // history.push('/shipment')
    }
    useEffect(()=>{
        const savedCart = getStoredCart();
        const productKeys = Object.keys(savedCart)
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProduct);
    }, []);

    let thankyou;
    if(orderPlace){
        thankyou = <img src={happy} alt="" /> ;
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems handleRemove={handleRemove} key={pd.key} product={pd}></ReviewItems>)
                }
                {orderPlace && <h1>Thank you your happy shopping</h1>}
                {thankyou}
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedOrder} className='main-button'>Proceed to Pay</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;