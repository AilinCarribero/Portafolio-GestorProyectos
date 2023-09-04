import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isAuthenticated, editProyect, getUser } from '../apiCore';
import { toast } from 'react-toastify';
import { Estado } from '../Estados';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditProyect = ({ proyecto, toggle, open, getProyectos }) => {
    const [values, setValues] = useState({
        responsable: proyecto.responsable,
        cc: proyecto.cc,
        cliente: proyecto.cliente,
        observaciones: proyecto.observaciones,
        estado: proyecto.estado,
        _id: proyecto._id
    });

    const [usuario, setUsuario] = useState({
        nombreUsuario: []
    });

    const history = useHistory();
    const { responsable, cc, cliente, observaciones, estado } = values;
    const { nombreUsuario } = usuario;
    const { user, token } = isAuthenticated();

    //Pido a /apiCore los datos y los guardo en sus variables correspondientes para que se muestren en el form
    const getUsuario = async => {
        getUser().then(data => {
            if (data.error) {
                setUsuario({ error: data.error })
            } else {
                setUsuario({ nombreUsuario: data })
            }
        })
    }

    //En cuanto abro el edit pide los datos a g para que se muestren en el form
    useEffect(() => {
        getUsuario();
    }, [])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = async event => {
        event.preventDefault()

        await editProyect(values)
        toast.success('Proyecto guardado');
        toggle();
        getProyectos();
    }

    //--------------------------------------------------------------------------------------------------------------------------------
    return (
        isAuthenticated() && (
            <>
                <Modal isOpen={open} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Editar proyecto</ModalHeader>
                    <ModalBody>
                        <form className="mb-3" onSubmit={clickSubmit}>
                            <div className="form-group">
                                <label className="text-muted font-weight-bolder">Respondable: </label>
                                {user.cargo == 0 && (
                                    <label className="text-muted ml-2"> {values.responsable} </label>
                                )}
                                {user.cargo == 1 && (
                                    <select onChange={handleChange('responsable')} type='text' className='form-control' value={responsable}>
                                        <option>Selecciona</option>
                                        {nombreUsuario && nombreUsuario.map((c, i) => (
                                            <option key={i} value={c.nombre}>
                                                {c.nombre}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="text-muted font-weight-bolder">CC: </label>
                                {user.cargo == 0 && (
                                    <label className="text-muted ml-2"> {values.cc} </label>
                                )}
                                {user.cargo == 1 && (
                                    <input onChange={handleChange('cc')} type='text' className="form-control" value={cc}></input>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="text-muted font-weight-bolder">Cliente: </label>
                                {user.cargo == 0 && (
                                    <label className="text-muted ml-2"> {values.cliente} </label>
                                )}
                                {user.cargo == 1 && (
                                    <input onChange={handleChange('cliente')} type='text' className="form-control" value={cliente}></input>
                                )}
                            </div>
                            <div className="form-group">
                                <label className="text-muted font-weight-bolder">Observaciones: </label>
                                <textarea onChange={handleChange('observaciones')} type='text' className="form-control" value={observaciones} rows={3}></textarea>
                            </div>
                            <div className="form-group">
                                <label className="text-muted">Estado del proyecto: </label>
                                <select onChange={handleChange('estado')} type="number" className="form-control" value={estado}>
                                    <option>Seleccionar</option>
                                    {Estado.map(estado => <option key={estado.number} value={estado.number}>{estado.estado}</option>)}
                                </select>
                            </div>
                            <Button>Guardar</Button>
                        </form>
                    </ModalBody>
                </Modal>
            </>
        )
    )
}

export default EditProyect;