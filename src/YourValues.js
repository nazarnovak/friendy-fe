import { useNavigate } from "react-router-dom";

export const YourValues = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/friend-values");
  };

  return (
    <div>
      <h1>Your values</h1>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
