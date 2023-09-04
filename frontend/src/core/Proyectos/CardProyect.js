import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../Card.css';
import { toast } from 'react-toastify';
import { Card, Button, CardTitle, CardText, Row, Col, CardFooter, CardBody, CardHeader } from 'reactstrap';

import { isAuthenticated, getProyectsId, editProyect, getProyectos } from '../apiCore';
import EditProyect from './EditProyect';

const CardProyect = ({ loadProyectos, proyectos }) => {

    const [estados, setEstados] = useState([]);
    const [selectProyecto, setSelectProyecto] = useState();

    const { token } = isAuthenticated();

    const history = useHistory();

    //Modal
    const [modal, setModal] = useState(false);
    const toggle = (proyecto) => {
        setSelectProyecto(proyecto)
        setModal(!modal)
    };

    const getEstado = async id => {
        await getProyectsId(id).then(data => {
            setEstados(data)
            data.estado = data.estado + 1;
            editProyect(data);
            loadProyectos();
            toast.success('Estado Cambiado');
        })
    }


    //---------------------------------------------------------------------------------------------------------------------------
    return (<>
        {isAuthenticated() && proyectos && (<>
            {proyectos.map((proyecto, i) => (
                <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                    <Row className="mt-3 mb-3">
                        <Col sm="12">
                            <Card outline color="secondary">
                                <CardHeader>
                                    {(proyecto.estado == 0) && (<Button color="info" onClick={() => getEstado(`${proyecto._id}`)} size="sm" block>Pendiente</Button>)}
                                    {(proyecto.estado == 1) && (<Button color="warning" onClick={() => getEstado(`${proyecto._id}`)} size="sm" block>En Proceso</Button>)}
                                    {(proyecto.estado == 2) && (<Button color="danger" size="sm" block>Finalizado</Button>)}
                                </CardHeader>
                                <CardBody>
                                    <CardTitle tag="h5">Cliente: {proyecto.cliente}</CardTitle>
                                    <CardText>CC: {proyecto.cc}</CardText>
                                    <CardText>Respondable: {proyecto.responsable}</CardText>
                                    <CardText>Observaciones: {proyecto.observaciones}</CardText>
                                </CardBody>
                                <CardFooter className="d-flex bd-highlight">
                                    <Button color="dark" onClick={() => toggle(proyecto._id)}>Editar</Button>
                                    {modal && proyecto._id == selectProyecto &&
                                        <EditProyect className="bd-highlight" proyecto={proyecto} open={modal} toggle={toggle} getProyectos={loadProyectos} />
                                    }
                                    <Button className="ml-auto bd-highlight" onClick={() => history.push(`/tareas/${proyecto._id}`)}>Tareas</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            ))}
        </>)}
    </>)
}

export default CardProyect;