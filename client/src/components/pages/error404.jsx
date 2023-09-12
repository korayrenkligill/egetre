import React, { useEffect } from "react";
import error from "../../images/error.png";
import "../../styles/pages/error404.css";
function ErrorPage() {
  useEffect(() => {
    document.title = "Egetre : 404 Page";
  }, []);
  return (
    <div className="error">
      <img src={error} alt="" />
    </div>
  );
}

export default ErrorPage;
