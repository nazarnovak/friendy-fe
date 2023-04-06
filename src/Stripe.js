import { loadStripe } from "@stripe/stripe-js";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

// // Test
// const publicKey =
//   "pk_test_51MoTPZHbbDaXSUVRdOICX0kGZr14MGxj4DYIDvSQnRmwUv7N2G42pHHVQWU2PWvrthkwYS8RJnZZH0Vhw2K3rcST00c9sxuq8F";

// Live
const publicKey =
  "pk_test_51MoTPZHbbDaXSUVRdOICX0kGZr14MGxj4DYIDvSQnRmwUv7N2G42pHHVQWU2PWvrthkwYS8RJnZZH0Vhw2K3rcST00c9sxuq8F";

// For now I just generated it with curl, needs to be on the BE tho per every transaction:
// (-u accepts the secret key, saved in stripe_secret_key locally, but not pushed,
// or sk_ value from the API keys on the Stripe website)
// curl https://api.stripe.com/v1/payment_intents -d amount=100 -d currency=eur -d "payment_method_types[]"=card -u <sk_> -d "capture_method"=manual
const clientSecret =
  "pi_3MtpQiHbbDaXSUVR0qKVW7u9_secret_y88lka8Av1ZXWvv7alhaCv4IA";

export const stripePromise = loadStripe(publicKey);

export const stripeOptions = {
  // passing the client secret obtained from the server
  clientSecret: clientSecret,
};

export const Stripe: React.Component = () => {
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
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://friendy.me/profile",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe}> Pay </button>
    </form>
  );
};
