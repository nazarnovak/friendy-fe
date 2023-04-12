import { useNavigate } from "react-router-dom";

export const Searching = () => {
  const navigate = useNavigate();

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
