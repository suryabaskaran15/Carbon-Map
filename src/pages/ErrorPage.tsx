import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="error-page">
      <div className="error-content">
        <h1>Oops! Something Went Wrong</h1>
        <p>We're sorry, but an unexpected error occurred. Please try again later.</p>
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    </div>
  );
};

export default ErrorPage;