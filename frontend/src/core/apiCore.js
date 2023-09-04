import { API } from '../config';

const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('jwt')).token}`,
    "Content-Type": "application/json",
}

//Ingreso
export const signin = user => {
    return fetch(`${API}/auth/signin` , {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {console.log(err)});
};

//Registrarse
export const signup = (user) => {
    return fetch(`${API}/auth/signup` , {
        method: "POST" , 
        headers,
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {console.log(err)});
}

//cerrar sesion
export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/auth/signout` , {
            method: 'POST',
            headers
        })
            .then(response => {
                console.log('signout' , response);
            })
                .catch(err => console.log(err));
    }
} 

export const deleteUser = (id) => {
    console.log('recibido en deleteUser: ' ,id)
    return fetch(`${API}/auth/${id}` ,
        {
            method: 'DELETE',
            headers
        }
    )
        .then(response => {
            //console.log('datos obtenidos' , response)
            return response.json()
        })
        .catch(err => console.log(err));
}

//listar usuarios
export const getUser = () => {
    return fetch(`${API}/auth/list` ,
        {
            method: 'GET',
            headers  
        }
    )
        .then(response => {
            //console.log('getUser, apiCore' , response)
            return response.json()
        })
        .catch(err => console.log(err));
}

//autentifica a un usuario y guarda la sesion
export const authenticate = (data , next) => {
    if( typeof window !== 'undefined') {
        localStorage.setItem('jwt' , JSON.stringify(data))
        //console.log('jwt: ' , localStorage);
        next();
    }
}

//consulta si es usuario existe y existe su sesion
export const isAuthenticated = () => {
    if(typeof window == 'undefined') {
        return false;
    }
    if(localStorage.getItem('jwt')) {
        //console.log('jwt is : ' , localStorage);
        return JSON.parse(localStorage.getItem('jwt'));
        //return localStorage.getItem('jtw')
    } else {
        return false;
    }
}

//Creacion de proyecto nuevo
export const createProyect = ( userId , token , proyecto) => {
    return fetch(`${API}/proyecto/create/${userId}` , {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: proyecto
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {console.log(err)});
}

//Mostrar proyectos
export const getProyectos = () => {
    return fetch(`${API}/proyecto/list` ,
        {
            method: 'GET',
            headers
        }
    )
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err));
};

//Busqueda por id
export const getProyectsId = (id) => {
    //console.log('recibido en getProyectId: ' ,id)
    return fetch(`${API}/proyecto/listone/${id}` ,
        {
            method: 'GET',
            headers
        }
    )
        .then(response => {
            //console.log('datos obtenidos' , response)
            return response.json()
        })
        .catch(err => console.log(err));

}

//Edicion de proyecto
export const editProyect = ( proyecto ) => {
    //console.log('recibo en editProyect:' , proyecto)
    return fetch(`${API}/proyecto/editar/${proyecto._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(proyecto)
    })
        .then(response => {
            //console.log('respuesta del editProyect: ' , response)
            return response.json();
        })
        .catch(err => {console.log(err)});

}

//Creacion de tarea nueva
export const createTarea = ( userId , token , tarea ) => {
    //console.log('desde apiCore, creartareas, tarea: ' , tarea)
    return fetch(`${API}/tarea/create/${userId}` , {
        method: 'POST',
        headers,
        body: JSON.stringify(tarea)
    })
        .then(response => {
            //console.log('desde apiCore, creartareas, response: ' , response)
            return response.json()
        })
        .catch(err => {console.log(err)});
};

//Busco las tareas por id de proyecto
export const getTareaId = (id) => {
    return fetch(`${API}/tarea/list/${id}` ,
        {
            method: 'GET',
            headers
        }
    )
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

//Busca los datos por id de tarea
export const getTarea = (id) => {
    //console.log('recibido en getTarea de apiCore: ' , id)
    return fetch(`${API}/tarea/listone/${id}` ,
        {
            method: 'GET',
            headers
        }
    )
        .then(response => {
            //console.log('datos obtenidos en getTarea de apiCore: ' , response)
            return response.json()
        })
        .catch(err => console.log(err));
}

//Edicion de tarea
export const editTarea = (tarea) => {
    //console.log('recibo en editProyect:' , tarea)
    return fetch(`${API}/tarea/editar/${tarea._id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(tarea)
    })
        .then(response => {
            //console.log('respuesta del editProyect: ' , response)
            return response.json();
        })
        .catch(err => {console.log(err)});
}