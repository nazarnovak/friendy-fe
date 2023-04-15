import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { sendTracking } from "./utils";

export const Stripe: React.Component = ({ setPaymentInProcess }) => {
  // Stripe
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
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
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://friendy.me/welcome",
      },
    });

    sendTracking(4);

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setPaymentInProcess(false);
      console.log(result.error.message);
    } else {
      setPaymentInProcess(false);
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}> Pay </button>
      </form>
    </div>
  );
};
