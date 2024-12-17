import React, { useState } from "react";
import {
  Col,
  Row,
  Container,
  Nav,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import classnames from "classnames";

// Process Images Import
import processImage1 from "../../../assets/images/process-01.png";
import processImage2 from "../../../assets/images/process-02.png";
import processImage3 from "../../../assets/images/process-03.png";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("1");

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="section-title me-5">
                <h3 className="title">How It Works</h3>
                <p className="text-muted">
                  Welcome to Artica, where creativity meets opportunity! Here's how you can start showcasing your art, discovering exciting projects, and connecting with clients seamlessly.
                </p>
                <Nav className="process-menu flex-column nav-pills">
                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      tabChange("1");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">1</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Sign Up and Join the Community</h5>
                        <p className="text-muted mb-0">
                          Create an artist or client profile, and you're all set to dive into the vibrant world of Artica.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      tabChange("2");
                    }}
                    type="button"
                  >
                    <div className="d-flex">
                      <div className="number flex-shrink-0">2</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Find Jobs or Discover Talent</h5>
                        <p className="text-muted mb-0">
                          Whether you're searching for art projects or talented artists, Artica has something for everyone.
                        </p>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink
                    to="#"
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      tabChange("3");
                    }}
                    type="button"
                  >
                    <div className=" d-flex">
                      <div className="number flex-shrink-0">3</div>
                      <div className="flex-grow-1 text-start ms-3">
                        <h5 className="fs-18">Collaborate and Bring Ideas to Life</h5>
                        <p className="text-muted mb-0">
                          Work on dream projects or commission custom artwork, all within Artica's secure platform.
                        </p>
                      </div>
                    </div>
                  </NavLink>
                </Nav>
              </div>
            </Col>
            <Col lg={6}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <img src={processImage1} alt="Create Account" className="img-fluid" />
                </TabPane>
                <TabPane tabId="2">
                  <img src={processImage2} alt="Explore Jobs" className="img-fluid" />
                </TabPane>
                <TabPane tabId="3">
                  <img src={processImage3} alt="Get Hired" className="img-fluid" />
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default HowItWorks;