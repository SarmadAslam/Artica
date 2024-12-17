import React from "react";

//Import Image
import lightLogo from "../../../assets/images/logo-light.png";
import darkLogo from "../../../assets/images/logo-dark.png";

import resetPasswordImage from "../../../assets/images/auth/reset-password.png";
import { Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

const ResetPassword = () => {
  document.title =
    "Reset Password | ArtSphere - Freelancing for Artists | Empowering Creativity";
  return (
    <React.Fragment>
      <div>
        <div className="main-content">
          <div className="page-content">
            <section className="bg-auth">
              <Container>
                <Row className="justify-content-center">
                  <Col xl={10} lg={12}>
                    <Card className="auth-box">
                      <Row className="g-0">
                        <Col lg={6} className="text-center">
                          <CardBody className="p-4">
                            <Link to="/">
                              <img
                                src={lightLogo}
                                alt="ArtSphere Logo"
                                className="logo-light"
                              />
                              <img
                                src={darkLogo}
                                alt="ArtSphere Logo"
                                className="logo-dark"
                              />
                            </Link>
                            <div className="mt-5">
                              <img
                                src={resetPasswordImage}
                                alt="Reset Password Illustration"
                                className="img-fluid"
                              />
                            </div>
                          </CardBody>
                        </Col>
                        <Col lg={6}>
                          <CardBody className="auth-content p-5 h-100 text-white">
                            <div className="text-center mb-4">
                              <h5>Reset Password</h5>
                              <p className="text-white-50">
                                Recover your account to reconnect with the ArtSphere community.
                              </p>
                            </div>
                            <Form className="auth-form text-white">
                              <div
                                className="alert alert-warning text-center mb-4"
                                role="alert"
                              >
                                Enter your email, and we will send you instructions to reset your password!
                              </div>
                              <div className="mb-4">
                                <label className="form-label" htmlFor="email">
                                  Username/Email
                                </label>
                                <Input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter your username or email"
                                />
                              </div>
                              <div className="mt-3">
                                <button
                                  type="submit"
                                  className="btn btn-white w-100"
                                >
                                  Send Reset Instructions
                                </button>
                              </div>
                            </Form>
                            <div className="mt-5 text-center text-white-50">
                              <p>
                                Remembered your details?{" "}
                                <Link
                                  to="/signin"
                                  className="fw-medium text-white text-decoration-underline"
                                >
                                  Log In Here
                                </Link>
                              </p>
                            </div>
                          </CardBody>
                        </Col>
                      </Row>
                    </Card>
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

export default ResetPassword;
