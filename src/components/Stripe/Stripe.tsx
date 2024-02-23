import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import PaymentUI from './PaymentUI.tsx';

import { BE_URL } from "src/consts.tsx";

interface Props {
  publicKey: string;
}

const Stripe: React.FC<Props> = ({ publicKey }) => {
  if (!publicKey) {
    throw new Error("Stripe public key is missing");
  }
  const stripePromise = loadStripe(publicKey);

  const location = useLocation();
  const navigate = useNavigate();

  const [paymentIntent, setPaymentIntent] = useState("");
  const [paymentInProcess, setPaymentInProcess] = useState(false);

  const stripeOptions = {
    // passing the client secret obtained from the server
    clientSecret: paymentIntent,
  };

  useEffect(() => {
      const queryParams = new URLSearchParams(location.search);

      // When payment is done - it redirects and has things like, which I'm not sure I need for now
      // payment_intent is important to save or something, unless it's different than the one coming from BE
      // payment_intent=pi_3Mw3acHbbDaXSUVR1q31SrQu
      // &payment_intent_client_secret=pi_3Mw3acHbbDaXSUVR1q31SrQu_secret_6h0X5CxePALCDRkhe1XNtqjqx
      // &redirect_status=succeeded
      if (queryParams.toString() !== "") {
        if (queryParams.get("payment_intent")) {
          navigate("/pay");
        }
      }
    }, [navigate, location.search]);

  useEffect(() => {
    const getStripePaymentIntent = async () => {
      const url = BE_URL + "/payment";

      fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!json || !json.paymentIntent) {
          console.log(
            "Missing body or paymentIntent field when fetching Stripe client secret. Response:",
            json
          );
          return;
        }

        setPaymentIntent(json.paymentIntent);
      })
      .catch((err) =>
        console.log("Failed fetching Stripe payment intent", err)
      );
    };

    getStripePaymentIntent();
  }, []);

  if (!paymentIntent) {
    return <div>Loading elements...</div>;
  }

  return (
  <>
    {paymentInProcess && <div>Processing payment...</div>}
    <Elements stripe={stripePromise} options={stripeOptions}>
      <PaymentUI setPaymentInProcess={setPaymentInProcess} />
    </Elements>
  </>);
};

export default Stripe;
