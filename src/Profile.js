import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sendTracking } from "./utils";

export const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendTracking(6);
  }, []);

  const handleNextClick = () => {
    navigate("/your-values");
  };

  return (
    <div>
      <h1>Profile</h1>

      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
