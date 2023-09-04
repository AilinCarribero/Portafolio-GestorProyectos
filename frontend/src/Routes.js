import React from 'react';
import { BrowserRouter , Switch , Route } from 'react-router-dom';
import Home from './core/Home';
import Signin from './core/Usuarios/Signin';
import Signup from './core/Usuarios/Signup';
import AddProyect from './core/Proyectos/AddProyect';
import AddTarea from './core/Tareas/AddTarea';
import EditProyect from './core/Proyectos/EditProyect';
import CardTareas from './core/Tareas/CardTareas';
import EditTarea from './core/Tareas/EditarTarea';
import Usuarios from './core/Usuarios/Usuarios';

import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';


const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/addproyect" exact component={AddProyect} />
                <Route path="/addtarea/:id" exact component={AddTarea} />
                <Route path="/edit/:id" exact component={EditProyect} />
                <Route path="/tareas/:id" exact component={CardTareas} />
                <Route path="/edittareas/:id" exact component={EditTarea} />
                <Route path="/usuarios" exact component={Usuarios} />
            </Switch>
            <ToastContainer />
        </BrowserRouter>
    )
}

export default Routes;