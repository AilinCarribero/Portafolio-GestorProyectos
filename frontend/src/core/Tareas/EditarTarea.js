import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isAuthenticated, getTarea, editTarea, getUser } from '../apiCore';
import { toast } from 'react-toastify';
import { Estado } from '../Estados';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';

const EditTarea = ({ getTareas, tarea, toggle, open }) => {
    const [values, setValues] = useState({
        _id: tarea._id,
        item: tarea.item,
        estado: Number(tarea.estado),
        nombre: tarea.nombre,
        observacion: tarea.observacion,
        desde: tarea.desde,
        realizado: tarea.realizado,
        responsable: tarea.responsable,
        cc: tarea.cc,
        proyectos: tarea.proyecto
    });

    const [usuario, setUsuario] = useState({
        nombreUsuario: []
    });

    const params = useParams();
    const { item, nombre, observacion, desde, realizado, responsable, cc } = values;
    const { nombreUsuario } = usuario;
    const { token } = isAuthenticated();

    //Pido a /apiCore los datos y los guardo en sus variables correspondientes para que se muestren en el form
    const getUsuario = () => {
        getUser(token).then(data => {
            if (data.error) {
                setUsuario({ error: data.error })
            } else {
                setUsuario({ nombreUsuario: data })
            }
        })
    }

    //En cuanto abro el edit pide los datos a getTarea para que se muestren en el form
    useEffect(() => {
        getUsuario();
    }, [])

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = async event => {
        event.preventDefault();

        await editTarea(values, token)
        toast.success('Tarea guardada');
        toggle();
        getTareas(params.id);
    }

    //--------------------------------------------------------------------------------------------------------------------------------
    return (
        <div>
            <Modal isOpen={open} toggle={toggle} >
                <ModalHeader toggle={toggle}>Editar proyecto</ModalHeader>
                <ModalBody>
                    <form className="mb-3" onSubmit={clickSubmit}>
                        <div className="form-group">
                            <h5><label className="text-muted">Item:{item} </label></h5>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Nombre de la tarea: </label>
                            <input onChange={handleChange('nombre')} type='text' className="form-control" value={nombre}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Desde:
                                <Input onChange={handleChange('desde')} type="date" name="date" id="exampleDate" value={desde} />
                            </label>
                            <label className="text-muted">Finalización:
                                <Input onChange={handleChange('realizado')} type="date" name="date" id="exampleDate" value={realizado} />
                            </label>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Responsable:</label>
                            <select onChange={handleChange('responsable')} type='text' className='form-control' value={responsable} >
                                <option>Selecciona</option>
                                {nombreUsuario && nombreUsuario.map((c, i) => (
                                    <option key={i} value={c.nombre}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">CC:</label>
                            <input onChange={handleChange('cc')} type='text' className="form-control" value={cc}></input>
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Observacion: </label>
                            <textarea onChange={handleChange('observacion')} type='text' className="form-control" value={observacion} rows={3} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Estado de la tarea: </label>
                            <select onChange={handleChange('estado')} className="form-control" value={values.estado}>
                                <option>Seleccionar</option>
                                {Estado.map(estado =>
                                    <option key={estado.number} value={estado.number}>{estado.estado}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <Button>Guardar cambios</Button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EditTarea;