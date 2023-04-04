import "./App.css";
import React, { useEffect, useState } from "react";
// import { Mixpanel } from './Mixpanel.js';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import { Link, Route, Routes, BrowserRouter } from "react-router-dom";

import videoFile from "./friends.mp4";

// // Test
// const publicKey =
//   "pk_test_51MoTPZHbbDaXSUVRdOICX0kGZr14MGxj4DYIDvSQnRmwUv7N2G42pHHVQWU2PWvrthkwYS8RJnZZH0Vhw2K3rcST00c9sxuq8F";

// Live
const publicKey =
  "pk_live_51MoTPZHbbDaXSUVRMJhsEjHVhGnsUGUcAXtZgF8GYpWZoVV37JXyKohVILnV2tnLnYvjlWjGKX4N5GWOzMH7TnH300aEBuf1di";

// For now I just generated it with curl, needs to be on the BE tho per every transaction:
// (-u accepts the secret key, saved in stripe_secret_key locally, but not pushed,
// or sk_ value from the API keys on the Stripe website)
// curl https://api.stripe.com/v1/payment_intents -d amount=100 -d currency=eur -d "payment_method_types[]"=card -u <sk_> -d "capture_method"=manual
const clientSecret =
  "pi_3Mt5YJHbbDaXSUVR0k9QgTHA_secret_UOctRccIAtNOPWx2LQ8pOqFki";

const stripePromise = loadStripe(publicKey);

const options = {
  // passing the client secret obtained from the server
  clientSecret: clientSecret,
};

const App = () => {
  let statusText = "Make a friend";
  //  if (window.location.pathname == 'you') {
  //    statusText = 'Your values';
  //  }

  // <Status text={statusText} />

  return (
    <div className="App">
      <Header />
      <Elements stripe={stripePromise} options={options}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/you" element={<You />} />
            <Route exact path="/friends" element={<Friends />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </BrowserRouter>
      </Elements>
    </div>
  );
};

const Header: React.Component = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalWindow = () => {
    setModalOpen(true);
  };

  const closeModalWindow = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <header id="header">
        <div id="logo">friendy</div>
        <ContactUsButton handleClick={openModalWindow} />
        <ContactUsModal isOpen={modalOpen} closeModal={closeModalWindow} />
      </header>
    </React.Fragment>
  );
};

const ContactUsButton = ({ handleClick }) => {
  return (
    <button id="contact-us" onClick={handleClick}>
      Contact us
    </button>
  );
};

const ContactUsModal = ({ isOpen, closeModal }) => {
  if (!isOpen) {
    return null;
  }

  return <div id="contact-us-modal" onClick={closeModal}></div>;
};

const Status = ({ text }) => {
  return <div id="status">{text}</div>;
};

