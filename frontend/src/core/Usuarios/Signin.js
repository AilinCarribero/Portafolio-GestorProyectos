import React, { useState } from 'react';
import { signin , authenticate , isAuthenticated } from '../apiCore';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import "../Home.css";
import { Redirect } from 'react-router-dom';

const Signin = () => {

    const [values , setValues] = useState({
        nombre: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });

    const { nombre , password , loading , error , redirectToReferrer} = values;
    const { user } = isAuthenticated();

    //cambio de estado
    const handleChange = name => event => {
        setValues({...values , error: false , [name]: event.target.value})
    }

    //Envia la informacion
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({...values , error: false , loading: true})
        signin({nombre , password})
            .then(data => {
                if(data.error) {
                    setValues({...values , error: data.error , loading:false })
                } else {
                    authenticate(data, () => { setValues({...values , redirectToReferrer: true})})
                }
            })
    }

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //-------------------------------------------------------------------------------------------------------------------------------
    const signInForm = () => (
        <div>
            <Button className="ingresar"  onClick={toggle}>Ingresar</Button>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Ingresa a tu cuenta</ModalHeader>
                <ModalBody>
        <form>
            <div className="form-group">
                <label className="text-muted">Nombre y Apellido</label>
                <input onChange={handleChange('nombre')} type='text' className="form-control" value={nombre} />
            </div>
            <div className="form-group">
                <label className="text-muted">Contraseña</label>
                <input onChange={handleChange('password')} type='password' className="form-control" value={password} />
            </div>
            <button onClick={clickSubmit} className='btn btn-dark d-flex align-content-end flex-wrap justify-content-center'>
                Ingresar
            </button>
        </form>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
    </Modal>
    </div>
    );

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.cargo === 1) {
                return <Redirect to="/" />
            } else {
                return <Redirect to="/" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    //-------------------------------------------------------------------------------------------------------------------------------
    return (<>
        <div className="mt-5">
            {signInForm()}
            {redirectUser()}
        </div>

    </>)
}

export default Signin;