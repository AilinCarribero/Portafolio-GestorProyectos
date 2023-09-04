import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Button, Table } from 'reactstrap';
import { toast } from 'react-toastify';

import Navigation from '../Components/Navbar'
import { isAuthenticated, getUser, deleteUser } from '../apiCore';
import Signup from './Signup';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { user , token} = isAuthenticated();

    const getUsuarios = async () => {
        await getUser(token).then(data => {
            //console.log("Datos recibidos en getUsuarios", data);
            if (data.error) {
                console.log(data.error)
            } else {
                setUsuarios(data);
                //console.log('usuarios: ', usuarios)
            }
        })
    }

    const eliminarUsuario = async (id) => {
        await deleteUser(id , token).then(data => {
            //console.log("Dato recibido desde deleteUser: " , data);
            if(data.error) {
                console.log(data.error)
            } else {
                toast.success(data);
            }
        })
        getUsuarios();
    }

    //En cuanto abro usuarios pide los datos a getUser para mostrarlos
    useEffect(() => {
        getUsuarios();
    }, [])

    //------------------------------------------------------------------------------------------------------------------------------
    const userTable = () => (<>
        {isAuthenticated() && user.cargo == 1 && (<>
            <div className="m-2" >
                <Signup getUsuarios={getUsuarios} />
            </div>
            <div className="m-3">
                <Table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nombre y Apellido</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Fecha y hora del alta</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {isAuthenticated() && (
                            usuarios.map((usuarios, i) => (
                                <tr key={i}>
                                    <td>{usuarios.nombre}</td>
                                    <td>
                                        {(usuarios.cargo == 0) && ('Empleado')}
                                        {(usuarios.cargo == 1) && ('Administrador') }
                                    </td>
                                    <td>{moment(usuarios.createdAt).format(' MM-DD-YYYY, h:mm:ss a')}</td>
                                    <td>
                                        <Button size="sm" onClick={() => eliminarUsuario(usuarios._id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>
            </div>
        </>)}
    </>)

    //---------------------------------------------------------------------------------------------------------------------------------
    return (<>
        <Navigation />
        <div>
            {userTable()}
        </div>
    </>)
}

export default Usuarios;