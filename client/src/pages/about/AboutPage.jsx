import React from "react";
import "./AboutPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/filterSection/FilterSection";

const AboutPage = () => {
  return (
    <div className="container about-page">
      <div className="about-text-container">
        <h2 className="title">Welcome to TechShop</h2>
        <p className="description">
          Discover the latest in technology with TechShop.<br></br> From
          high-performance computers to cutting-edge smartphones, we offer
          top-quality products at competitive prices. Enjoy a seamless shopping
          experience with expert advice and exceptional service.
          <br />
        </p>
        <div className="contact-info">
          <h3 className="contact-title">Contact Us</h3>
          <ul className="contact-list">
            <li>
              <i className="bi bi-envelope-fill contact-icon"></i>{" "}
              support@techshop.com
            </li>
            <li>
              <i className="bi bi-telephone-fill contact-icon"></i> +1 234 567
              890
            </li>
            <li>
              <i className="bi bi-geo-alt-fill contact-icon"></i> 123 Tech Lane,
              Silicon Valley, CA 94043, USA
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
