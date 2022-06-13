import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setproduct] = useState({});
    
    useEffect(()=>{
        fetch('https://immense-brook-50882.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setproduct(data))
    }, [productKey])

    // const mainProduct = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>Product {productKey} Details here </h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;