import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Navbar, Row } from "reactstrap";
import './Section.css'; // Import the CSS file
import TopBar from '../../Components/TopBar';
import NavBar from '../../Components/NavBar';

const Section = () => {
    return (
        <>
            <TopBar />
            <NavBar />
            <nav className="breadcrumb-container" aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                    <li className="breadcrumb-item">
                        <Link to="/" className="breadcrumb-link">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="#" className="breadcrumb-link">Blogs</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Blog
                    </li>
                </ol>
            </nav>
        </>
    );
};

export default Section;
