import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Login from './Component/Login';
import Home from './Component/Home'
import {onAuthStateChanged} from "@firebase/auth";
import auth from "./firebase-config/configuration";
import Loading from "./Component/Loading"

export default function App() {const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUse)=>{
            if(currentUse?.displayName || currentUse?.email){
                navigate('/home')
            }else {
                navigate("/login")
            }
        })
        return unsubscribe;
    }, [])
  return (
    <>
      <Routes>
          <Route path="/" element={<Loading/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Home/>}>
        </Route>
      </Routes>
    </>
  )
}
