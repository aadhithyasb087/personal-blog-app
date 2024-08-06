import { Routes, Route } from "react-router-dom";
import MainSection from "./components//MainSection";
import Home from "./pages/Home";
import "./styles/globals.css";
import BlogCategory from "./components//BlogCategory";
import TagsPage from "./components/TagsPage";
import BlogsPage from "./components/BlogsPage";
import ErrorPage from "./components/ErrorPage";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<MainSection />} />
          <Route path="/category/:category" element={<BlogCategory />} />
          <Route path="/blog/:slug" element={<BlogsPage />} />
          <Route path="/tags/:tags" element={<TagsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
