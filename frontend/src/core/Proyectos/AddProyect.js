import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAuthenticated, createProyect, getUser } from '../apiCore';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const AddProyect = ({loadProyectos}) => {

    const [values, setValues] = useState({
        responsable: '',
        cc: '',
        cliente: '',
        observaciones: '',
        error: '',
        usuario: [],
        formData: ''
    });

    const history = useHistory();
    const { responsable, cc, cliente, observaciones, usuario, error, formData } = values;
    const { user, token } = isAuthenticated();

    //Reamplazar proyecto por usuarios
    const init = async () => {
        await getUser().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, usuario: data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        init();
    }, []);

    const handleChange = name => event => {
        formData.set(name, event.target.value)
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '' })
        createProyect(user._id, token, formData).then(data => {
            console.log('crear proyecto, data: ', data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    responsable: '',
                    cc: '',
                    cliente: '',
                    observaciones: '',
                });
                toast.success('Proyecto guardado');
                setModal(!modal);
                //history.push('/');
                //window.location.reload();
                loadProyectos();
            }
        })
    }

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //------------------------------------------------------------------------------------------------------------------------------
    const newProyectForm = () => (<>
        {isAuthenticated() && (
        <div>
            <Button color="dark" onClick={toggle}>Nuevo proyecto</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Agregar nuevo proyecto</ModalHeader>
                <ModalBody>
                    <form className="mb-3" onSubmit={clickSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Respondable: </label>
                            <select onChange={handleChange('responsable')} type='text' className='form-control'>
                                <option>Selecciona</option>
                                {usuario && usuario.map((c, i) => (
                                    <option key={i} value={c.nombre}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">CC: </label>
                            <input onChange={handleChange('cc')} type='text' className="form-control" value={cc}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Cliente: </label>
                            <input onChange={handleChange('cliente')} type='text' className="form-control" value={cliente}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Observaciones: </label>
                            <textarea onChange={handleChange('observaciones')} type='text' className="form-control" value={observaciones} rows={3}></textarea>
                        </div>
                        <Button>Registrar Proyecto</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
        )}
    </>)


    //----------------------------------------------------------------------------------------------------------------------------------
    return (<>

        <div className="container mt-10">
            {newProyectForm()}
        </div>
    </>)
}

export default AddProyect;