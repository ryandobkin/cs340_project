import * as React from 'react';
import { Link } from 'react-router-dom';

export function Header() {

    return(
        <header Class="nav-header">
            <div Class="nav-div">
                <nav Class="nav-container">
                    <Link Class="nav-item" to="/">bsg_planets</Link>
                    <Link Class="nav-item" to="/">bsg_cert</Link>
                    <Link Class="nav-item" to="/">bsg_people</Link>
                    <Link Class="nav-item" to="/">bsg_cert_people</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;