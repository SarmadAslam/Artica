import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import TopBar from "../../Components/TopBar";
import NavBar from "../../Components/NavBar";

const Section = () => {
  return (
    <React.Fragment>
      <TopBar />
      <NavBar />
      <nav className="breadcrumb-container" aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-center">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#" className="breadcrumb-link">Find Work</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Jobs
          </li>
        </ol>
      </nav>
    </React.Fragment>
  );
};

export default Section;
