import React from "react";
import { Link } from "react-router-dom";

//Import Image
import userImage1 from "../../../../assets/images/user/img-01.jpg";
import userImage2 from "../../../../assets/images/user/img-02.jpg";
import userImage4 from "../../../../assets/images/user/img-04.jpg";

const BlogComments = () => {
  return (
    <React.Fragment>
      <h5 className="border-bottom pb-3 mt-5">Comments</h5>
      <div className="mt-5">
        <div className="d-sm-flex align-items-top">
          <div className="flex-shrink-0">
            <img
              className="rounded-circle avatar-md img-thumbnail"
              src={userImage1}
              alt="img"
            />
          </div>
          <div className="flex-grow-1 ms-sm-3">
            <small className="float-end fs-12 text-muted">
              <i className="uil uil-clock"></i> 30 min Ago
            </small>
            <Link to="#" className="primary-link">
              <h6 className="fs-16 mt-sm-0 mt-3 mb-0">Rebecca Swartz</h6>
            </Link>
            <p className="text-muted fs-14 mb-0">Aug 10, 2021</p>
            <div className="my-3 badge bg-light">
              <Link to="#" className="text-primary">
                <i className="mdi mdi-reply"></i> Reply
              </Link>
            </div>
            <p className="text-muted fst-italic mb-0">
              "Love the variety of artwork shared here! As an artist myself, I truly appreciate the platform's support for traditional artists."
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="d-sm-flex align-items-top">
          <div className="flex-shrink-0">
            <img
              className="rounded-circle avatar-md img-thumbnail"
              src={userImage2}
              alt="img"
            />
          </div>
          <div className="flex-grow-1 ms-sm-3">
            <small className="float-end fs-12 text-muted">
              <i className="uil uil-clock"></i> 2 hrs Ago
            </small>
            <Link to="#" className="primary-link">
              <h6 className="fs-16 mt-sm-0 mt-3 mb-0">Adam Gibson</h6>
            </Link>
            <p className="text-muted fs-14 mb-0">Aug 10, 2021</p>
            <div className="my-3 badge bg-light">
              <Link to="#" className="text-primary">
                <i className="mdi mdi-reply"></i> Reply
              </Link>
            </div>
            <p className="text-muted fst-italic mb-0">
              "This platform offers a great way to connect with clients and fellow artists. Excited to see where this goes!"
            </p>

            <div className="d-sm-flex align-items-top mt-5">
              <div className="flex-shrink-0">
                <img
                  className="rounded-circle avatar-md img-thumbnail"
                  src={userImage4}
                  alt="img"
                />
              </div>
              <div className="flex-grow-1 ms-sm-3">
                <small className="float-end fs-12 text-muted">
                  <i className="uil uil-clock"></i> 2 hrs Ago
                </small>
                <Link to="blogauthor" className="primary-link">
                  <h6 className="fs-16 mt-sm-0 mt-3 mb-0">Kiera Finch</h6>
                </Link>
                <p className="text-muted fs-14 mb-0">Aug 10, 2021</p>
                <div className="my-3 badge bg-light">
                  <Link to="#" className="text-primary">
                    <i className="mdi mdi-reply"></i> Reply
                  </Link>
                </div>
                <p className="text-muted fst-italic mb-0">
                  "This platform offers a wonderful opportunity for artists to not only sell their artwork but to also showcase their skills and build a strong portfolio."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BlogComments;
