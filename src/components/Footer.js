import React from "react";
import {FaReact, FaGithub, FaFacebook, FaInstagram, FaGem, FaPaperPlane} from "react-icons/fa";
import {DiFirebase} from "react-icons/di";


export default function Footer() {
    return (
        <footer id="footer" className="footer-1 bg-light pt-5">
            <div className="main-footer widgets-dark typo-light">
                <div className="container">
                    <div className="row">

                        <div className="col-xs-12 col-sm-8 col-md-4">
                            <div className="widget subscribe no-box">
                                <h5 className="widget-title"><FaGem className="me-1"/>Casper<span></span></h5>
                                <p>Sistema de gerenciamento de notícias do firebase. Desenvolvido por <a
                                    href="https://github.com/PedroViniciusMelo">Pedro Vinícius</a>. Tem alguma dúvida?
                                    Entre em
                                    contato comigo.</p>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-8 col-md-4">
                            <div className="widget no-box">
                                <h5 className="widget-title">Links úteis<span></span></h5>
                                <p>
                                    <FaReact/>
                                    <a href="https://pt-br.reactjs.org/" className="text-reset">React</a>
                                </p>
                                <p>
                                    <DiFirebase/>

                                    <a href="https://firebase.google.com/" className="text-reset">Firebase</a>
                                </p>
                                <p>
                                    <FaGithub/>
                                    <a href="https://github.com/PedroViniciusMelo/casper" className="text-reset">Link do
                                        repositório</a>
                                </p>
                            </div>
                        </div>

                        <div className="col-xs-12 col-sm-8 col-md-4">

                            <div className="widget no-box">
                                <h5 className="widget-title">Contato<span></span></h5>

                                <p>
                                    <FaPaperPlane className={"pe-1"}/>
                                    <a href="mailto:pedro.vinicius.melo.silva@gmail.com"
                                       className={"text-decoration-none text-dark"}
                                       title="email">pedro.vinicius.melo.silva@gmail.com</a>

                                </p>
                                <div className="social-footer2">
                                    <p>
                                        <FaFacebook className={"pe-1"}/>
                                        <a href="https://www.facebook.com/profile.php?id=100008039834524"
                                           className={"text-decoration-none text-dark"}>Facebook</a>
                                    </p>
                                    <p>
                                        <FaInstagram className={"pe-1"}/>
                                        <a href="https://www.instagram.com/pedro.vncius/"
                                           className={"text-decoration-none text-dark"}>Instagram</a>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                © 2022 Copyright
            </div>
        </footer>
    )
}