const Landing = () => {
  const [email, setEmail] = useState("");
  const [ws, setWs] = useState(null);

  const handleCTAClick = async () => {
    // WS TEST WOOP
    if (!ws) {
      console.log("WS IS NO SET YO");
      return;
    }
    ws.send(email);

    return;

    // In prod this is /api/test
    let url = "https://friendy-fe-kkrep.ondigitalocean.app/api/test";

    if (process.env.REACT_APP_STAGE === "dev") {
      url = "http://localhost:8080/api/test";
    }

    let params = {
      Msg: email,
    };

    let json;
    try {
      let response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: 'include',
        body: JSON.stringify(params),
      });

      json = await response.json();
    } catch (err) {
      console.log(err);
      return false;
    }

    console.log(json);
  };

  const onWSOpen = () => {
    console.log("WebSocket connection opened");
  };

  const onWSClose = () => {
    console.log("WebSocket connection closed");
  };

  const onWSMessage = () => {
    return (e) => {
      console.log("WebSocket message received:", e);
    };
  };

  const connectToWs = async () => {
    // Connect to WS
    let wsUrl = "wss://friendy.me/api/ws";

    //      if (process.env.REACT_APP_STAGE === 'dev') {
    //        wsUrl = 'ws://localhost:8080/wss';
    //      }

    try {
      let webSocket = await new WebSocket(wsUrl);
      if (ws === undefined) {
        throw new Error("Could not connect to ws");
      }

      webSocket.binaryType = "arraybuffer";
      webSocket.onopen = onWSOpen;
      webSocket.onclose = onWSClose;
      webSocket.onmessage = onWSMessage();

      setWs(webSocket);
    } catch (err) {
      console.log(err);
      return false;
    }

    //      setTimeout(function() {
    //        ws.send("TESTERING HERE");
    //      }, 3000);
    return true;
  };

  useEffect(() => {
    connectToWs();
  }, []);

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
        return_url: "https://google.com/?q=hehe",
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

  // TODO: Is this (video) cool or what!?
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button disabled={!stripe}> Pay </button>
      </form>
      <div id="video-tint">
        <video id="video" autoPlay loop muted>
          <source src={videoFile} type="video/mp4" />
        </video>
      </div>
      <div id="content">
        <h1>
          Find likedminded people. Talk about what's important to you. Make
          lifelong friends
        </h1>
        <div>
          Are you tired of how hard it is to find quality friends online? Do you
          feel like you don’t know where to search for them? Maybe you find
          people that seem cool, but eventually you lose interest or get
          ghosted?
        </div>

        <div id="how-does-it-work">
          <h1>How does it work</h1>
          <div className="showcase-screenshot"></div>
          <div className="body-bold">1. Tell us about yourself</div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting
          </div>

          <div className="showcase-screenshot"></div>
          <div className="body-bold">1. Tell us about yourself</div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting
          </div>

          <div className="showcase-screenshot"></div>
          <div className="body-bold">1. Tell us about yourself</div>
          <div>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting
          </div>
        </div>

        <div className="centered-content">
          <input
            id="email"
            name="email"
            style={{ color: "black" }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button id="cta" onClick={handleCTAClick}>
            Make a best friend
          </button>
        </div>
      </div>
    </div>
  );
};

const You = () => {
  //    Mixpanel.identify(1);

  //    Mixpanel.track('Opened the page');

  //    const onClickedRadio = () => {
  //        Mixpanel.track('Pressed radiobutton');
  //    };
  const DOFunctionTest = (e) => {
    e.preventDefault();
    // curl "https://do-go-test-5b2nm.ondigitalocean.app/sample/hello?browser=safari"
    fetch(
      "https://do-go-test-5b2nm.ondigitalocean.app/sample/hello?browser=localhost"
    ).then((response) => console.log(response));
  };

  return (
    <div id="content">
      <p>You</p>
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
      <Link to={"/friends"}>Next page</Link>
      <br />
      <a href="#" onClick={DOFunctionTest}>
        DigitalOcean func test
      </a>
    </div>
  );
};

const Friends = () => {
  return (
    <div id="content">
      <p>Friends</p>
      <p>Friend question 1</p>
      <div>
        <input type="radio" id="scenario11" name="scenario1" value="1" />
        <label for="scenario11">1</label>
      </div>
      <div>
        <input type="radio" id="scenario12" name="scenario1" value="1" />
        <label for="scenario12">2</label>
      </div>
      <p>Friend question 2</p>
      <div>
        <input type="radio" id="scenario21" name="scenario2" value="1" />
        <label for="scenario21">1</label>
      </div>
      <div>
        <input type="radio" id="scenario22" name="scenario2" value="1" />
        <label for="scenario22">2</label>
      </div>
      <Link to={"/search"}>Next page</Link>
    </div>
  );
};

const Search = () => {
  return (
    <div id="content">
      <p>Search</p>
      <p>Search stuff 1</p>
      <div>
        <input type="radio" id="scenario11" name="scenario1" value="1" />
        <label for="scenario11">1</label>
      </div>
      <div>
        <input type="radio" id="scenario12" name="scenario1" value="1" />
        <label for="scenario12">2</label>
      </div>
      <p>Search stuff 1</p>
      <div>
        <input type="radio" id="scenario21" name="scenario2" value="1" />
        <label for="scenario21">1</label>
      </div>
      <div>
        <input type="radio" id="scenario22" name="scenario2" value="1" />
        <label for="scenario22">2</label>
      </div>
    </div>
  );
};

export default App;
