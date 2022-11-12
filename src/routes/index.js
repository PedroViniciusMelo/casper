import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {BrowserRouter as Router, Routes as RouterRoutes, Route} from "react-router-dom";
import Home from "../views/Home";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/config";
import Admin from "./Admin";

export default function Routes() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            } else {
                setUser(null)
            }
        })
    }, [])

    return (
        <Router>
            <Header/>
            <RouterRoutes path={"/"}>
                <Route index element={<Home/>}/>
                {
                    user &&
                    <Route path={'admin/*'} element={<Admin/>}/>
                }
            </RouterRoutes>
            <Footer/>
        </Router>

    );
}
