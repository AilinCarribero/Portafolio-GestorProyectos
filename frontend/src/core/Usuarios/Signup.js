import React, { useState } from 'react';
import { isAuthenticated , signup } from '../apiCore';
import { toast } from 'react-toastify';
import { Cargo } from '../Estados';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const Signup = ({getUsuarios}) => {

    const [values, setValues] = useState({
        nombre: '',
        password: '',
        cargo: '',
        error: '',
        success: false
    })

    const { nombre, password, error, success, cargo } = values;
    const {user , token} = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ nombre, password, cargo , token}).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    nombre: '',
                    password: '',
                    error: '',
                    cargo: '',
                    success: true
                })
                toast.success('Usuario creado');
                setModal(!modal);
                getUsuarios();
            }
        })
    }

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //---------------------------------------------------------------------------------------------------------------------------
    const signUpForm = () => (
        <div>
            <Button color="dark" onClick={toggle}>Nuevo usuario</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalBody>
                    <form className="mb-3" onSubmit={clickSubmit}>
                        <div className="form-group">
                            <label className="text-muted">Nombre y Apellido: </label>
                            <input onChange={handleChange('nombre')} type='text' className="form-control" value={nombre} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Contraseña: </label>
                            <input onChange={handleChange('password')} type='password' className="form-control" value={password} />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">Cargo: </label>
                            <select onChange={handleChange('cargo')} type="number" className="form-control">
                                <option>Seleccionar</option>
                                {Cargo.map(cargo => <option key={cargo.number} value={cargo.number}>{cargo.cargo}</option>)}
                            </select>
                        </div>
                        <Button onClick={clickSubmit} className='btn btn-primary'> Agregar al usuario </Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </Modal>
        </div>
    );

    //-----------------------------------------------------------------------------------------------------------------------------
    return (<>
        {signUpForm()}
    </>)
}

export default Signup;