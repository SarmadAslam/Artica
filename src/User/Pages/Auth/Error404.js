import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

//import Images
import Error404Image from "../../../assets/images/404.png";

const Error404 = () => {
  document.title = "Error 404 | Artica - Freelancing for Artists";
  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <section className="bg-error bg-auth text-dark">
              <Container>
                <Row className="justify-content-center">
                  <Col lg={6}>
                    <div className="text-center">
                      <img src={Error404Image} alt="404 Error" className="img-fluid" />
                      <div className="mt-5">
                        <h4 className="text-uppercase mt-3">
                          Oops! We can't find that page.
                        </h4>
                        <p className="text-muted">
                          The page you’re looking for might have been removed or is temporarily unavailable.
                        </p>
                        <div className="mt-4">
                          <Link
                            className="btn btn-primary waves-effect waves-light"
                            to="/"
                          >
                            <i className="mdi mdi-home"></i> Back to Home
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error404;
