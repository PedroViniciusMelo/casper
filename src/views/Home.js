import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {onValue, ref as dbRef} from "firebase/database";
import {db} from "../firebase/config";
import loading2 from "../assets/loading2.gif";
import {Icon, getLayout} from "../util/getLayout";
import {capitalizeFirst} from "../util/stringFormat";

export default function Home() {
    const [noticias, setNoticias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onValue(dbRef(db, 'noticias'), (snapshot) => {
            const data = snapshot.val();
            setNoticias(flaternObject(data));
            setIsLoading(false);
        })
    }, [])

    const renderNoticias = (key, noticia) => {
        return (
            <div key={key} className="col-lg-3 col-md-12 mb-4 mb-1 mx-1 mx-sm-3"
                 style={{backgroundColor: 'white', borderRadius: 50, overflow: 'hidden'}}>
                <div>
                    <div
                        className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                        data-mdb-ripple-color="light">
                        <img alt={"teste de imnage"}
                             style={{height: 200, width: '100%', objectFit: 'cover'}}
                             src={noticia.image}
                             className="img-fluid"/>
                        <div className={"text-decoration-none"}>
                            <div className="mask"
                                 style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <p className={`text-decoration-none ${getLayout(noticia.categoria)}`}>
                                <Icon name={noticia.categoria}/>
                                {capitalizeFirst(noticia.categoria)}
                            </p>
                        </div>
                    </div>

                    <Link to={"view/" + noticia.categoria + "/" + key} className="text-dark text-decoration-none">
                        <h5>{noticia.titulo}</h5>

                        <p>
                            {noticia.descricao.slice(0, 250)}...
                            <span className={"text-primary"}>Ler mais</span>
                        </p>
                    </Link>
                </div>
            </div>
        )
    }

    const flaternObject = (object) => {
        let objeto = {};
        for (let key in object) {
            objeto = {...objeto, ...object[key]}
        }
        return objeto;
    }

    if (isLoading) {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={loading2} alt={"loading"}/>
            </div>
        )
    }

    return (
        <section>
            <div className="row gx-lg-5 d-flex" style={{justifyContent: "space-evenly"}}>
                {
                    noticias && Object.keys(noticias)
                        .map((key) => renderNoticias(key, noticias[key]))
                }
            </div>
        </section>
    )
}