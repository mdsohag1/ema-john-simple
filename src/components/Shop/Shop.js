import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // const first10 = fakeData.slice(0,10)
    const [products, setproducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('https://immense-brook-50882.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setproducts(data))
    }, [])

    useEffect(() => {
        const saveCart = getStoredCart();
        const productKeys = Object.keys(saveCart)
        fetch('https://immense-brook-50882.herokuapp.com/productByKeys', {
            method: 'POST',
            headers: { 'Content-type':'application/json' },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])

    const handleAddProduct = (product) => {
        const tobeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === tobeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== tobeAdded);
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDb(product.key, count);
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                <ul>
                    {
                        products.map(product => <Product key={product.key} showAddToCart={true} product={product} handleAddProduct={handleAddProduct}></Product>)
                    }
                </ul>
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className='review-button'>Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;