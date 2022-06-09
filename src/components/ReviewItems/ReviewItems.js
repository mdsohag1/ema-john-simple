import React from 'react';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name, quantity, key, price} = props.product;
    return (
        <div className='reviewItems'>
            <h3 className='name'>{name}</h3>
            <h4>Quantity: {quantity}</h4>
            <h3>Price: {price}</h3>
            <br />
            <button onClick={()=>props.handleRemove(key)} className='main-button'>Remove</button>
        </div>
    );
};

export default ReviewItems;