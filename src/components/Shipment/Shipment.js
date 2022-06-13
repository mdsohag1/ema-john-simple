import React, { useContext } from 'react';
import {useForm} from 'react-hook-form'
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import { UserContext } from './../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const onSubmit = data => {
      const saveCart = getStoredCart();
      const orderDatails = {...loggedInUser, products: saveCart, shipment: data, orderTime: new Date()}

      fetch('https://immense-brook-50882.herokuapp.com/addOrder', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(orderDatails)
      })
      .then(res => res.json())
      .then(data => {
        if(data){
          clearTheCart();
          alert('your order successfully')
        }
      })

    };
  
    // console.log(watch("example")); // watch input value by passing the name of it
  
    return (
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        
        <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name"/>
        {errors.name && <span>Name is required</span>}

        <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
        {errors.email && <span className='error'>Email is required</span>}

        <input {...register("address", { required: true })} placeholder="Your Your Address" />
        {errors.address && <span className='error'>Address is required</span>}

        <input {...register("phone", { required: true })} placeholder="Your Phone Number" />
        {errors.phone && <span className='error'>Phone Number is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;