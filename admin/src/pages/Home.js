import Header from "../components/Header/Header";
import React,{useState} from "react";
import { Outlet } from "react-router-dom";
import Aside from "../components/Aside/Aside";

function Home()
{
  const [aside, setAside] = useState(true)
  const handleAside = (asideVal) =>
  {
    setAside(asideVal)
  }
  return (
    <>
      <Header onSaveAside={ handleAside} />
      <Aside aside={aside} />

      <div className={`main-cont ${aside ? ' aside':''}`}>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
