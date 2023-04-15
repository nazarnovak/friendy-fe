import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sendTracking } from "./utils";

export const YourValues = () => {
  const navigate = useNavigate();

  useEffect(() => {
    sendTracking(7);
  }, []);

  const handleNextClick = () => {
    navigate("/friend-values");
  };

  return (
    <div>
      <h1>Your values</h1>
      <p>Scenario 1</p>
      <div>
        <input
          type="radio"
          id="scenario11"
          name="scenario1"
          value="1" /*onClick={onClickedRadio}*/
        />
        <label htmlFor="scenario11">1</label>
      </div>
      <div>
        <input type="radio" id="scenario12" name="scenario1" value="1" />
        <label htmlFor="scenario12">2</label>
      </div>
      <p>Scenario 2</p>
      <div>
        <input type="radio" id="scenario21" name="scenario2" value="1" />
        <label htmlFor="scenario21">1</label>
      </div>
      <div>
        <input type="radio" id="scenario22" name="scenario2" value="1" />
        <label htmlFor="scenario22">2</label>
      </div>
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
