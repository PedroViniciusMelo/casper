import React, {useState, useEffect} from "react";
import {signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from "../firebase/config";
import {FaFacebook} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import loading2 from "../assets/loading2.gif";
import NotFoud from "../util/NotFoud";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    //create a function to handle the login
    const handleLogin = () => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setLogged(true)
                setLoading(false)
                alert("Login realizado com sucesso!")
            })
            .catch(() => {
                setLogged(false)
                setLoading(false)
            });
    }


    if(logged){
        navigate('../admin')
    }
    return (
        <section className="vh-100">
            <div className="container h-100">
                {
                    !loading ?
                        (
                            <div className="row d-flex align-items-center justify-content-center h-100">
                                <div className="col-md-8 col-lg-7 col-xl-6">
                                    <img
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                        className="img-fluid" alt="login"/>
                                </div>
                                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                    <div className={"col-md-12 text-center mb-5 "}>
                                        <h1>Login</h1>
                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form1Example13">Email</label>
                                        <input type="email" id="form1Example13"
                                               className="form-control form-control-lg"
                                               value={email} onChange={e => {
                                            setEmail(e.target.value)
                                        }}/>

                                    </div>

                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form1Example23">Senha</label>
                                        <input type="password" id="form1Example23"
                                               className="form-control form-control-lg"
                                               value={password} onChange={e => {
                                            setPassword(e.target.value)
                                        }}/>

                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-3">
                                            <button type="button" className="btn btn-primary btn-lg btn-block"
                                                    onClick={handleLogin}>Log in
                                            </button>
                                        </div>
                                        <div className="col-md-1 text-center">

                                        </div>
                                        <div className="col-md-8">
                                            <button className="btn btn-primary btn-lg btn-block text-center"
                                                    style={{backgroundColor: "#3b5998"}}
                                                    type={"button"}>
                                                <FaFacebook className={"me-2"}/>Continue com o Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) :
                        <img src={loading2} alt={"Loading"}/>
                }
            </div>
        </section>
    )
}