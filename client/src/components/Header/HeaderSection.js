import React from "react";
import { Link } from "react-router-dom";
import profilePic from "../../assets/images/Aadhithya_Profile_Pic.png";

function HeaderSection() {
  return (
    <section className="header_data_section">
      <div className="container flex flex-sb w-100">
        <div className="leftheader_info">
          <h1>
            Hi, I am <span>Aadhithya SB</span>. <br />
            Full Stack Developer
          </h1>
          <h3>Specialist in javascript and react.js</h3>
          <div className="flex gap-2">
            <button>
              <a
                href="https://portfolio-iota-livid-22.vercel.app/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Me
              </a>
            </button>
            <button>
              <a
                href="https://portfolio-iota-livid-22.vercel.app/home"
                target="_blank"
                rel="noopener noreferrer"
              >
                About Me
              </a>
            </button>
          </div>
        </div>
        <div className="rightheader_img">
          {/* <div className="image_bg_top"></div>
          <div className="image_bg_top2"></div> */}
          <img src={profilePic} alt="img" />
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;
