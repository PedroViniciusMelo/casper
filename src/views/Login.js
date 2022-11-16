import React, {useState, useEffect} from "react";
import {signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import {auth} from "../firebase/config";
import {useNavigate} from "react-router-dom";
import loading2 from "../assets/loading2.gif";
import {ToastContainer, toast} from 'react-toastify';

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
            })
            .catch(() => {
                setLogged(false)
                setLoading(false)
                toast.error('Aconteceu algum erro, senha ou email inválido. Tente novamente!', {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLogged(true)
            } else {
                setLogged(false)
            }
        })
    }, [])


    if (logged) {
        navigate('../admin')
    }
    return (
        <>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {
                loading ? <img src={loading2} style={{height: '100%', width: '100%'}} alt={"Loading"}/> :
                    <section className="vh-100">
                        <div className="container h-100">
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
                                        <div className="col-md-4">
                                            <button type="button" className="btn btn-primary btn-lg btn-block"
                                                    onClick={handleLogin}>Log in
                                            </button>
                                        </div>

                                        <div className="col-md-8">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
            }

        </>
    )
}