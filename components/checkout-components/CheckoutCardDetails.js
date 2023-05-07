import React, { useState, useEffect } from "react";
import logoWhite from "../../assets/images/logo_white.png";
import { cardNumberField } from "../../assets/utils/CardNumberField";
import { months } from "../../assets/data/Months";
import { years } from "../../assets/data/Years";
import Image from "next/image";
import CardTypeSVG from "./CardTypeSVG";

function CheckoutCardDetails(props) {
  const [cardNumber, setCardNumber] = useState([]);
  const [cardHolder, setCardHolder] = useState();
  const [month, setMonth] = useState(
    new Date().toLocaleDateString().split("/")[1]
  );
  const [year, setYear] = useState(
    new Date().toLocaleDateString().split("/")[2]
  );
  const [cvv, setCvv] = useState();
  const [toggleBackCard, setToggleBackCard] = useState(false);

  const handleCardFlip = (e) => {
    if (
      e.target.className !== "card-number__part" &&
      e.target.className !== "cardholder-name" &&
      e.target.className !== "front-card-select" &&
      e.target.className !== "back-card-cvv"
    ) {
      setToggleBackCard(!toggleBackCard);
    }
  };

  const handleCardDetails = (e) => {
    e.preventDefault();
    const cardDetails = {
      cardNumber: cardNumber,
      cardHolder: cardHolder,
      month: month,
      year: year,
      cvv: cvv,
    };

    console.log(cardDetails);
  };

  useEffect(() => {
    cardNumberField();
  });

  return (
    <div
      className={`${
        props.billingFormSubmitted
          ? "checkout-cardDetails"
          : "checkout-cardDetails disabled"
      } `}
    >
      <form action="submit" onSubmit={handleCardDetails}>
        <div
          className={`checkout-card-container ${
            toggleBackCard ? "isFlipped" : ""
          }`}
          onClick={handleCardFlip}
        >
          <div className="front-card">
            <div className="header">
              <div className="logo">
                <Image src={logoWhite} alt="card-logo" width={100} priority />
              </div>
              <div className="card-type">
                <CardTypeSVG />
              </div>
            </div>
            <div className="card-content">
              <div className="card-number">
                <p>Card Number</p>
                <fieldset
                  className="card-number-field"
                  onChange={(e) =>
                    e.target.value.length === 4
                      ? setCardNumber([...cardNumber, e.target.value])
                      : ""
                  }
                >
                  <input
                    type="tel"
                    className="card-number__part"
                    maxLength="4"
                  />
                  <input
                    type="tel"
                    className="card-number__part"
                    maxLength="4"
                  />
                  <input
                    type="tel"
                    className="card-number__part"
                    maxLength="4"
                  />
                  <input
                    type="tel"
                    className="card-number__part"
                    maxLength="4"
                  />
                </fieldset>
              </div>
              <div className="card-details">
                <div className="card-holder">
                  <p>Card Holder</p>
                  <div className="card-holder-name">
                    <input
                      type="text"
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="cardholder-name"
                    />
                  </div>
                </div>
                <div className="validity">
                  <p>Expires</p>

                  <select
                    name="month"
                    onChange={(e) => setMonth(e.target.value)}
                    className="front-card-select"
                  >
                    {months.map((val) => {
                      return <option key={val.id}>{val.option}</option>;
                    })}
                  </select>

                  <select
                    name="year"
                    onChange={(e) => setYear(e.target.value)}
                    className="front-card-select"
                  >
                    {years.map((val) => {
                      return <option key={val.id}>{val.option}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="back-card">
            <div className="mag-strip"></div>
            <div className="cvv-container">
              <p>CVV</p>
              <div className="cvv">
                <input
                  type="text"
                  maxLength={3}
                  onChange={(e) => setCvv(e.target.value)}
                  className="back-card-cvv"
                />
              </div>
              <div className="card-type">
                <CardTypeSVG />
              </div>
            </div>
          </div>
        </div>
        <p className="card-message">Click the card to flip</p>
        <button type="submit" className="submit-card-details">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CheckoutCardDetails;
