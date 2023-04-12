import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // This removes the query parameters after Stripe redirect
  // I can still capture the query params if I need to, but the user doesn't need that
  // Now I have:
  // payment_intent=pi_3Mw3acHbbDaXSUVR1q31SrQu
  // &payment_intent_client_secret=pi_3Mw3acHbbDaXSUVR1q31SrQu_secret_6h0X5CxePALCDRkhe1XNtqjqx
  // &redirect_status=succeeded
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    // Could make it an infinite loop, hopefully not :|
    if (queryParams.toString() !== "") {
      navigate("/profile");
    }
  }, [navigate, location.search]);

  const handleNextClick = () => {
    navigate("/your-values");
  };

  return (
    <div>
      <h1>Profile</h1>
      {/* <div>
        This will have the explanation on: - thanking them for their interest -
        explaning that the payment will not be taken from them, it's their
        interest that matters - what will happen next with trying to understand
        them and their needs, to truly find the right person
      </div> */}
      <button onClick={handleNextClick}>Next</button>
    </div>
  );
};
