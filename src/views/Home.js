import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="card px-3 pt-3" style={{maxWidth: '32rem'}}>
            <div>
                <div className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
                     data-mdb-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/new/fluid/city/113.webp" className="img-fluid" alt={"teste"}/>
                    <Link to="#!">
                        <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                    </Link>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <a href="" className="text-info">
                            <i className="fas fa-plane"></i>
                            Travels
                        </a>
                    </div>

                    <div className="col-6 text-end">
                        <u> 15.07.2020</u>
                    </div>
                </div>

                <a href="" className="text-dark">
                    <h5>This is title of the news</h5>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, iste aliquid. Sed
                        id nihil magni, sint vero provident esse numquam perferendis ducimus dicta
                        adipisci iusto nam temporibus modi animi laboriosam?
                    </p>
                </a>
            </div>
        </div>
    )
}