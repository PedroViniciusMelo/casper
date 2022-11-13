import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {onValue, ref as dbRef} from "firebase/database";
import {db} from "../firebase/config";
import loading2 from "../assets/loading2.gif";
import {Icon, getLayout} from "../util/getLayout";

export default function Home() {
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onValue(dbRef(db, 'noticias'), (snapshot) => {
            const data = snapshot.val();
            setNoticias(data);
            setIsLoading(false);
        })
    }, [])

    return (
        <div className="container">
            <section>
                <div className="row gx-lg-5 d-flex" style={{justifyContent: "space-evenly"}}>
                    {isLoading && <img src={loading2} alt={"loading"}/>}
                    {
                        noticias && Object.keys(noticias)
                            .map((key) => {
                                return (
                                    <div key={key} className="col-lg-3 col-md-12 mb-4 mb-1 me-3" style={{backgroundColor: 'white', borderRadius: 50, overflow: 'hidden'}}>
                                        <div>
                                            <div
                                                className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                                                data-mdb-ripple-color="light">
                                                <img alt={"teste de imnage"}
                                                     style={{height: 300, width: '100%', objectFit: 'cover'}}
                                                     src={noticias[key].image}
                                                     className="img-fluid"/>
                                                <div className={"text-decoration-none"}>
                                                    <div className="mask"
                                                         style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                                                </div>
                                            </div>

                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <p className={`text-decoration-none ${getLayout(noticias[key].categoria)}`}>
                                                        <Icon name={noticias[key].categoria} />
                                                        {noticias[key].categoria}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link to={"view/" + key} className="text-dark text-decoration-none">
                                                <h5>{noticias[key].titulo}</h5>

                                                <p>
                                                    {noticias[key].descricao.slice(0, 400)}...
                                                    <span className={"text-primary"}>Ler mais</span>
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