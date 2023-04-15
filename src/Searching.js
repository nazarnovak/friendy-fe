import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sendTracking } from "./utils";

export const Searching = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendTracking(9);
  }, []);

  const handleNextClick = () => {
    navigate("/chat");
  };

  return (
    <div>
      <h1>Searching</h1>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
