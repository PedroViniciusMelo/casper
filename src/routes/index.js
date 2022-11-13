import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {BrowserRouter as Router, Routes as RouterRoutes, Route} from "react-router-dom";
import Home from "../views/Home";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase/config";
import Login from "../views/Login";
import AdminHome from "../views/AdminHome";
import ViewNews from "../views/ViewNews";
import NotFoud from "../util/NotFoud";

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
            <Header user={user}/>
            <div style={{marginTop: '3%', marginBottom: '6%'}}>
                <RouterRoutes path={"/"}>
                    <Route index element={<Home/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    {user && (
                        <>
                            <Route path={'admin'} element={<AdminHome/>}/>
                            <Route path={"view/:id"} element={<ViewNews/>}/>
                        </>
                    )}
                    <Route path={'*'} element={<NotFoud/>}/>
                </RouterRoutes>
            </div>
            <Footer/>
        </Router>

    );
}
