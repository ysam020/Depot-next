import Lottie from "lottie-react";
import homeBannerLottie from "../../assets/lottie-files/home-banner.json";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

function homeBanner() {
  return (
    <Container fluid className="home-banner">
      <Container className="hero-content">
        <Row>
          <Col lg={6} className="hero-content-col-left">
            <div className="hero-content-col-left-content">
              <h3>Lorem ipsum</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Assumenda ex error corrupti velit incidunt neque, officia
                voluptas. Ea corporis molestiae cum. Libero fugiat, accusamus
                modi dignissimos quae dolorum voluptatibus reprehenderit.
              </p>
              <Link href="/#home-shop" className="home-banner-btn">
                Shop Now
              </Link>
            </div>
          </Col>
          <Col lg={6} className="hero-content-col-right">
            <div className="home-banner-lottie">
              <Lottie loop={true} animationData={homeBannerLottie}></Lottie>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default homeBanner;
