import React from "react";
import {BsFillChatDotsFill} from "react-icons/bs";
import {Link} from "react-router-dom";

export default function Header() {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light mr-5">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <BsFillChatDotsFill/> Caster
                </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0"/>
                    <div className="d-flex">
                        <Link className="btn btn-outline-success" to="login">Login</Link>
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button"
                               data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="#">Action</Link></li>
                                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}