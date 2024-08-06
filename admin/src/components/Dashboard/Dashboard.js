import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { IoHome } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Loading from "../../assets/icons/Loading/Loading";
import { useUser } from "../../contexts/UserContext";
import useFetchData from "../../hooks/useFetchData";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function Dashboard() {
  const { allData, loading } = useFetchData("/getblogs");

  const [loadingStart, setLoadingStart] = useState(true);

  const navigate = useNavigate();
  const { user } = useUser();

  ChartJS.register(
    CategoryScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineController,
    LinearScale
  );
  const tempBlogsData = [...allData];
  const blogsData=tempBlogsData.filter(blog=>blog.status === 'publish')

  const findCatgTotal = (catg) => {
    let totalCatg = 0;
    blogsData &&
      blogsData.map((blog) => {
        if (blog.category === catg) {
          totalCatg++;
        }
        return null;
      });
    return totalCatg;
  };
  let totalBlogsCurYr = 0;
  let curYear = new Date().getFullYear();
  blogsData.map((blog) => {
    const blogYr = new Date(blog.createdAt).getFullYear();
    if (blogYr === curYear) {
      totalBlogsCurYr++;
    }
    return null;
  });
  let totalCatg = [];
  blogsData.map((blog) => {
    if (totalCatg.length === 0) {
      totalCatg.push(blog.category);
    } else if (!totalCatg.includes(blog.category)) {
      totalCatg.push(blog.category);
    }
    return null;
  });
  let totalTags = 0;
  blogsData.map((blog) => (totalTags += blog.tags.length));

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: true,
      },
      title: {
        display: true,
        text: "Blogs Created Monthly By Year",
      },
    },
  };

  const monthlyData = blogsData
    .filter((blog) => blog.status === "publish")
    .reduce((arrData, blog) => {
      const year = new Date(blog.createdAt).getFullYear();
      const month = new Date(blog.createdAt).getMonth();
      arrData[year] = arrData[year] || Array(12).fill(0);
      arrData[year][month]++;
      return arrData;
    }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const datasets = years.map((year) => ({
    label: `${year}`,
    data: monthlyData[year] || Array[12].fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)},0.5)`,
  }));

  const data = { labels, datasets };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchData = () => {
      setLoadingStart(false);
    };

    return () => fetchData();
  }, [user]);
  if (loadingStart) {
    return (
      <div className="loading">
        <Loading />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="admin-content">
      <div className="admin-content-title">
        <div data-aos="fade-right">
          <h2>
            Blogs <span>Dashboard</span>
          </h2>
          <h3>ADMIN PANEL</h3>
        </div>
        <div className="admin-content-breadcrumb" data-aos="fade-left">
          <IoHome />
          <span>/</span>
          <span>Dashboard</span>
        </div>
      </div>
      <div className="dashboard-topfour-cards">
        <div className="dashboard-four-card" data-aos="fade-right">
          <h2>Total Blogs</h2>
          <span>
            {blogsData.filter((blog) => blog.status === "publish").length}
          </span>
        </div>
        <div className="dashboard-four-card" data-aos="fade-right">
          <h2>Total Topics</h2>
          <span>{totalCatg ? totalCatg.length : "0"}</span>
        </div>
        <div className="dashboard-four-card" data-aos="fade-left">
          <h2>Total Tags</h2>
          <span>{totalTags ? totalTags : "0"}</span>
        </div>
        <div className="dashboard-four-card" data-aos="fade-left">
          <h2>Draft Blogs</h2>
          <span>
            {tempBlogsData.filter((blog) => blog.status === "draft").length}
          </span>
        </div>
      </div>
      <div className="dashboard-bottom">
        <div className="leftyear-overview" data-aos="fade-up">
          <div>
            <h3>Year Overview</h3>
            <ul className="creative-dots">
              <li className="big-dot"></li>
              <li className="semi-big-dot"></li>
              <li className="medium-dot"></li>
              <li className="semi-medium-dot"></li>
              <li className="semi-small-dot"></li>
              <li className="small-dot"></li>
            </ul>
            <h3 className="leftyear-overview-right">
              <span>Total Blogs this year: </span>
              {totalBlogsCurYr}
            </h3>
          </div>
          <Bar data={data} options={options} />
        </div>
        <div className="right-blog-category" data-aos="fade-up">
          <div>
            <h3>Blogs by Category</h3>
            <ul className="creative-dots">
              <li className="big-dot"></li>
              <li className="semi-big-dot"></li>
              <li className="medium-dot"></li>
              <li className="semi-medium-dot"></li>
              <li className="semi-small-dot"></li>
              <li className="small-dot"></li>
            </ul>
          </div>
          <div className="blogs-category">
            <table>
              <thead>
                <tr>
                  <td>Topics</td>
                  <td>Data</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Web Development</td>
                  <td>{findCatgTotal("Web Development")}</td>
                </tr>
                <tr>
                  <td>Programming</td>
                  <td>{findCatgTotal("Programming")}</td>
                </tr>
                <tr>
                  <td>Technology</td>
                  <td>{findCatgTotal("Technology")}</td>
                </tr>
                <tr>
                  <td>Health</td>
                  <td>{findCatgTotal("Health")}</td>
                </tr>
                <tr>
                  <td>Finance</td>
                  <td>{findCatgTotal("Finance")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
