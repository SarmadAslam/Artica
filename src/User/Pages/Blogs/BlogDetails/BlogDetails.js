import React from "react";
import { Container, Col, Row } from "reactstrap";
import Section from "./Section";
import BlogTitle from "./BlogTitle";
import BlogCategory from "../BlogCategory";
import PopularPost from "../PopularPost";
import TextWidget from "../TextWidget";
import Archives from "../Archives";
import Tags from "../Tags";
import SocialConnect from "../SocialConnect";
import BlogSwiper from "./BlogSwiper";
import BlogColumn from "./BlogColumn";
import BlogComments from "./BlogComments";
import BlogForm from "./BlogForm";
import BlogPost from "./BlogPost";

const BlogDetails = () => {
  document.title = "Blog Details | Artica - Job Listing Template | Themesdesign";

  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <BlogTitle />
          <Row>
            <Col lg={8}>
              <div className="blog-post">
                <BlogSwiper />
                <BlogColumn />
                <BlogComments />
                <BlogForm />
                <BlogPost />
              </div>
            </Col>
            <Col lg={4} md={5}>
              <div className="sidebar ms-lg-4 ps-lg-4 mt-5 mt-lg-0">
                <BlogCategory />
                <PopularPost />
                <TextWidget />
                <Archives />
                <Tags />
                <SocialConnect />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default BlogDetails;
