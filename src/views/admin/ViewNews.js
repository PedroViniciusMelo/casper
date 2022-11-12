import React from "react";
import {Link, useParams} from "react-router-dom";

export default function ViewNews() {
    let {id} = useParams();
    return(
        <div className="row gx-5">
            <div className="col-md-6 mb-4">
                <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/slides/080.webp" className="img-fluid" alt={"teste"}/>
                    <Link to="#">
                        <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                    </Link>
                </div>
            </div>

            <div className="col-md-6 mb-4">
                <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">News of the day</span>
                <h4><strong>Facilis consequatur eligendi</strong></h4>
                <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur
                    eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum
                    sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.
                </p>
                <button type="button" className="btn btn-primary">Read more</button>
            </div>
        </div>
    )
}