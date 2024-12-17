import React from "react";
import ContactContent from "../Contact/ContactContent";
import NavBar from "../../Components/NavBar";
import TopBar from "../../Components/TopBar";
import { Link } from "react-router-dom";

const Contact = () => {
  document.title = "Contact Us";
  return (
    <React.Fragment>
      <TopBar />
      <NavBar />
      <nav className="breadcrumb-container" aria-label="breadcrumb">
        <ol className="breadcrumb justify-content-center">
          <li className="breadcrumb-item">
            <Link to="/" className="breadcrumb-link">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#" className="breadcrumb-link">Contact</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Contact Us
          </li>
        </ol>
      </nav>

      <ContactContent />
    </React.Fragment>
  );
};

export default Contact;
