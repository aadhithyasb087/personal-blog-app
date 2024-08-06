import React from "react";
import { Link } from 'react-router-dom';


function ErrorPage() {
  return (
    <div className="error">
      <h1>Oops! 404 Error</h1>
      <p>The page doesn't exists</p>
      <Link to="/">
        <button>Go to Login Page</button>
      </Link>
    </div>
  );
}

export default ErrorPage;
