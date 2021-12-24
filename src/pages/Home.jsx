import React, {useEffect} from 'react'
import Header from '../components/Header'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=> {
        if(!localStorage.getItem('isLoggedIn')){
            navigate('/login-register')
        }
    })

    

    console.log("Local Storage", localStorage.getItem('isLoggedIn'))
    return (
        <div>
            <Header/>
            Home Page
        </div>
    )
}

export default Home
