import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <ul>
                <li>
                        <Link to='/login'>
                            Login
                        </Link>
                </li>
                <li>
                        <Link to='/registro'>
                            Registro
                        </Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;
