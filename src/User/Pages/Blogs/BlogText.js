import React from "react";
import { Col, Row, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

import blogImage4 from "../../../assets/images/blog/img-04.jpg";
import blogImage5 from "../../../assets/images/blog/img-05.jpg";
import blogImage6 from "../../../assets/images/blog/img-06.jpg";
import blogImage7 from "../../../assets/images/blog/img-07.jpg";
import blogImage8 from "../../../assets/images/blog/img-08.jpg";
import blogImage9 from "../../../assets/images/blog/img-09.jpg";

const BlogText = () => {
  const blogText = [
    {
      id: 1,
      blogImage: blogImage4,
      blogAuthor: "Alice Mellor",
      blogDate: "Aug 08, 2021",
      blogCount: 432,
      blogTitle: "Building a Stunning Artist Portfolio",
      blogContent:
        "Learn how to create a portfolio that showcases your artwork and attracts clients on freelancing platforms. Build a compelling narrative around your creative journey."
    },
    {
      id: 2,
      blogImage: blogImage5,
      blogAuthor: "Kiera Finch",
      blogDate: "July 23, 2021",
      blogCount: 247,
      blogTitle: "Maximizing Your Visibility as an Artist",
      blogContent:
        "Effective strategies to market your art online and gain visibility among potential clients and collaborators in the freelancing world."
    },
    {
      id: 3,
      blogImage: blogImage6,
      blogAuthor: "Toby Lees",
      blogDate: "July 11, 2021",
      blogCount: 188,
      blogTitle: "Freelance Art Jobs: A Beginner's Guide",
      blogContent:
        "A step-by-step guide on how to secure your first freelance art job. From platform registration to client communication and delivery of work."
    },
    {
      id: 4,
      blogImage: blogImage7,
      blogAuthor: "Dominic Potter",
      blogDate: "June 19, 2021",
      blogCount: 475,
      blogTitle: "The Power of Art Competitions for Freelancers",
      blogContent:
        "How art competitions can boost your career as a freelance artist, attract attention from top clients, and help you grow your professional network."
    },
    {
      id: 5,
      blogImage: blogImage8,
      blogAuthor: "Leon Davey",
      blogDate: "June 04, 2021",
      blogCount: 310,
      blogTitle: "Finding Inspiration and Creativity in Freelance Work",
      blogContent:
        "Discover how to maintain a consistent creative flow while balancing freelance art projects and dealing with client expectations."
    },
    {
      id: 6,
      blogImage: blogImage9,
      blogAuthor: "Harvey Bird",
      blogDate: "Feb 28, 2021",
      blogCount: 158,
      blogTitle: "The Essential Tools Every Freelance Artist Needs",
      blogContent:
        "A breakdown of the tools and platforms every freelance artist should use to manage their work, communicate with clients, and handle payments efficiently."
    }
  ];

  const blogVideo = [
    {
      id: 1,
      blogLink: "https://www.youtube.com/embed/1y_kfWUCFDQ",
      blogAuthor: "Harvey Bird",
      blogDate: "Feb 21, 2021",
      blogCount: 110,
      blogTitle: "How to Create a Freelance Art Portfolio That Sells",
      blogContent:
        "Watch this video to learn how to build a freelance art portfolio that stands out and attracts high-paying clients."
    },
    {
      id: 2,
      blogLink: "https://www.youtube.com/embed/1y_kfWUCFDQ",
      blogAuthor: "Harvey Bird",
      blogDate: "Feb 09, 2021",
      blogCount: 244,
      blogTitle: "Tips for Marketing Your Art Online and Gaining Clients",
      blogContent:
        "In this video, we discuss tips and tricks for marketing your artwork on freelancing platforms and social media to grow your client base."
    }
  ];

  return (
    <React.Fragment>
      <Row>
        {blogText.map((blogTextDetails, key) => (
          <Col lg={6} className="mb-4" key={key}>
            <Card className="blog-grid-box p-2">
              <img
                src={blogTextDetails.blogImage}
                alt=""
                className="img-fluid"
              />
              <CardBody>
                <ul className="list-inline d-flex justify-content-between mb-3">
                  <li className="list-inline-item">
                    <p className="text-muted mb-0">
                      <Link to="/blogauthor" className="text-muted fw-medium">
                        {blogTextDetails.blogAuthor}
                      </Link>{" "}
                      - {blogTextDetails.blogDate}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted mb-0">
                      <i className="mdi mdi-eye"></i>{" "}
                      {blogTextDetails.blogCount}
                    </p>
                  </li>
                </ul>
                <Link to="/blogdetails" className="primary-link">
                  <h6 className="fs-17">{blogTextDetails.blogTitle}</h6>
                </Link>
                <p className="text-muted">{blogTextDetails.blogContent}</p>
                <div>
                  <Link to="/blogdetails" className="form-text text-primary">
                    Read More <i className="uil uil-angle-right-b"></i>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}

        {blogVideo.map((blogVideoDetails, key) => (
          <Col lg={6} mb={4} key={key}>
            <Card className="blog-grid-box p-2">
              <div className="ratio ratio-16x9">
                {" "}
                <iframe
                  src={blogVideoDetails.blogLink}
                  title="YouTube video"
                  allowFullScreen
                ></iframe>{" "}
              </div>
              <CardBody>
                <ul className="list-inline d-flex justify-content-between mb-3">
                  <li className="list-inline-item">
                    <p className="text-muted mb-0">
                      <Link to="/blogauthor" className="text-muted fw-medium">
                        {blogVideoDetails.blogAuthor}
                      </Link>{" "}
                      - {blogVideoDetails.blogDate}
                    </p>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-muted mb-0">
                      <i className="mdi mdi-eye"></i>{" "}
                      {blogVideoDetails.blogCount}
                    </p>
                  </li>
                </ul>
                <Link to="/blogdetails" className="primary-link">
                  <h6 className="fs-17">{blogVideoDetails.blogTitle}</h6>
                </Link>
                <p className="text-muted">{blogVideoDetails.blogContent}</p>
                <div>
                  <Link to="/blogdetails" className="form-text text-primary">
                    Read More <i className="uil uil-angle-right-b"></i>
                  </Link>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default BlogText;
