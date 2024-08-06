import React, { useState, useEffect, useLayoutEffect } from "react";
import { FaArrowUp } from "react-icons/fa";


function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behaviour: "smooth",
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

    return <button className={`scrollToTop ${isVisible ? 'show' : 'hide'}`} onClick={scrollToTop}>
      <FaArrowUp/>
  </button>;
}

export default ScrollToTop;
