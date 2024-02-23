import Header from "src/components/Header/Header.tsx";
import Stripe from "src/components/Stripe/Stripe.tsx";

const Payment = () => {
  return (
    <>
      <Header />
      <div>Payment</div>
      <Stripe publicKey={import.meta.env.VITE_STRIPE_PUBLIC_KEY} />
    </>
  );
};

export default Payment;
