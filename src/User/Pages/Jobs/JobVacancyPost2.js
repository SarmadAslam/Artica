import React, { useState } from "react";
import { Col, Row, Modal, ModalBody, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";

//Job Images
import jobImage1 from "../../../assets/images/featured-job/img-01.png";
import jobImage2 from "../../../assets/images/featured-job/img-02.png";
import jobImage3 from "../../../assets/images/featured-job/img-03.png";
import jobImage4 from "../../../assets/images/featured-job/img-04.png";
import jobImage5 from "../../../assets/images/featured-job/img-05.png";
import jobImage6 from "../../../assets/images/featured-job/img-06.png";
import jobImage7 from "../../../assets/images/featured-job/img-07.png";
import jobImage8 from "../../../assets/images/featured-job/img-08.png";

const JobVacancyPost2 = () => {
  //Apply Now Model
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  const jobVacancyPost2 = [
    {
      id: 1,
      companyImg: jobImage1,
      jobDescription: "Freelance Portrait Artist",
      experience: "0-2 Yrs Exp.",
      companyName: "Artica Freelance Hub",
      location: "Online/Remote",
      salary: "$500 - $1,000 / project",
      fullTime: true,
      timing: "Full Time",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-warning-subtle text-warning",
          badgeName: "Urgent"
        },
        {
          id: 2,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "Remote"
        }
      ]
    },
    {
      id: 2,
      companyImg: jobImage2,
      jobDescription: "Art Workshop Instructor",
      experience: "2-4 Yrs Exp.",
      companyName: "Creative Vision Studio",
      location: "New York",
      salary: "$300 - $700 / session",
      partTime: true,
      timing: "Part Time",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "On-Site"
        }
      ]
    },
    {
      id: 3,
      companyImg: jobImage3,
      jobDescription: "Freelance Sculptor",
      experience: "2-4 Yrs Exp.",
      companyName: "Artica Freelance Hub",
      location: "Online/Remote",
      salary: "$600 - $1,200 / project",
      freeLance: true,
      timing: "Freelance",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-blue-subtle text-blue",
          badgeName: "Freelance"
        }
      ]
    },
    {
      id: 4,
      companyImg: jobImage4,
      jobDescription: "Art Sales Manager",
      experience: "5+ Yrs Exp.",
      companyName: "Artica Freelance Hub",
      location: "California",
      salary: "$800 - $1,500 / month",
      fullTime: true,
      timing: "Full Time",
      addclassNameBookmark: true,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "Urgent"
        }
      ]
    },
    {
      id: 5,
      companyImg: jobImage5,
      jobDescription: "Graphic Design Artist",
      experience: "0-5 Yrs Exp.",
      companyName: "Creative Vision Studio",
      location: "California",
      salary: "$300 - $700 / project",
      internship: true,
      timing: "Internship",
      addclassNameBookmark: false,
      badges: []
    },
    {
      id: 6,
      companyImg: jobImage6,
      jobDescription: "Exhibition Coordinator",
      experience: "0-2 Yrs Exp.",
      companyName: "Artica Freelance Hub",
      location: "California",
      salary: "$1,000 - $2,000 / event",
      fullTime: true,
      timing: "Full Time",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-warning-subtle text-warning",
          badgeName: "Urgent"
        },
        {
          id: 2,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "On-Site"
        }
      ]
    },
    {
      id: 7,
      companyImg: jobImage7,
      jobDescription: "Digital Artwork Designer",
      experience: "0-2 Yrs Exp.",
      companyName: "Artica Freelance Hub",
      location: "Remote",
      salary: "$400 - $900 / project",
      freeLance: true,
      timing: "Freelance",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-warning-subtle text-warning",
          badgeName: "Urgent"
        },
        {
          id: 2,
          badgeclassName: "bg-info-subtle text-info",
          badgeName: "Remote"
        }
      ]
    },
    {
      id: 8,
      companyImg: jobImage8,
      jobDescription: "Creative Consultant",
      experience: "0-2 Yrs Exp.",
      companyName: "Artica Freelance Hub",
      location: "California",
      salary: "$700 - $1,500 / project",
      partTime: true,
      timing: "Part Time",
      addclassNameBookmark: false,
      badges: [
        {
          id: 1,
          badgeclassName: "bg-warning-subtle text-warning",
          badgeName: "Urgent"
        }
      ]
    }
  ];
  return (
    <React.Fragment>
      {jobVacancyPost2.map((jobVacancyList2Details, key) => (
        <div
          key={key}
          className={
            jobVacancyList2Details.addclassNameBookmark === true
              ? "job-box bookmark-post card mt-5"
              : "job-box card mt-4"
          }
        >
          <div className="p-4">
            <Row>
              <Col lg={1}>
                <Link to="/companydetails">
                  <img
                    src={jobVacancyList2Details.companyImg}
                    alt=""
                    className="img-fluid rounded-3"
                  />
                </Link>
              </Col>
              <Col lg={10}>
                <div className="mt-3 mt-lg-0">
                  <h5 className="fs-17 mb-1">
                    <Link to="/jobdetails" className="text-dark">
                      {jobVacancyList2Details.jobDescription}
                    </Link>{" "}
                    <small className="text-muted fw-normal">
                      ({jobVacancyList2Details.experience})
                    </small>
                  </h5>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <p className="text-muted fs-14 mb-0">
                        {jobVacancyList2Details.companyName}
                      </p>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted fs-14 mb-0">
                        <i className="mdi mdi-map-marker"></i>
                        {jobVacancyList2Details.location}
                      </p>
                    </li>
                    <li className="list-inline-item">
                      <p className="text-muted fs-14 mb-0">
                        <i className="uil uil-wallet"></i>{" "}
                        {jobVacancyList2Details.salary}
                      </p>
                    </li>
                  </ul>
                  <div className="mt-2">
                    <span
                      className={
                        jobVacancyList2Details.fullTime === true
                          ? "badge bg-success-subtle text-success fs-13 mt-1 mx-1"
                          : jobVacancyList2Details.partTime === true
                            ? "badge bg-danger-subtle text-danger fs-13 mt-1 mx-1"
                            : jobVacancyList2Details.freeLance === true
                              ? "badge bg-primary-subtle text-primary fs-13 mt-1 mx-1"
                              : jobVacancyList2Details.internship === true
                                ? "badge bg-info-subtle text-info mt-1"
                                : ""
                      }
                    >
                      {jobVacancyList2Details.timing}
                    </span>
                    {(jobVacancyList2Details.badges || []).map(
                      (badgeInner, key) => (
                        <span
                          className={`badge ${badgeInner.badgeclassName} fs-13 mt-1`}
                          key={key}
                        >
                          {badgeInner.badgeName}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </Col>
            </Row>
            <div className="favorite-icon">
              <Link to="#">
                <i className="uil uil-heart-alt fs-18"></i>
              </Link>
            </div>
          </div>
          <div className="p-3 bg-light">
            <div className="row justify-content-between">
              <Col md={8}>
                <div>
                  <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                      <i className="uil uil-tag"></i> Art & Creativity
                    </li>
                    <li className="list-inline-item">
                      <i className="uil uil-database"></i>{" "}
                      {jobVacancyList2Details.experience}
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md={3}>
                <div className="text-md-end">
                  <Link
                    to="#"
                    onClick={openModal}
                    className="btn btn-primary"
                  >
                    Apply Now
                  </Link>
                </div>
              </Col>
            </div>
          </div>
        </div>
      ))}
      {/* Apply Now Modal */}
      <Modal isOpen={modal} toggle={openModal} centered>
        <ModalBody className="py-5">
          <div className="text-center mb-4">
            <h5 className="modal-title" id="staticBackdropLabel">
              Applying For this Job
            </h5>
          </div>
          <div className="position-absolute end-0 top-0 p-3">
            <button
              type="button"
              onClick={openModal}
              className="btn-close"
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
              placeholder="Include any additional details here"
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={openModal}
          >
            Submit Application
          </button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default JobVacancyPost2;
