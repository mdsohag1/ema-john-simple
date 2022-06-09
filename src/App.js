import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/inventory';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(loggedInUser);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <h1>Email: {loggedInUser.email}</h1>
      <BrowserRouter>
      <Header></Header>
          <Routes>
              <Route path="/shop" element={<Shop></Shop>}/>
              <Route path="/review" element={<Review></Review>}/>
              <Route path="/inventory" element={<PrivateRoute>
                <Inventory></Inventory>
              </PrivateRoute>}/>

              <Route path="/shipment" element={<PrivateRoute >
                <Shipment />
              </PrivateRoute>}/>

              <Route path="/login" element={<Login></Login>}/>
              <Route exact path="/" element={<Shop></Shop>}/>
              <Route path="/product/:productKey" element={<ProductDetails></ProductDetails>}/>
              <Route path="*" element={<Notfound></Notfound>}/>
          </Routes>
          
      </BrowserRouter>

    </UserContext.Provider>
  );
}


export default App;
