import React from "react";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import TopBar from "../../../Components/TopBar";
import NavBar from "../../../Components/NavBar";

const Section = () => {
  return (
    <React.Fragment>
      <TopBar />
      <NavBar />
                <div className="page-next">
                  <nav
                    className="d-inline-block"
                    aria-label="breadcrumb text-center"
                  >
                    <ol className="breadcrumb justify-content-center pb-5">
                      <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="#">Blog</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {" "}
                        Blog Details{" "}
                      </li>
                    </ol>
                  </nav>
                </div>
  
    </React.Fragment>



  );
};

export default Section;
