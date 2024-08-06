import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <div className="container flex flex-sb flex-wrap flex-left">
        <div className="footer_logo">
          <h2>ASB Blogs</h2>
          <h4>&copy; 2024 All Rights Reserved</h4>
          <h3>
            Made with 💜 By <span>AadhithyaSB</span>
          </h3>
        </div>
        <div className="q_links">
          <h3>Quick Links</h3>
          <ul>
            <Link to="/">
              <li>Advertise with us</li>
            </Link>
            <Link to="/">
              <li>About Me</li>
            </Link>
            <Link to="/">
              <li>Contact Me</li>
            </Link>
          </ul>
        </div>
        <div className="q_links">
          <h3>Legal Stuff Links</h3>
          <ul>
            <Link to="/">
              <li>Privacy Notice</li>
            </Link>
            <Link to="/">
              <li>Cookies Policy</li>
            </Link>
            <Link to="/">
              <li>Terms Of Use</li>
            </Link>
          </ul>
        </div>
        <div className="q_links">
          <h3>Social Media</h3>
          <ul>
            <a href="https://github.com/aadhithyasb087">
              <li>Github</li>
            </a>
            <a href="https://www.linkedin.com/in/aadhithyasb1">
              <li>LinkedIn</li>
            </a>
            <a href="https://www.instagram.com/aadhithya_sb/">
              <li>Instagram</li>
            </a>
           
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
