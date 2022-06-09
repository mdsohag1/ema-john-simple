import React, {useContext, useState} from 'react';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import { UserContext } from './../../App';
import { useLocation, useNavigate } from 'react-router-dom';

initializeApp(firebaseConfig);

const Login = () => {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || '/'

  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(res => {
      const {email, displayName, photoURL} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL
      }
      setUser(signedInUser)
      setLoggedInUser(signedInUser)
      navigate(redirectPath)
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
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
      setUser(signOutUser)
    })
    .catch(err => {
      console.log(err);
    })
  }



  const handleBlur = (e) => {
    let isFormValidate = true;
    if(e.target.name === 'email'){
      isFormValidate = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if(e.target.name === 'password'){
      isFormValidate = /\d{1}/.test(e.target.value)
    }
    if(isFormValidate){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user}
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          updateUserName(user.name)
        })
        .catch((error) => {
          const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    if(!newUser && user.email && user.password){
 
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = {...user}
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo)
          setLoggedInUser(newUserInfo)
          navigate(redirectPath)
          // navigate(redirectPath, {replace: true})
          console.log("sign in userInfo", res.user);
        })
        .catch((error) => {
          const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    e.preventDefault();
  }

  const updateUserName = name => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
        displayName: name
      }).then(() => {
        // Profile updated!
        // ...
      }).catch((error) => {
        // An error occurred
        // ...
      });
  }

  const handleFbSignIn = () => {
    signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> :
                          <button onClick={handleSignIn}>Sign In</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Sign in usiging Facebok</button>
      {
        user.isSignedIn && <div>
                            <img src={user.photo} alt="" />
                            <h2>{user.name}</h2>
                            <h2>{user.email}</h2>
                          </div>
      }
      <h2>our Own Validate</h2>

      <input type="checkbox" name="newUser" id="" onChange={()=>{setNewUser(!newUser)}}/>
      <label htmlFor="newUser">new User Sign Up</label>

      <form action="" onSubmit={handleSubmit}>
        {newUser && <input  onBlur={handleBlur} type="text" name='name' placeholder='Your Name' />}
        <br />
        <input onBlur={handleBlur} type="email" name="email" id="" placeholder='email' required/>
        <br />
        <input onBlur={handleBlur} type="password" name="password" id="" placeholder='password' required/>
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>User { newUser ? 'Created' : 'Loged In' } SuccessFully</p>}
      
    </div>
  );
};

export default Login;