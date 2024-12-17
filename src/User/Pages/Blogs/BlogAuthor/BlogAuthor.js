import React from "react";
import { Container, Row } from "reactstrap";
import Section from "./Section";
import LeftSideContent from "./LeftSideContent";
import RightSideContent from "./RightSideContent";

const BlogAuthor = () => {
  document.title = "Blog Author | Artica - Freelancing Platform for Artist";
  return (
    <React.Fragment>
      <Section />
      <section className="section">
        <Container>
          <Row>
            <LeftSideContent />
            <RightSideContent />
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default BlogAuthor;
