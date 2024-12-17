import React from "react";
import { Container, Row, Col, Card, CardImg, CardBody } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper CSS
import 'swiper/css';
import 'swiper/css/virtual';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const Testimonal = () => {
  const testimonal = [
    {
      id: 1,
      image: "../../../assets/images/testimonials/1", // Replace with relevant image for Artica testimonials
      content:
        "Artica has been a game-changer for my career as an artist. The bidding system allowed me to secure high-paying commissions, and the portfolio feature helped showcase my work globally.",
      name: "Sophia Martinez",
      occupation: "Freelance Digital Artist"
    },
    {
      id: 2,
      image: "../../../assets/images/testimonials/2", // Replace with relevant image for Artica testimonials
      content:
        "I found my dream project through Artica's job postings. The platform's intuitive interface and personalized recommendations make finding opportunities effortless.",
      name: "Liam Johnson",
      occupation: "Traditional Artist"
    },
    {
      id: 3,
      image: "../../../assets/images/testimonials/3", // Replace with relevant image for Artica testimonials
      content:
        "The art competition feature on Artica helped me gain recognition and connect with art enthusiasts. This platform is a must for any artist looking to grow!",
      name: "Amelia Davis",
      occupation: "Concept Artist"
    }
  ];

  return (
    <React.Fragment>
      <section className="section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              <div className="section-title text-center mb-4 pb-2">
                <h3 className="title mb-3">What Artists Are Saying</h3>
                <p className="text-muted">
                  Discover how Artica has helped artists connect, create, and grow their careers.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col lg={10}>
              <Swiper
                className="pb-5"
                loop={true}
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
              >
                <div className="swiper-wrapper">
                  {(testimonal || []).map((testimonalDetails, key) => (
                    <SwiperSlide key={key}>
                      <Card className="testi-box">
                        <CardBody>
                          <div className="mb-4">
                            <CardImg
                              src={testimonalDetails.image}
                              height="50"
                              alt="Testimonial"
                            />
                          </div>
                          <p className="testi-content lead text-muted mb-4">
                            {testimonalDetails.content}
                          </p>
                          <h5 className="mb-0">{testimonalDetails.name}</h5>
                          <p className="text-muted mb-0">
                            {testimonalDetails.occupation}
                          </p>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  ))}
                </div>
                <div className="swiper-pagination"></div>
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Testimonal;
