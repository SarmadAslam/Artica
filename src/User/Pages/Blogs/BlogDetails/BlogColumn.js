import React from "react";
import { Link } from "react-router-dom";

//import UserImage
import userImage3 from "../../../../assets/images/user/img-03.jpg";

const BlogColumn = () => {
  return (
    <React.Fragment>
      <ul className="list-inline mb-0 mt-3 text-muted">
        <li className="list-inline-item">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <img
                src={userImage3}
                alt=""
                className="avatar-sm rounded-circle"
              />
            </div>
            <div className="ms-3">
              <Link to="/blogauthor" className="primary-link">
                <h6 className="mb-0">By Emily Harris</h6>
              </Link>
            </div>
          </div>
        </li>
        <li className="list-inline-item">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="uil uil-calendar-alt"></i>
            </div>
            <div className="ms-2">
              <p className="mb-0"> Nov 05, 2023</p>
            </div>
          </div>
        </li>
        <li className="list-inline-item">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0">
              <i className="uil uil-comments-alt"></i>
            </div>
            <div className="ms-2 flex-grow-1">
              <p className="mb-0"> 5 Comments</p>
            </div>
          </div>
        </li>
      </ul>
      <div className="mt-4">
        <h5>How to Build an Impressive Artist Portfolio</h5>
        <p className="text-muted">
          An artist’s portfolio is their visual resume. Learn the key steps to creating a portfolio that will attract clients and showcase your unique art style effectively.
        </p>
        <p className="text-muted mb-4">
          Building a portfolio requires careful selection of your best works, considering both quality and diversity. Whether you are a painter or sculptor, your portfolio should reflect your range and mastery.
        </p>
        <figure className="blog-blockquote text-center">
          <blockquote className="blockquote">
            <p className="fs-17">
              "A strong portfolio not only showcases your art but tells the story of your artistic journey and evolution."
            </p>
          </blockquote>
          <figcaption className="blockquote-footer fs-15 mb-4">
            Art Educator
            <cite title="Source Title" className="text-primary fw-semibold">
              {" "}
              Emily Harris
            </cite>
          </figcaption>
        </figure>
        <p className="text-muted">
          While creating your portfolio, remember to highlight artworks that demonstrate your technical skills and creativity. Be sure to present each piece clearly and in a professional manner.
        </p>
        <p className="text-muted">
          A portfolio is not just a gallery—it's a powerful marketing tool that helps you gain commissions and showcase your talents to potential clients.
        </p>
        <div className="d-flex align-items-center mb-4">
          <div className="flex-shrink-0">
            <b>Tags:</b>
          </div>
          <div className="flex-grow-1 ms-2 d-flex flex-wrap align-items-start gap-1">
            <Link
              to="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Portfolio
            </Link>
            <Link
              to="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Artist Tips
            </Link>
            <Link
              to="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Art Business
            </Link>
            <Link
              to="#"
              className="badge bg-success-subtle text-success mt-1 fs-14"
            >
              Exhibition
            </Link>
          </div>
        </div>
        <ul className="blog-social-menu list-inline mb-0 text-end">
          <li className="list-inline-item">
            <b>Share post:</b>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-link bg-primary-subtle text-primary">
              <i className="uil uil-facebook-f"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-link bg-success-subtle text-success">
              <i className="uil uil-whatsapp"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-link bg-blue-subtle text-blue">
              <i className="uil uil-linkedin-alt"></i>
            </Link>
          </li>
          <li className="list-inline-item">
            <Link to="#" className="social-link bg-danger-subtle text-danger">
              <i className="uil uil-envelope"></i>
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default BlogColumn;
