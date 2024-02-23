import React from "react";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { SITE_URL } from "src/consts.tsx";

interface Props {
  setPaymentInProcess: (paymentInProcess: boolean) => void;
}

const PaymentUI: React.FC<Props> = ({ setPaymentInProcess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("Stripe or elements not loaded, please contact support");
      return;
    }

    setPaymentInProcess(true);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: SITE_URL + "/pay",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setPaymentInProcess(false);
      console.log(result.error.message);
    } else {
      setPaymentInProcess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>$1</div>
        <PaymentElement />
        <button disabled={!stripe}>Pay</button>
      </form>
    </div>
  );
};

export default PaymentUI;