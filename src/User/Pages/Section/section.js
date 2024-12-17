import React from "react";
import { Col, Container, Row, Form } from "reactstrap";
// import {Link} from "react-router-dom";
import processImage2 from "../../../assets/images/process-02.png";
import CountryOptions from "./CountryOptions";
import JobSearch from "./JobSearch";

const HomeSection = () => {
  return (
    <React.Fragment>
      <div className="bg-home2" id="home">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className="mb-4 pb-3 me-lg-5">
                <h6 className="sub-title">Explore Thousands of Art Freelance Jobs</h6>
                <h1 className="display-5 fw-semibold mb-3">
                  Unlock Your Artistic Career with{" "}
                  <span className="text-primary fw-bold">Artica</span>
                </h1>
                <p className="lead text-muted mb-0">
                  Connect with clients globally, showcase your traditional art, and discover the perfect freelance opportunities. Artica helps you take your creativity to the next level.
                </p>
              </div>
              <Form action="#">
                <div className="registration-form">
                  <Row className="g-0">
                    <Col md={4}>
                      <div className="filter-search-form filter-border mt-1 mt-md-0 ">
                        <i className="uil uil-palette"></i>
                        <JobSearch />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="filter-search-form mt-3 mt-md-0">
                        <i className="uil uil-map-marker"></i>
                        <CountryOptions />
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="mt-3 mt-md-0 h-100">
                        <button className="btn btn-primary submit-btn w-100 h-100" type="submit">
                          <i className="uil uil-search me-1"></i> Find Art Jobs
                        </button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Col>
            <Col lg={5}>
              <div className="mt-5 mt-md-0">
                <img src={processImage2} alt="Artica Showcase" className="home-img" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export { HomeSection };
