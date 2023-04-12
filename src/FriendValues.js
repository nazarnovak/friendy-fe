import { useNavigate } from "react-router-dom";

export const FriendValues = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/searching");
  };

  return (
    <div>
      <h1>Friend values</h1>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
