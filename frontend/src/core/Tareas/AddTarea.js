import React, { useEffect, useState, forceUpdate } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getTareaId, isAuthenticated, createTarea, getProyectsId, getUser } from '../apiCore';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
const AddTarea = ({getTareas}) => {
    const [num, setNum] = useState({
        numItem: ''
    })

    const [values, setValues] = useState({
        item: '',
        nombre: '',
        observacion: '',
        desde: '',
        realizado: '',
        responsable: '',
        cc: '',
        proyecto: ''
    })

    const [usuario, setUsuario] = useState({
        nombreUsuario: []
    });

    const params = useParams();
    const { user, token } = isAuthenticated();
    const { item, nombre, observacion, desde, realizado, responsable, cc, proyecto } = values;
    const { nombreUsuario } = usuario;
    const { numItem } = num;

    const init = async param => {
        await getProyectsId(param).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, proyecto: data })
            }
        })
        getTareaId(param).then(data => {
            if (data.error) {
                setValues({ error: data.error })
            } else {
                setNum({ numItem: data.length + 1 })
            }
        })
        getUser().then(data => {
            if (data.error) {
                setUsuario({ error: data.error })
            } else {
                setUsuario({ nombreUsuario: data })
            }
        })
    }

    useEffect(() => {
        setValues({ ...values });
        if (params) {
            const param = params.id;
            init(param);
        }
    }, []);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, item: numItem, proyecto: proyecto, error: '' })
        values.item = numItem
        createTarea(user._id, token, values).then(data => {
            //console.log('datos del clicSubmit, data: ' , data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    proyecto: proyecto
                })
                toast.success('Tarea guardada');
                setModal(!modal);
                getTareas(params.id)
            }
        })
    }

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //---------------------------------------------------------------------------------------------------------------------------------
    const newTareaForm = () => (
        <div>
            <div className="row mt-3 ml-3">
                <h4>{proyecto.cliente} - {proyecto.cc}</h4>
                <Button className="ml-3" color="dark" onClick={toggle}>Nueva Tarea</Button>
            </div>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Agregar nueva tarea</ModalHeader>
                <ModalBody>
                    <form className="mb-3" onSubmit={clickSubmit}>
                        <div>
                            <h4>{proyecto.cliente} - {proyecto.cc}</h4>
                        </div>
                        <div className="form-group">
                            <h5><label className="text-muted">Item:{numItem} </label></h5>
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
                            <select onChange={handleChange('responsable')} type='text' className='form-control'>
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
                            <textarea onChange={handleChange('observacion')} type='text' className="form-control" value={observacion} rows={3}></textarea>
                        </div>
                        <div>
                            <Button>Registrar Tarea</Button>
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    );

    //--------------------------------------------------------------------------------------------------------------------------------
    return (<>
        {newTareaForm()}
    </>)
}

export default AddTarea;