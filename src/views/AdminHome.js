import React, {useState, useRef, useEffect} from "react";
import {ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";
import {storage, db, auth} from "../firebase/config";
import {ref as dbRef, push, update, onValue, remove} from "firebase/database";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import FAB from "../components/FloatingButton";
import {MdAdd} from "react-icons/md";
import Modal from 'react-bootstrap/Modal';
import {onAuthStateChanged} from "firebase/auth";

export default function AdminHome() {
    const [geralData, setGeralData] = useState({
        titulo: '',
        descricao: '',
        categoria: '-1'
    });
    const [geralUpdateData, setGeralUpdateData] = useState({
        titulo: '',
        descricao: '',
        categoria: '-1',
    });
    const [selectedKey, setSelectedKey] = useState();

    const image = useRef();
    const imageUpdate = useRef();
    const [noticias, setNoticias] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate("../login")
            }
        })
    }, [navigate])

    useEffect(() => {
        onValue(dbRef(db, 'noticias'), (snapshot) => {
            const data = snapshot.val();
            setNoticias(data);
        })
    }, [])

    const handleTextChange = (name) => {
        return (event) => {
            setGeralData({...geralData, [name]: event.target.value})
        }
    }

    const handleTextChangeUpdate = (name) => {
        return (event) => {
            setGeralUpdateData({...geralUpdateData, [name]: event.target.value})
        }
    }

    //validate the form
    const validateForm = () => {
        return geralData.titulo.length > 0 && geralData.descricao.length > 0 && geralData.categoria !== '-1' && image.current.files.length > 0;
    }

    const validateUpdateForm = () => {
        return geralUpdateData.titulo.length > 0 && geralUpdateData.descricao.length > 0 && geralUpdateData.categoria !== '-1'
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            toast.warning('Aguarde, em um momento criaremos sua notícia!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            const file = image.current.files[0];
            const storageRef = ref(storage, "images/" + file.name);

            await uploadBytes(storageRef, file)

            const imageURL = await getDownloadURL(storageRef)

            const key = push(dbRef(db, 'noticias')).key;

            await update(dbRef(db, 'noticias/' + key), {image: imageURL, file: file.name, ...geralData})

            toast.success('Eba! Notícia criada com sucesso!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setSaveModal(false)
        } else {
            toast.error('Preencha todos os campos!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    const handleDelete = async (id, fileName) => {
        let a = window.confirm("Tem certeza que deseja deletar essa notícia?")
        if (a) {
            const storageRef = ref(storage, 'images/' + fileName)

            deleteObject(storageRef)
                .catch(() => {
                    toast.error('Aconteceu um erro ao deletar o arquivo!', {
                        position: "bottom-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    })
                }).then(() => {

                remove(dbRef(db, 'noticias/' + id))
                    .then(() => {
                        toast.success('Notícia removida com sucesso!', {
                            position: "bottom-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        })
                    })
            })

        }
    }

    const handleUpdate = async () => {
        if (validateUpdateForm()) {
            toast.warning('Aguarde, em um momento atualizaremos sua notícia!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            const file = imageUpdate.current.files[0];
            if (file) {
                const storageRef = ref(storage, file.name);

                await uploadBytes(storageRef, file)

                const imageURL = await getDownloadURL(storageRef)

                await update(dbRef(db, 'noticias/' + selectedKey), {
                    image: imageURL,
                    file: file.name, ...geralUpdateData
                })
            } else {
                await update(dbRef(db, 'noticias/' + selectedKey), geralUpdateData)
            }

            toast.success('Eba! Notícia atualizada com sucesso!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            toast.error('Preencha todos os campos com informações válidas!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }

    const actions = [
        {
            label: "Adicionar nova notícia", icon:
                <MdAdd data-bs-toggle="modal" data-bs-target="#exampleModal"/>
            , onClick: () => setSaveModal(true)
        },
    ];


    return (
        <div className={"container"}>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="card">
                <h5 className="card-header">Notícias</h5>
                <div className="card-body">
                    <div className={"table-responsive"}>
                        <table className="table table-striped table-hover">
                            <thead>
                            <tr style={{backgroundColor: 'blue', color: 'white'}}>
                                <th scope="col">#</th>
                                <th scope="col">Título</th>
                                <th scope="col">Descrição</th>
                                <th scope="col">Categoria</th>
                                <th scope="col">Imagem</th>
                                <th scope="col">Url</th>
                                <th scope="col">Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {noticias && Object.keys(noticias).map((key, index) => {
                                return (
                                    <tr key={key}>
                                        <td>{index + 1}</td>
                                        <td>{noticias[key].titulo}</td>
                                        <td>{noticias[key].descricao.slice(0, 40)}...</td>
                                        <td>{noticias[key].categoria}</td>
                                        <td><a href={noticias[key].image}>Acessar imagem</a></td>
                                        <td><Link className={"btn btn-success"} to={"../view/" + key}>Visualizar</Link>
                                        </td>
                                        <td>
                                            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                                <button className={"btn btn-danger"}
                                                        onClick={() => handleDelete(key, noticias[key].file)}>Excluir
                                                </button>
                                                <button className={"btn btn-warning"} data-bs-toggle="modal"
                                                        data-bs-target="#editmodal" onClick={() => {
                                                    setGeralUpdateData(noticias[key])
                                                    setSelectedKey(key)
                                                    setUpdateModal(true)
                                                }}>Editar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                        <FAB actions={actions}/>
                    </div>
                </div>
            </div>

            <Modal show={saveModal} onHide={() => setSaveModal(false)}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLabel">Criar nova notícia</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                            aria-label="Close" onClick={() => setSaveModal(false)}></button>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <div className="input-group mb-3">
                        <input value={geralData.titulo} onChange={handleTextChange("titulo")} type="text"
                               className="form-control"
                               placeholder="Título" aria-label="Username"
                               aria-describedby="basic-addon1" name="titulo"/>
                    </div>

                    <label htmlFor="categoria" className="form-label">Categoria</label>
                    <select value={geralData.categoria} onChange={handleTextChange("categoria")}
                            name={"categoria"}
                            className="form-select" aria-label="Default select example">
                        <option value={'-1'} disabled>Selecione a categoria da notícia</option>
                        <option value="Esportes">Esportes</option>
                        <option value="Política">Política</option>
                        <option value="Entretenimento">Entretenimento</option>
                        <option value="Famosos">Famosos</option>
                    </select>

                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <div className="input-group">
                                <textarea value={geralData.descricao} onChange={handleTextChange("descricao")}
                                          className="form-control"
                                          aria-label="With textarea"></textarea>
                    </div>

                    <label htmlFor="descricao" className="form-label">Imagem</label>
                    <div className="input-group">
                        <input onChange={handleTextChange("imagem")} ref={image} name={"Imagem"} type="file"
                               className="form-control"
                               accept={"image/*"}
                               id="inputGroupFile04"
                               aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                            onClick={() => setSaveModal(false)}>Fechar
                    </button>
                    <button type="button" className="btn btn-primary"
                            onClick={handleSubmit}>Salvar
                    </button>
                </Modal.Footer>

            </Modal>


            <Modal show={updateModal} onHide={() => setUpdateModal(false)}>
                <Modal.Header>
                    <h5 className="modal-title" id="exampleModalLabel">Criar nova notícia</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                            aria-label="Close" onClick={() => setUpdateModal(false)}></button>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="titulo" className="form-label">Título</label>
                    <div className="input-group mb-3">
                        <input value={geralUpdateData.titulo} onChange={handleTextChangeUpdate("titulo")}
                               type="text" className="form-control"
                               placeholder="Título" aria-label="Username"
                               aria-describedby="basic-addon1" name="titulo"/>
                    </div>

                    <label htmlFor="categoria" className="form-label">Categoria</label>
                    <select value={geralUpdateData.categoria} onChange={handleTextChangeUpdate("categoria")}
                            name={"categoria"}
                            className="form-select" aria-label="Default select example">
                        <option value={'-1'} disabled>Selecione a categoria da notícia</option>
                        <option value="Esportes">Esportes</option>
                        <option value="Política">Política</option>
                        <option value="Entretenimento">Entretenimento</option>
                        <option value="Famosos">Famosos</option>
                    </select>

                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <div className="input-group">
                                <textarea value={geralUpdateData.descricao}
                                          onChange={handleTextChangeUpdate("descricao")}
                                          className="form-control"
                                          aria-label="With textarea"></textarea>
                    </div>

                    <label htmlFor="descricao" className="form-label">Imagem</label>
                    <div className="input-group">
                        <input ref={imageUpdate} name={"Imagem"} type="file" className="form-control"
                               id="inputGroupFile04"
                               accept={"image/*"}
                               aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                    </div>
                    <label htmlFor="descricao" className="form-label">Imagem anterior</label>
                    <div style={{width: "150px", height: '150px'}}>
                        <img style={{maxWidth: '100%', maxHeight: '100%'}} src={geralUpdateData.image}
                             alt={"Update"}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => setUpdateModal(false)}>Fechar
                    </button>
                    <button type="button" className="btn btn-primary"
                            onClick={() => handleUpdate(geralUpdateData.key)}>Salvar
                    </button>
                </Modal.Footer>

            </Modal>
        </div>
    )
}