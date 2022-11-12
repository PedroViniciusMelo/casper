import React, {useState, useRef, useEffect} from "react";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage, db} from "../../firebase/config";
import {ref as dbRef, push, update, onValue, remove} from "firebase/database";

export default function AdminHome() {
    const [geralData, setGeralData] = useState();
    const [geralUpdateData, setGeralUpdateData] = useState();

    const image = useRef();
    const [noticias, setNoticias] = useState([]);

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

    const handleSubmit = async () => {
        const file = image.current.files[0];
        const storageRef = ref(storage, file.name);

        await uploadBytes(storageRef, file)

        const imageURL = await getDownloadURL(storageRef)

        const key = push(dbRef(db, 'noticias')).key;

        await update(dbRef(db, 'noticias/' + key), {image: imageURL, ...geralData})

        alert("Notícia criada com sucesso")
    }

    const handleDelete = async (id) => {
        let a = window.confirm("Tem certeza que deseja deletar essa notícia?")
        if (a) {
            await remove(dbRef(db, 'noticias/' + id))
            alert("Notícia removida com sucesso")
        }
    }


    return (
        <div className={"container"}>
            <table className="table table-striped table-hover">
                <thead>
                <tr style={{backgroundColor: 'blue', color: 'white'}}>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Categoria</th>
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
                            <td>
                                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                                    <button className={"btn btn-danger"} onClick={ () => handleDelete(key)}>Excluir
                                    </button>
                                    <button className={"btn btn-warning"} onClick={() => setGeralUpdateData(noticias[key])}>Editar</button>
                                    <button className={"btn btn-success"}>Visualizar</button>
                                </div>
                            </td>
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Criar nova notícia
            </button>

            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Criar nova notícia</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <label htmlFor="titulo" className="form-label">Título</label>
                            <div className="input-group mb-3">
                                <input onChange={handleTextChange("titulo")} type="text" className="form-control"
                                       placeholder="Título" aria-label="Username"
                                       aria-describedby="basic-addon1" name="titulo"/>
                            </div>

                            <label htmlFor="categoria" className="form-label">Categoria</label>
                            <select defaultValue={'-1'} onChange={handleTextChange("categoria")} name={"categoria"}
                                    className="form-select" aria-label="Default select example">
                                <option value={'-1'} disabled>Selecione a categoria da notícia</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>

                            <label htmlFor="descricao" className="form-label">Descrição</label>
                            <div className="input-group">
                                <textarea onChange={handleTextChange("descricao")} className="form-control"
                                          aria-label="With textarea"></textarea>
                            </div>

                            <label htmlFor="descricao" className="form-label">Imagem</label>
                            <div className="input-group">
                                <input onChange={handleTextChange("imagem")} ref={image} name={"Imagem"} type="file" className="form-control"
                                       id="inputGroupFile04"
                                       aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}
                                    data-bs-dismiss="modal">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}