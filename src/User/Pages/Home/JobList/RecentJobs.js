import React, { useState } from "react";
import { Col, Row, Modal, ModalBody, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";

// Artwork Images
import jobImage1 from "../../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../../assets/images/featured-job/img-03.png";
import jobImage4 from "../../../../assets/images/featured-job/img-04.png";

const RecentJobs = () => {
  // Apply Now Modal
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  const recentJobs = [
    {
      id: 1,
      companyImg: jobImage1,
      jobDescription: "Custom Art Commission",
      companyName: "Artworks Studio",
      location: "Oakridge Lane, Richardson",
      salary: "$500-$800",
      fullTime: true,
      timing: "Full Time",
      category: "Recent Art Jobs",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "Private"
        }
      ],
      experience: "1 - 2 years",
      Notes: "Looking for artists with a passion for portraiture."
    },
    {
      id: 2,
      companyImg: jobImage2,
      jobDescription: "Art Gallery Curator",
      companyName: "Creative Arts Collective",
      location: "Dodge City, Louisiana",
      salary: "$700-$1200",
      partTime: true,
      timing: "Part Time",
      category: "Recent Art Jobs",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "Private"
        },
        {
          id: 2,
          badgeclassName: "bg-warning-subtle text-warning",
          badgeName: "Urgent"
        }
      ],
      experience: "0 - 1 years",
      Notes: "Experience in art curation is a plus."
    },
    {
      id: 3,
      companyImg: jobImage3,
      jobDescription: "Freelance Digital Artist",
      companyName: "Artica Studios",
      location: "Phoenix, Arizona",
      salary: "$1000-$2000",
      freelancer: true,
      timing: "Freelancer",
      category: "Recent Art Jobs",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "Private"
        }
      ],
      experience: "0 - 1 years",
      Notes: null
    },
    {
      id: 4,
      companyImg: jobImage4,
      jobDescription: "Creative Director - Visual Arts",
      companyName: "Designs Agency",
      location: "Escondido, California",
      salary: "$1500-$3000",
      fullTime: true,
      timing: "Full Time",
      category: "Recent Art Jobs",
      badges: [
        {
          id: 1,
          badgeclassName: "bg-warning-subtle text-warning",
          badgeName: "Urgent"
        }
      ],
      experience: "2 - 3 years",
      Notes: null
    }
  ];

  return (
    <React.Fragment>
      {recentJobs.map((jobDetails, key) => (
        <div
          key={key}
          className={
            jobDetails.addclassNameBookmark === true
              ? "job-box bookmark-post card mt-4"
              : "job-box card mt-4"
          }
        >
          <div className="bookmark-label text-center">
            <Link to="#" className="text-white align-middle">
              <i className="mdi mdi-star"></i>
            </Link>
          </div>
          <div className="p-4">
            <Row className="align-items-center">
              <Col md={2}>
                <div className="text-center mb-4 mb-md-0">
                  <Link to="/company-details">
                    <img
                      src={jobDetails.companyImg}
                      alt=""
                      className="img-fluid rounded-3"
                    />
                  </Link>
                </div>
              </Col>

              <Col md={3}>
                <div className="mb-2 mb-md-0">
                  <h5 className="fs-18 mb-1">
                    <Link to="/jobdetails" className="text-dark">
                      {jobDetails.jobDescription}
                    </Link>
                  </h5>
                  <p className="text-muted fs-14 mb-0">
                    {jobDetails.companyName}
                  </p>
                </div>
              </Col>

              <Col md={3}>
                <div className="d-flex mb-2">
                  <div className="flex-shrink-0">
                    <i className="mdi mdi-map-marker text-primary me-1"></i>
                  </div>
                  <p className="text-muted mb-0">{jobDetails.location}</p>
                </div>
              </Col>

              <Col md={2}>
                <div>
                  <p className="text-muted mb-2">
                    <span className="text-primary">$</span>
                    {jobDetails.salary}
                  </p>
                </div>
              </Col>

              <Col md={2}>
                <div>
                  <span
                    className={
                      jobDetails.fullTime === true
                        ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                        : jobDetails.partTime === true
                        ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                        : jobDetails.freelancer === true
                        ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                        : ""
                    }
                  >
                    {jobDetails.timing}
                  </span>

                  {(jobDetails.badges || []).map((badge, key) => (
                    <span
                      className={
                        "badge " + badge.badgeclassName + " fs-13 mt-1"
                      }
                      key={key}
                    >
                      {badge.badgeName}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          </div>
          <div className="p-3 bg-light">
            <Row>
              <Col md={4}>
                <div>
                  <p className="text-muted mb-0">
                    <span className="text-dark">Experience :</span>{" "}
                    {jobDetails.experience}
                  </p>
                </div>
              </Col>

              <Col lg={6} md={5}>
                <div>
                  <p className="text-muted mb-0">
                    <span className="text-dark">
                      {jobDetails.Notes === null ? "" : "Notes :"}
                    </span>
                    {jobDetails.Notes}{" "}
                  </p>
                </div>
              </Col>

              <Col lg={2} md={3}>
                <div className="text-start text-md-end">
                  <Link to="#" onClick={openModal} className="primary-link">
                    Apply Now <i className="mdi mdi-chevron-double-right"></i>
                  </Link>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      ))}
      <div className="text-center mt-4 pt-2">
        <Link to="/joblist" className="btn btn-primary">
          View More <i className="uil uil-arrow-right"></i>
        </Link>
      </div>
      <div
        className="modal fade"
        id="applyNow"
        tabIndex="-1"
        aria-labelledby="applyNow"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <Modal isOpen={modal} toggle={openModal} centered>
            <ModalBody className="modal-body p-5">
              <div className="text-center mb-4">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Apply For This Job
                </h5>
              </div>
              <div className="position-absolute end-0 top-0 p-3">
                <button
                  type="button"
                  onClick={openModal}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="mb-3">
                <Label for="nameControlInput" className="form-label">
                  Name
                </Label>
                <Input
                  type="text"
                  className="form-control"
                  id="nameControlInput"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-3">
                <Label for="emailControlInput2" className="form-label">
                  Email Address
                </Label>
                <Input
                  type="email"
                  className="form-control"
                  id="emailControlInput2"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-3">
                <Label for="messageControlTextarea" className="form-label">
                  Message
                </Label>
                <textarea
                  className="form-control"
                  id="messageControlTextarea"
                  rows="4"
                  placeholder="Enter your message"
                ></textarea>
              </div>
              <div className="mb-4">
                <Label className="form-label" for="inputGroupFile01">
                  Portfolio Upload
                </Label>
                <Input
                  type="file"
                  className="form-control"
                  id="inputGroupFile01"
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Application
              </button>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RecentJobs;