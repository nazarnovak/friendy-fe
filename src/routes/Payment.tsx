import Stripe from "src/components/Stripe/Stripe.tsx";

const Payment = () => {
  return (
    <>
      <div>Payment</div>
      <Stripe publicKey={import.meta.env.VITE_STRIPE_PUBLIC_KEY} />
    </>
  );
};

export default Payment;
