import React, { useState, useEffect } from 'react';
import './Login.css';
import Card from './Card';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import {signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GithubAuthProvider,
    GoogleAuthProvider,
    signInWithPopup} from "@firebase/auth";
import auth from "../firebase-config/configuration";

const Login = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const signInEmail = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+ " Error code");
                console.log(errorMessage+ " Error message");
            });
    }

    const signUpEmail = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate('/home')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode+ " Error code");
                console.log(errorMessage+ " Error message");
            });
    }

    const signInFacebook = () => {
        signInWithPopup(auth, new FacebookAuthProvider())
            .then((response) => {
                navigate("/home")
            }).catch((err)=> {
            console.log(err)
        })
    }

    const signInGithub = () => {
        signInWithPopup(auth, new GithubAuthProvider())
            .then((response) => {
                navigate("/home")
            }).catch((err)=> {
            console.log(err)
        })
    }

    const signInGoogle = () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                navigate("/home")
            }).catch((err)=> {
            console.log(err)
        })
    }

    const change = ( elementClass: string) => {
        gsap.to(elementClass, {
            top:-7,
            transition: 0.1
        })
    }

    return (
        <>
            <Card>
                <div className="LoginContainer1">
                    <div className="LoginContainer1__left"></div>
                    <div className="LoginContainer1__right"></div>
                </div>
                <div className="LoginContainer2">
                    <div className="form__group">
                        <input type="text" className="form__field" id='email'
                               onChange={(e) => {setEmail(e.target.value)}}
                               onClick={()=>{ change(".emailLabel");}}/>
                        <label htmlFor="email" className="form__label emailLabel">Email</label>
                    </div>
                    <div className="form__group">
                        <input type="password" className="form__field" id='password'
                               onChange={(e) => {setPassword(e.target.value)}}
                               onClick={()=>{ change(".passLabel");}}/>
                        <label htmlFor="password" className="form__label passLabel">Password</label>
                    </div>
                    <div className="LoginContainer2__button">
                        <button onClick={() => { signInEmail()}}>sign in</button>
                        <button onClick={() => { signUpEmail()}}>sign up</button>
                    </div>
                        <ul className="wrapper">
                            <li className="icon facebook" onClick={signInFacebook}>
                                <span className="tooltip">Facebook</span>
                                <span><i className="fab fa-facebook-f"></i></span>
                            </li>
                            <li className="icon twitter" onClick={signInGoogle}>
                                <span className="tooltip">Google</span>
                                <span><i className="fab fa-google"></i></span>
                            </li>
                            <li className="icon github" onClick={signInGithub}>
                                <span className="tooltip">Github</span>
                                <span><i className="fab fa-github"></i></span>
                            </li>
                        </ul>
                </div>
            </Card>
        </>
    );
};

export default Login;