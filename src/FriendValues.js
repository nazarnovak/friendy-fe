import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sendTracking } from "./utils";

export const FriendValues = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendTracking(8);
  }, []);

  const handleNextClick = () => {
    navigate("/searching");
  };

  return (
    <div>
      <h1>Friend values</h1>
      <p>Friend question 1</p>
      <div>
        <input type="radio" id="scenario11" name="scenario1" value="1" />
        <label for="scenario11">1</label>
      </div>
      <div>
        <input type="radio" id="scenario12" name="scenario1" value="1" />
        <label for="scenario12">2</label>
      </div>
      <p>Friend question 2</p>
      <div>
        <input type="radio" id="scenario21" name="scenario2" value="1" />
        <label for="scenario21">1</label>
      </div>
      <div>
        <input type="radio" id="scenario22" name="scenario2" value="1" />
        <label for="scenario22">2</label>
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
