import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {BrowserRouter as Router, Routes as RouterRoutes, Route} from "react-router-dom";
import Home from "../views/Home";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/config";
import Login from "../views/Login";
import AdminHome from "../views/admin/AdminHome";
import ViewNews from "../views/admin/ViewNews";

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
        setUser(true)
    }, [])

    return (
        <Router>
            <Header/>
            <div style={{marginTop: '3%', marginBottom: '6%'}}>
                <RouterRoutes path={"/"}>
                    <Route index element={<Home/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'admin'} element={<AdminHome/>}/>
                    <Route path={'*'} element={<h1>404</h1>}/>
                    <Route path={"view/:id"} element={<ViewNews/>}/>
                </RouterRoutes>
            </div>
            <Footer/>
        </Router>

    );
}
