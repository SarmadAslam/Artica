import React from "react";
import { Container, Row, Col } from "reactstrap";
import Section from "./Section";
import BlogText from "./BlogText";
import PopularPost from "./PopularPost";
import BlogCategory from "./BlogCategory";
import TextWidget from "./TextWidget";
import Archives from "./Archives";
import Tags from "./Tags";
import SocialConnect from "./SocialConnect";

const Blogs = () => {
  document.title = " Blog | Read & Learn with Artica";

  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <Col lg={8} md={7}>
              <div className="blog-post">
                <BlogText />
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

export default Blogs;
