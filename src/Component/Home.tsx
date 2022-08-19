import React, {useEffect, useState} from 'react';
import Card from './Card';
import './Home.css'
import { useNavigate} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "@firebase/auth";

const Home = () => {
    const [user, setUser] = useState<string>("");
    const auth = getAuth();
    const navigate = useNavigate();
    const signOuts = () => {
        signOut(auth);
        navigate("/login")
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUse)=>{
            if(currentUse?.displayName?.length){
                setUser(currentUse?.displayName)
            }
            if(currentUse?.email){
                setUser(currentUse?.email)
            }
        })
        return unsubscribe;
    }, [])

    return (
        <div>
            <Card>
                <div className="message">
                    <h3>vous ête connécté à</h3>
                    <h1>{user}</h1>
                </div>
                <div className="logOut">
                    <button onClick={signOuts}>log out</button>
                </div>
            </Card>
        </div>
    );
};

export default Home;