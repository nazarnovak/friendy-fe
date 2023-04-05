import "./App.css";
import React, { useEffect, useState } from "react";
// import { Mixpanel } from './Mixpanel.js';

import { Link, Route, Routes, BrowserRouter } from "react-router-dom";

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise, stripeOptions, Stripe } from "./Stripe";

const App = () => {
  let statusText = "Make a friend";
  //  if (window.location.pathname == 'you') {
  //    statusText = 'Your values';
  //  }

  // <Status text={statusText} />

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Elements stripe={stripePromise} options={stripeOptions}>
          <Routes>
            <Route exact path="/you" element={<You />} />
            <Route exact path="/friends" element={<Friends />} />
            <Route exact path="/search" element={<Search />} />

            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </Elements>
      </BrowserRouter>
    </div>
  );
};

const Header: React.Component = () => {
  return (
    <React.Fragment>
      <header id="header">
        <div id="logo">friendy</div>
        <SignInButton />
      </header>
    </React.Fragment>
  );
};

const SignInButton = () => {
  const handleClick = () => {
    window.location.href = "/sign-in";
  };

  return (
    <button id="sign-in" onClick={handleClick}>
      Sign in
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

const CTA = ({ setEmail, handleCTAClick }) => {
  return (
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
  );
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

  return (
    <div id="landing">
      <div id="content">
        <h1>Chat with your new best friend that</h1>
        <h1>supports you</h1>
        <div>
          Ready to find someone who understand you and makes you very happy?
          Enter your email to start your journey now
        </div>

        <CTA setEmail={setEmail} handleCTAClick={handleCTAClick} />
        <div id="how-does-it-work">
          <h1>How does it work</h1>
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
          <div className="showcase-screenshot"></div>
        </div>
        <CTA setEmail={setEmail} handleCTAClick={handleCTAClick} />
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

// TODO: Pass email here from Landing somehow. Maybe split code, cus hard to see
// anything here already
const SignUp = () => {
  return <div>Sign up</div>;
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
