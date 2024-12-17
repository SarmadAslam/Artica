import React from "react";
import { Col, Row, Container } from "reactstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Jobcatogaries = () => {
  const categories = [
    {
      id: 1,
      icon: "mdi:palette",
      name: "Digital Art",
      job: 2024
    },
    {
      id: 2,
      icon: "mdi:brush",
      name: "Traditional Art",
      job: 1250
    },
    {
      id: 3,
      icon: "mdi:pen",
      name: "Art Commissions",
      job: 802
    },
    {
      id: 4,
      icon: "mdi:book-open-page-variant",
      name: "Art Teaching",
      job: 577
    },
    {
      id: 5,
      icon: "mdi:artstation",
      name: "Art Exhibitions",
      job: 285
    },
    {
      id: 6,
      icon: "mdi:trophy",
      name: "Art Competitions",
      job: 495
    },
    {
      id: 7,
      icon: "mdi:lightbulb-on",
      name: "Crafts & Design",
      job: 1045
    },
    {
      id: 8,
      icon: "mdi:comment-processing",
      name: "Art Consultations",
      job: 1516
    }
  ];  
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="section-title text-center">
                <h3 className="title">Explore Job Categories</h3>
                <p className="text-muted">
                  At Artica, we believe every artist deserves a stage. Explore diverse job categories tailored to help you connect, collaborate, and thrive in your artistic journey.
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            {(categories || []).map((item, key) => (
              <Col lg={3} md={6} className="pt-2 mt-4" key={key}>
                <div className="popu-category-box rounded text-center">
                  <div className="popu-category-icon icons-md">
                    <Icon icon={item.icon} className="text-primary" />
                  </div>
                  <div className="popu-category-content mt-4">
                    <Link to="#" className="text-dark stretched-link">
                      <h5 className="fs-18">{item.name}</h5>
                    </Link>
                    <p className="text-muted mb-0">{item.job} Exciting Opportunities</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          <Row>
            <Col lg={12}>
              <div className="mt-5 text-center">
                <Link
                  to="/jobscategories"
                  className="btn btn-primary btn-hover"
                >
                  Browse All Categories <i className="uil uil-arrow-right"></i>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Jobcatogaries;