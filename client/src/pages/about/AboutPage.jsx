import React from "react";
import "./AboutPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/filterSection/FilterSection";

const AboutPage = () => {
  return (
    <div className="container">
      <div className="container about-text-container">
        <h2 className="title">Easy Shop</h2>
        <p className="description">
          Welcome to EasyShop!<br></br>
          Your destination for finding the best products at great prices!{" "}
          <br></br>
          We’re here to provide you with an exceptional shopping experience,
          <br></br>
          offering a wide range of items to fit your needs and lifestyle.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
