import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navigation from '../Components/Navbar';
import { toast } from 'react-toastify';
import { Card, Button, CardTitle, CardText, Row, Col, CardFooter, CardBody, CardHeader } from 'reactstrap';
import '../Card.css';

import { isAuthenticated, getTareaId, editTarea, getTarea } from '../apiCore';
import AddTarea from './AddTarea';
import EditTarea from './EditarTarea';

const CardTareas = () => {
    const [estados, setEstados] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [selectTarea, setSelectTarea] = useState();

    const history = useHistory();
    const params = useParams();
    const { token } = isAuthenticated();

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = (tarea_id) => { 
        setModal(!modal);
        setSelectTarea(tarea_id);
    };

    const getEstado = async id => {
        await getTarea(id , token).then(data => {
            setEstados(data)
            data.estado = data.estado + 1;
            editTarea(data , token).then(tare => {
                mostrarTarea(params.id);
                toast.success('Estado Cambiado');
            })
        })

        mostrarTarea(params.id)
    }

    const mostrarTarea = async param => {
        await getTareaId(param , token).then(data => {
            setTareas(data);
        })
    }

    //En cuanto abro las tareas pide los datos a getTarea para que se muestren en los card
    useEffect(() => {
        if (params) {
            const param = params.id;
            mostrarTarea(param);
        }
    }, []);

    //-----------------------------------------------------------------------------------------------------------------------------
    const cardTarea = () => (<>
        <div className="container">
            {isAuthenticated() && (
                <div className="row">
                    <AddTarea getTareas={mostrarTarea} />
                </div>)}
            <div className="row">
                {isAuthenticated() && tareas.length > 0 && (
                    tareas.map((tarea, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                            <Row className="mt-3 mb-3">
                                <Col sm="12">
                                    <Card outline color="secondary">
                                        <CardHeader>
                                            {(tarea.estado == 0) && (<Button color="info" onClick={() => getEstado(`${tarea._id}`)} size="sm" block>Pendiente</Button>)}
                                            {(tarea.estado == 1) && (<Button color="warning" onClick={() => getEstado(`${tarea._id}`)} size="sm" block>En Proceso</Button>)}
                                            {(tarea.estado == 2) && (<Button color="danger" size="sm" block>Finalizado</Button>)}
                                        </CardHeader>
                                        <CardBody>
                                            <CardTitle tag="h5">{tarea.item}  - Tarea: {tarea.nombre}</CardTitle>
                                            <CardText>CC: {tarea.cc}</CardText>
                                            <CardText>Respondable: {tarea.responsable}</CardText>
                                            <CardText>Inicio: {tarea.desde}    Finalizacion: {tarea.realizado}</CardText>
                                            <CardText>Observaciones: {tarea.observacion}</CardText>
                                        </CardBody>
                                        <CardFooter>
                                            <Button color="dark" onClick={() => toggle(tarea._id)}>Editar</Button>
                                            {modal && tarea._id == selectTarea && <EditTarea tarea={tarea} getTareas={mostrarTarea} toggle={toggle} open={modal}/>}
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    ))
                )}
            </div>
        </div>
    </>)

    //--------------------------------------------------------------------------------------------------------------------------------
    return (<>
        <Navigation />
        <div>
            {cardTarea()}
        </div>
    </>)
}

export default CardTareas;