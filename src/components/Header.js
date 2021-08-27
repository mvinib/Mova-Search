import React from 'react';
import './Header.css'
import { IoIosReturnLeft } from "react-icons/io";
import {Link}  from 'react-router-dom'


export default () => { //componente header
    return (
        <header>
            <div className="logo">
                <Link to='/'>
                    <img src='logo--mova-s.png' alt='logo' />
                </Link>
            </div>
            <div className="button-return">
                <Link to='/'>
                    <button type='button' >
                        <div className="icon-button"><IoIosReturnLeft color='#6D2080' size={30} /></div>
                        <div id='icon-text' className="icon-text"><p>Voltar</p></div>

                    </button>
                </Link>
            </div>
        </header>
    )
}