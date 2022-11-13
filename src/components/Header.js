import React from "react";
import {BsFillChatDotsFill} from "react-icons/bs";
import {Link, redirect} from "react-router-dom";
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill} from "react-icons/bs";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/config";

export default function Header({user}) {

    const handleLogout = async () => {
        await signOut(auth)
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mr-5">
            <div className="container-fluid">
                <Link className="navbar-brand" style={{display: 'flex', alignItems: 'center'}} to="/">
                    <BsFillChatDotsFill className={"me-1"}/> Caster
                </Link>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0"/>
                    <Link  style={{fontSize: '12pt'}} className="navbar-brand btn" to={!user ? 'login' : 'admin'}>
                        Admin
                    </Link>
                    <div className="d-flex">
                        <div className="nav-item dropdown me-5">
                            <button type={"button"} className="btn nav-link dropdown-toggle text-primary" id="navbarDropdown"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                {user ? user.email : 'Usuário'}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="admin">Área do administrador</Link></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                {!user ?
                                    <li className={"dropdown-item"}>
                                        <Link className={"btn text-success"} to="login">
                                            <BsFillArrowRightCircleFill size={30} className={"text-success me-2"}/>
                                            Log in
                                        </Link>
                                    </li>
                                    :
                                    <li className={"dropdown-item"}>
                                        <button type={"button"} className={"btn text-danger"} onClick={handleLogout}>
                                            <BsFillArrowLeftCircleFill size={30} className={"text-danger me-2"}/>
                                            Log out

                                        </button>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}