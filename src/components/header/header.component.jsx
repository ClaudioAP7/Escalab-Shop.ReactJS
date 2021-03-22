import React from 'react';
import { Link, Switch } from 'react-router-dom';

import { auth } from '../../firebase/firebase.util';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

//Cuando solo se quiere mostrar info, 
//despues de la funcion se abre parentesis, si no, 
//se abren llaves para aplicar logica con los props que recibe
const Header = ({ currentUser }) => (
    <div className="header">
        <Link className="logo-container" to='/'>
            <Logo class='logo'/>
        </Link>

        <div className="options">
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/shop'>CONTACT</Link>
            {
                currentUser ? 
                    ( <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>) : 
                    ( <Link className='option' to='/signin'>SIGN IN</Link> )
            }
        </div>
    </div>
);

export default Header;