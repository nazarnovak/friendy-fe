import { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Stripe } from "./Stripe";
import { Elements } from "@stripe/react-stripe-js";

import { sendTracking } from "./utils";

// // Test
// const publicKey =
//   "pk_test_51MoTPZHbbDaXSUVRdOICX0kGZr14MGxj4DYIDvSQnRmwUv7N2G42pHHVQWU2PWvrthkwYS8RJnZZH0Vhw2K3rcST00c9sxuq8F";

// Live
const publicKey =
  "pk_live_51MoTPZHbbDaXSUVRO84iMNIWHdvwCXROhvHKNZZijrVsBkEBv8Ywh20q52IlWVjJvKgirs57Xa0H8CGJuj3kLHzE001s7pFs6d";

const stripePromise = loadStripe(publicKey);

export const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentInProcess, setPaymentInProcess] = useState(false);

  let stripeOptions;

  stripeOptions = {
    // passing the client secret obtained from the server
    clientSecret: clientSecret,
  };

  useEffect(() => {
    sendTracking(3);

    const getStripeClientSecret = async () => {
      let url = "https://friendy-fe-kkrep.ondigitalocean.app/api/stripe";

      if (process.env.REACT_APP_STAGE === "dev") {
        url = "http://localhost:8080/stripe";
      }

      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!json || !json.clientSecret) {
            console.log(
              "Missing body or clientSecret field when fetching Stripe client secret. Response: ",
              json
            );
            return;
          }

          setClientSecret(json.clientSecret);
        })
        .catch((err) =>
          console.log("Failed fetching Stripe client secret", err)
        );
    };

    getStripeClientSecret();
  }, []);

  return (
    <div>
      <h1>Payment</h1>
      {!clientSecret && "Loading elements..."}
      {paymentInProcess && "Payment in process..."}
      {clientSecret && (
        <Elements stripe={stripePromise} options={stripeOptions}>
          <Stripe setPaymentInProcess={setPaymentInProcess} />
        </Elements>
      )}
      {/* How to name this better? I want the user to know what's the next step,
          and excite them about "Make a friend", but I don't want to fool them. 
          Because if I keep saying "make a friend", and there's another screen with
          a profile to fill, etc, it might be discouraging
          Maybe worth adding a status bar at the top with progress to be more 
          transparent? */}
    </div>
  );
};
