import React, { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged} from "firebase/auth" 
import {useNavigate} from "react-router-dom"

const Login = () => {

  let auth = getAuth();
  let googleProvider = new GoogleAuthProvider();
  const signIn = ()=>{
    signInWithPopup(auth, googleProvider)
    .then((res)=>{
      console.log(res.user); // if logined in store in localstorage
      localStorage.setItem("userEmail", res.user.email)
    }).catch((error)=>{
       console.log(error);
    })

  };
 const navigate = useNavigate();

 useEffect(() =>{
      onAuthStateChanged(auth ,(response) =>{
         if(response){
           navigate('/home')
         }
         else{
          navigate('/');
         }
      });
 },[])

  return (
    <div className='login'>
      <GoogleButton 
       onClick={signIn}

      />
    </div>
  )
}

export default Login
