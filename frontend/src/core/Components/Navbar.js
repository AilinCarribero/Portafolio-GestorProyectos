import React, { useReducer, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Navbar.css';
import UM from './Ultima-Milla.png'

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Media } from 'reactstrap';

import { isAuthenticated, signout } from '../apiCore';

const Navigation = ({ history }) => {

    const [sidebar, setSidebar] = useState(false);
    const {user} = isAuthenticated();

    const showSidebar = () => setSidebar(!sidebar);

    //--------------------------------------------------------------------------------------------------------------------------------
    return (<>

        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
                <div className="navbar-nav " >
                    <Link to='#' className='menu-brans'>
                        <FaIcons.FaBars onClick={showSidebar} className="icon"/>
                    </Link>
                </div>
                <div className='navbar-nav'>
                    <Link to='/' className='navbar-brand ml-4'>
                        <img src={UM}  width="132" height="32"/>
                    </Link>
                </div>
            </div>


            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' >
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {!isAuthenticated() && (<>
                        <li className="nav-text">
                            <Link to="/signup" className='navbar-brans'>
                                <h6 className=" nav-text font-weight-bolder text-white">Registrarse</h6>
                            </Link>
                        </li>
                    </>)}
                    {isAuthenticated() && (<>
                        {user.cargo == 1 && (
                        <li className="nav-text">
                            <Link to="/usuarios" className='navbar-brand'>
                                <h6 className=" nav-text font-weight-bolder text-white">Usuarios</h6>
                            </Link>
                        </li>
                        )}
                        <li className="nav-text">
                            <Link to="/" className='navbar-brand' onClick={() => signout(() => { history.push("/"); })}>
                                <h6 className=" nav-text font-weight-bolder text-white">Cerrar sesión</h6>
                            </Link>
                        </li>
                    </>)}
                </ul>
            </nav>
        </IconContext.Provider>
    </>)
}

export default withRouter(Navigation);