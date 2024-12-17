import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Categories = () => {
  const categories = [
    {
      id: 1,
      jobCategories: [
        {
          id: 1,
          jobName: "Traditional Artist Jobs",
          jobNumbers: 25
        },
        {
          id: 2,
          jobName: "Digital Artist Jobs",
          jobNumbers: 10
        },
        {
          id: 3,
          jobName: "Art Instructor Jobs",
          jobNumbers: 71
        },
        {
          id: 4,
          jobName: "Art Director",
          jobNumbers: 40
        },
        {
          id: 5,
          jobName: "Project Manager (Art Projects)",
          jobNumbers: 86
        },
        {
          id: 6,
          jobName: "Art Exhibition Organizer",
          jobNumbers: 47
        },
        {
          id: 7,
          jobName: "Marketing & Art Promotion",
          jobNumbers: 47
        },
        {
          id: 8,
          jobName: "Art Business Management",
          jobNumbers: 47
        }
      ]
    },
    {
      id: 2,
      jobCategories: [
        {
          id: 1,
          jobName: "Art Gallery Jobs",
          jobNumbers: 120
        },
        { id: 2, jobName: "Art Curator Jobs", jobNumbers: 73 },
        { id: 3, jobName: "Art Tutor Jobs", jobNumbers: 88 },
        {
          id: 4,
          jobName: "Art Restoration Jobs",
          jobNumbers: 10
        },
        {
          id: 5,
          jobName: "Artist Assistant Jobs",
          jobNumbers: 55
        },
        {
          id: 6,
          jobName: "Museum & Exhibition Jobs",
          jobNumbers: 99
        },
        {
          id: 7,
          jobName: "Art Auction Jobs",
          jobNumbers: 27
        },
        {
          id: 8,
          jobName: "Photography & Art Media Jobs",
          jobNumbers: 11
        }
      ]
    },
    {
      id: 3,
      jobCategories: [
        {
          id: 1,
          jobName: "Art Software Jobs",
          jobNumbers: 175
        },
        {
          id: 2,
          jobName: "Art-related Logistics Jobs",
          jobNumbers: 60
        },
        {
          id: 3,
          jobName: "Art Sports & Events Jobs",
          jobNumbers: 42
        },
        {
          id: 4,
          jobName: "Art Teacher Jobs",
          jobNumbers: 30
        },
        {
          id: 5,
          jobName: "Art Care & Conservation Jobs",
          jobNumbers: 120
        },
        {
          id: 6,
          jobName: "Digital Art Marketing Jobs",
          jobNumbers: 88
        },
        {
          id: 7,
          jobName: "Art Administrative Jobs",
          jobNumbers: `04`
        },
        {
          id: 8,
          jobName: "Art Studio Services",
          jobNumbers: 75
        }
      ]
    }
  ];
  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="text-center mb-5">
                <p className="badge bg-warning fs-14 mb-2">Art Jobs Live Today</p>
                <h4>Browse Art Jobs By Categories</h4>
                <p className="text-muted">
                  Browse through various art job categories. Whether you're an artist or a client, find your perfect match.
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {categories.map((categoriesDetails, key) => (
              <Col lg={4} key={key}>
                <Card className="job-Categories-box bg-light border-0">
                  <CardBody className="p-4">
                    <ul className="list-unstyled job-Categories-list mb-0">
                      {(categoriesDetails.jobCategories || []).map(
                        (jobCategoriesDetails, key) => (
                          <li key={key}>
                            <Link to="/joblist" className="primary-link">
                              {jobCategoriesDetails.jobName}{" "}
                              <span className="badge bg-info-subtle text-info float-end">
                                {jobCategoriesDetails.jobNumbers}
                              </span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Categories;
