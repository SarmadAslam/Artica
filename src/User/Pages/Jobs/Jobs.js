import React from "react";
import { Col, Container, Row } from "reactstrap";
import Section from "./Section";
import JobSearchOptions from "./JobSearchOptions";
import Popular from "./Popular";
import Sidebar from "./Sidebar";
import JobVacancyPost2 from "./JobVacancyPost2";
import Pagination from "../Jobs/Pagination";

const Jobs = () => {
  document.title = "Find Jobs | Artica - Job Listings for Creative Freelancers";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <div className="me-lg-5">
                <JobSearchOptions />
                <Popular />
                <JobVacancyPost2 />
                <Pagination />
              </div>
            </Col>
            <Sidebar />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Jobs;
