import React, { useEffect, useState } from 'react';
import Navigation from './Components/Navbar';
import CardProyect from './Proyectos/CardProyect';

import './Home.css'
import { isAuthenticated, getProyectos } from './apiCore'
import AddProyect from './Proyectos/AddProyect';
import Signin from './Usuarios/Signin';

const Home = () => {
    const [proyectos, setProyectos] = useState([]);
    const [error, setError] = useState(false);

    const loadProyectos = () => {
        getProyectos().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProyectos(data);
                //console.log(data);
            }
        })
    }

    useEffect(() => {
        loadProyectos();
    }, [])
    //-------------------------------------------------------------------------------------------------------------------------------
    return (
        <div>
            <Navigation />
            <div className="container mt-2">
                {isAuthenticated() && (<>
                    <div className="row">
                        <AddProyect loadProyectos={loadProyectos} />
                    </div>
                    <div className="row">
                        <CardProyect loadProyectos={loadProyectos} proyectos={proyectos}/>
                    </div>
                </>)}
            </div>
            {!isAuthenticated() && (<>
                <div className="d-flex align-items-center flex-column alerta">
                    <div className="container  ">
                        <div className="row d-flex align-content-end flex-wrap justify-content-center">
                            <h3 className="texto"> Requiere ingresar a una cuenta registrada </h3>
                        </div>
                        <div className="row d-flex align-content-end flex-wrap justify-content-center">
                            <Signin />
                        </div>
                    </div>
                </div>
            </>)}
        </div>
    )
}

export default Home;