import React, { useEffect, useState } from "react";
import BillingForm from "../forms/BillingForm";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutCardDetails from "@/components/checkout-components/CheckoutCardDetails";

function Checkout() {
  const [billingFormSubmitted, setBillingFormSubmitted] = useState(true);

  const cartData = useSelector((state) => state.cartReducer);
  const total_price = cartData.reduce((accumeletor, item) => {
    return accumeletor + item.price * item.qty;
  }, 0);

  useEffect(() => {
    if (cartData.length === 0) {
      // navigate("/");
    }
    window.scrollTo(0, 0);
    document.title = "Checkout - Depot";

    // eslint-disable-next-line
  }, [cartData.length]);

  return (
    <div className="checkout-page">
      <Container className="checkout-form">
        <Row>
          <Col xs={12} md={6}>
            <BillingForm setBillingFormSubmitted={setBillingFormSubmitted} />
          </Col>
          <Col>
            <CheckoutCardDetails billingFormSubmitted={billingFormSubmitted} />
          </Col>
        </Row>
      </Container>

      <Container className="order-details">
        <Row className="order-details-row">
          <Col sm={8}>
            <h6>Product</h6>
          </Col>
          <Col>
            <h6>Subtotal</h6>
          </Col>
        </Row>
        {cartData.map((product, id) => {
          return (
            <Row key={id} className="order-details-row">
              <Col sm={8}>
                <p>{product.title}</p>
              </Col>
              <Col>{product.price}</Col>
            </Row>
          );
        })}
        <Row className="order-details-row">
          <Col sm={8}>
            <p>Total</p>
          </Col>
          <Col>
            <p>{total_price.toFixed(2)}</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Checkout;
