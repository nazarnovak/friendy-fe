import { Stripe } from "./Stripe";

export const Payment = () => {
  return (
    <div>
      <h1>Payment</h1>
      <Stripe />
      {/* How to name this better? I want the user to know what's the next step,
          and excite them about "Make a friend", but I don't want to fool them. 
          Because if I keep saying "make a friend", and there's another screen with
          a profile to fill, etc, it might be discouraging
          Maybe worth adding a status bar at the top with progress to be more 
          transparent? */}
    </div>
  );
};
