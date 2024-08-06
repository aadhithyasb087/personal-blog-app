import Header from "../components/Header/Header";
import React from "react";
import Footer from "../components/Footer";
import { Outlet, } from "react-router-dom";



function Home() {
  return (
    <>
      <Header />
      <Outlet />

      <Footer />
    </>
  );
}

export default Home;
