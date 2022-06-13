import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png'
import './Header.css';
import { UserContext } from './../../App';
import { getAuth, signOut } from "firebase/auth";


const Header = () => {
    const auth = getAuth();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const navigate = useNavigate();
    const handleLoginPage = () => {
        navigate('/login')
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(res => {
                const signOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setLoggedInUser(signOutUser)
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button className='SignUpBtn' onClick={loggedInUser.email ? handleSignOut : handleLoginPage}>{loggedInUser.email ? "Sign Out" : "SignIn"}</button>
                <img src={loggedInUser.photo} alt="" />
            </nav>
        </div>
    );
};

export default Header;