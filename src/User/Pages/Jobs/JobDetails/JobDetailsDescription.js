import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

//Import Images
import JobDetailImage from "../../../../assets/images/job-detail.jpg";
import JobImage10 from "../../../../assets/images/featured-job/img-10.png";
import { Link } from "react-router-dom";

const JobDetailsDescription = () => {
  return (
    <React.Fragment>
      <Card className="job-detail overflow-hidden">
        <div>
          <img src={JobDetailImage} alt="" className="img-fluid" />
          <div className="job-details-compnay-profile">
            <img
              src={JobImage10}
              alt=""
              className="img-fluid rounded-3 rounded-3"
            />
          </div>
        </div>
        <CardBody className="p-4">
          <div>
            <Row>
              <Col md={8}>
                <h5 className="mb-1">Art Project Coordinator</h5>
                <ul className="list-inline text-muted mb-0">
                  <li className="list-inline-item">
                    <i className="mdi mdi-account"></i> 5 Openings
                  </li>
                  <li className="list-inline-item text-warning review-rating">
                    <span className="badge bg-warning">4.7</span>{" "}
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star align-middle"></i>
                    <i className="mdi mdi-star-half-full align-middle"></i>
                  </li>
                </ul>
              </Col>
              <Col lg={4}>
                <ul className="list-inline mb-0 text-lg-end mt-3 mt-lg-0">
                  <li className="list-inline-item">
                    <div className="favorite-icon">
                      <Link to="#">
                        <i className="uil uil-heart-alt"></i>
                      </Link>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    <div className="favorite-icon">
                      <Link to="#">
                        <i className="uil uil-setting"></i>
                      </Link>
                    </div>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <Row className="g-2">
              <Col lg={3}>
                <div className="border rounded-start p-3">
                  <p className="text-muted mb-0 fs-13">Experience</p>
                  <p className="fw-medium fs-15 mb-0">Minimum 2 Years in Art Management</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Employee type</p>
                  <p className="fw-medium mb-0">Full-Time</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border p-3">
                  <p className="text-muted fs-13 mb-0">Position</p>
                  <p className="fw-medium mb-0">Coordinator</p>
                </div>
              </Col>
              <Col lg={3}>
                <div className="border rounded-end p-3">
                  <p className="text-muted fs-13 mb-0">Offer Salary</p>
                  <p className="fw-medium mb-0">$1800/ Month</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Job Description</h5>
            <div className="job-detail-desc">
              <p className="text-muted mb-0">
                As an Art Project Coordinator, you will play a crucial role in overseeing and managing various art projects for our platform. You will be collaborating with both traditional and digital artists, guiding them through project requirements, timelines, and ensuring the completion of each project to the highest standard. This is a great opportunity for those passionate about the arts and looking to combine creativity with project management.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Responsibilities</h5>
            <div className="job-detail-desc mt-2">
              <p className="text-muted">
                As an Art Project Coordinator, your key responsibilities will include:
              </p>
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> Liaise with artists to understand project requirements and ensure timely execution.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Coordinate communication between artists and clients for smooth project delivery.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Assist in organizing art exhibitions and online galleries.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Monitor project progress and adjust timelines or goals as needed.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Maintain high standards for creative output and client satisfaction.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Qualification</h5>
            <div className="job-detail-desc mt-2">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> Degree in Fine Arts, Art Management, or related fields.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Minimum 2 years of experience in project management within the art industry.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Strong organizational and communication skills.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Passion for the arts and understanding of both traditional and digital art forms.
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <h5 className="mb-3">Skills & Experience</h5>
            <div className="job-details-desc">
              <ul className="job-detail-list list-unstyled mb-0 text-muted">
                <li>
                  <i className="uil uil-circle"></i> Excellent project management and time management skills.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Familiarity with art portfolio management and exhibitions.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Experience in handling client relations and maintaining high satisfaction levels.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Proficiency in using project management tools and software.
                </li>
                <li>
                  <i className="uil uil-circle"></i> Knowledge of the digital art market and trends.
                </li>
              </ul>
              <div className="mt-4 d-flex flex-wrap align-items-start gap-1">
                <span className="badge bg-primary">Project Management</span>
                <span className="badge bg-primary">Art Portfolio</span>
                <span className="badge bg-primary">Exhibitions</span>
                <span className="badge bg-primary">Client Relations</span>
                <span className="badge bg-primary">Art Direction</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3">
            <ul className="list-inline mb-0">
              <li className="list-inline-item mt-1">Share this opportunity:</li>
              <li className="list-inline-item mt-1">
                <Link to="#" className="btn btn-primary btn-hover">
                  <i className="uil uil-facebook-f"></i> Facebook
                </Link>
              </li>
              <li className="list-inline-item mt-1">
                <Link to="#" className="btn btn-danger btn-hover">
                  <i className="uil uil-google"></i> Google+
                </Link>
              </li>
              <li className="list-inline-item mt-1">
                <Link to="#" className="btn btn-success btn-hover">
                  <i className="uil uil-linkedin-alt"></i> LinkedIn
                </Link>
              </li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default JobDetailsDescription;
