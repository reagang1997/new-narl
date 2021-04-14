import React from 'react';
import './style.css';

function Header({ teamName, drivers }) {

    return (
        <div>
            <h1 className='header f1'>{teamName}</h1>
            
        </div>
    )
}

export default Header;