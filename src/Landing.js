import React, { useEffect, useState } from "react";
import { sendTracking } from "./utils";

export const Landing = () => {
  const [email, setEmail] = useState("");
  //   const [ws, setWs] = useState(null);

  useEffect(() => {
    sendTracking(1);
  }, []);

  const handleCTAClick = async () => {
    window.location.href = "/sign-up";

    console.log("Got email:", email);

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
