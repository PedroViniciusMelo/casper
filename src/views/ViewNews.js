import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {onValue, ref as dbRef} from "firebase/database";
import {db} from "../firebase/config";
import {getLayout, Icon} from "../util/getLayout";

export default function ViewNews() {
    let {id} = useParams();
    const [news, setNews] = useState();

    useEffect(() => {
        onValue(dbRef(db, 'noticias/' + id), (snapshot) => {
            const data = snapshot.val();
            setNews(data);
        })
    }, [id])

    console.log(news)
    return(
        <div className={"container"}>
            <div className="row gx-5">
                <div className="col-md-6 mb-4">
                    <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                        <img src={news?.image} style={{height: 300, width: '100%', objectFit: 'cover'}} className="img-fluid" alt={"teste"}/>
                        <Link to="#">
                            <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                        </Link>
                    </div>
                </div>

                <div className="col-md-6 mb-4">
                    <h4><strong>{news?.titulo}</strong></h4>
                    <div className="row mb-3">
                        <div className="col-6">
                            <p className={`text-decoration-none ${getLayout(news?.categoria)}`}>
                                <Icon name={news?.categoria} />
                                {news?.categoria}
                            </p>
                        </div>
                    </div>
                    <p className="text-muted">
                        {news?.descricao}
                    </p>
                </div>
            </div>
        </div>
    )
}