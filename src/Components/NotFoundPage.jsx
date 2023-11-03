import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NotFoundPage() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  if (pathname === "*") {
    navigate("/", { replace: true });
  }
  return (
    <div>
      <h1>Page not found</h1>
    </div>
  );
}

export default NotFoundPage;
