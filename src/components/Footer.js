import React from "react";
import { FaGem, FaPaperPlane } from "react-icons/fa";

export default function Footer(){
    return (
        <footer className="text-center text-lg-start bg-light text-muted d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block">
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <FaGem className="me-1"/>Caster - Elife
                            </h6>
                            <p>
                                Sistema de gerenciamento de notícias do firebase. Desenvolvido por <a href="https://github.com/PedroViniciusMelo">Pedro Vinícius</a>. Tem alguma dúvida? Entre em contato comigo.
                            </p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Links úteis
                            </h6>
                            <p>
                                <a href="https://pt-br.reactjs.org/" className="text-reset">React</a>
                            </p>
                            <p>
                                <a href="https://firebase.google.com/" className="text-reset">Firebase</a>
                            </p>
                            <p>
                                <a href="https://github.com/PedroViniciusMelo/casper" className="text-reset">Link do repositório</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Contato</h6>
                            <p>
                                <FaPaperPlane/>
                                pedro.vinicius.melo.silva@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="text-center p-4" style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
                © 2022 Copyright
            </div>
        </footer>
    )
}