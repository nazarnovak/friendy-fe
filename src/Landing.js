import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { sendTracking } from "./utils";

export const Landing = () => {
  const navigate = useNavigate();

  //   const [email, setEmail] = useState("");
  //   const [ws, setWs] = useState(null);

  useEffect(() => {
    sendTracking(1);
  }, []);

  const HandleCTAClick = async () => {
    //     navigate("/sign-up", { state: { email } });
    navigate("/your-values");

    // WS TEST WOOP
    //     if (!ws) {
    //       console.log("WS IS NO SET YO");
    //       return;
    //     }
    //     ws.send(email);

    // In prod this is /api/test
    //     let url = "https://friendy-fe-kkrep.ondigitalocean.app/api/test";

    //     if (process.env.REACT_APP_STAGE === "dev") {
    //       url = "http://localhost:8080/api/test";
    //     }

    //     let params = {
    //       Msg: email,
    //     };

    //     let json;
    //     try {
    //       let response = await fetch(url, {
    //         method: "post",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         // credentials: 'include',
    //         body: JSON.stringify(params),
    //       });

    //       json = await response.json();
    //     } catch (err) {
    //       console.log(err);
    //       return false;
    //     }

    //     console.log(json);
  };

  // More WS stuff
  //   const onWSOpen = () => {
  //     console.log("WebSocket connection opened");
  //   };

  //   const onWSClose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   const onWSMessage = () => {
  //     return (e) => {
  //       console.log("WebSocket message received:", e);
  //     };
  //   };

  //   const connectToWs = async () => {
  //     // Connect to WS
  //     let wsUrl = "wss://friendy.me/api/ws";

  //     //      if (process.env.REACT_APP_STAGE === 'dev') {
  //     //        wsUrl = 'ws://localhost:8080/wss';
  //     //      }

  //     try {
  //       let webSocket = await new WebSocket(wsUrl);
  //       if (ws === undefined) {
  //         throw new Error("Could not connect to ws");
  //       }

  //       webSocket.binaryType = "arraybuffer";
  //       webSocket.onopen = onWSOpen;
  //       webSocket.onclose = onWSClose;
  //       webSocket.onmessage = onWSMessage();

  //       setWs(webSocket);
  //     } catch (err) {
  //       console.log(err);
  //       return false;
  //     }

  //      setTimeout(function() {
  //        ws.send("TESTERING HERE");
  //      }, 3000);
  //     return true;
  //   };

  //   useEffect(() => {
  //     connectToWs();
  //   }, []);

  return (
    <>
      <div id="landing-image-wrapper">
        <div id="landing-image-top-gradient"></div>
        <div id="landing-image-bottom-gradient"></div>
        <img src="/friends.jpg" alt="Friends smiling" id="landing-image" />
      </div>
      <div class="content">
        <h1>Feel understood</h1>
        <h1>Feel connected</h1>
        <h1>Feel happy</h1>
        <CTA HandleCTAClick={HandleCTAClick} />
        <div id="down-arrow" className="top-margin-six">
          Bottom arrow
        </div>
        <div className="top-margin-six">
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        </div>
        <div className="top-margin-six">
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        </div>
        <div className="top-margin-six">
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
          ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
          Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        </div>
      </div>
    </>
  );
};

const CTA = ({ HandleCTAClick }) => {
  return (
    <>
      <p id="cta-text" className="top-margin-six">
        Tell us about who you are and what you need in a friend, and we’ll find
        a person for you to chat with and be happy
      </p>
      <button id="cta" className="top-margin-triple" onClick={HandleCTAClick}>
        <span>Find connection</span>
        <img src="/arrow-right.svg" alt="Right arrow" />
      </button>
    </>
  );
};
