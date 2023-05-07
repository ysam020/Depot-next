import React from "react";
import Link from "next/link";
import CartEmpty from "../assets/lottie-files/CartEmpty.json";
import Lottie from "lottie-react";

function EmptyCart() {
  return (
    <div className="empty-cart-container">
      <div className="lottie-img">
        <Lottie loop={true} animationData={CartEmpty}></Lottie>
      </div>
      <h1>Nothing here</h1>
      <Link href="/">Return to shop</Link>
    </div>
  );
}

export default EmptyCart;
