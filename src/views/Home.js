import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {onValue, ref as dbRef} from "firebase/database";
import {db} from "../firebase/config";

export default function Home() {
    const [noticias, setNoticias] = useState([]);

    useEffect(() => {
        onValue(dbRef(db, 'noticias'), (snapshot) => {
            const data = snapshot.val();
            setNoticias(data);
        })
    }, [])

    return (
        <div className="container">
            <section>
                <div className="row gx-lg-5">
                    {
                        Object.keys(noticias)
                            .map((key) => {
                                return (
                                    <div key={key} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                                        <div>
                                            <div
                                                className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                                                data-mdb-ripple-color="light">
                                                <img alt={"teste de imnage"}
                                                     src={noticias[key].image}
                                                     className="img-fluid"/>
                                                <Link className={"text-decoration-none"} to="#!">
                                                    <div className="mask"
                                                         style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                                                </Link>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <Link to="#" className="text-info text-decoration-none">
                                                        <i className="fas fa-plane"></i>
                                                        {noticias[key].categoria}
                                                    </Link>
                                                </div>
                                            </div>

                                            <Link to={"view/" + key} className="text-dark text-decoration-none">
                                                <h5>{noticias[key].titulo}</h5>

                                                <p>
                                                    {noticias[key].descricao}
                                                </p>
                                            </Link>

                                            <hr/>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
            </section>
        </div>
    )
}