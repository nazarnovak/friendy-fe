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
      </div>
    </>
  );
};

const CTA = ({ HandleCTAClick }) => {
  return (
    <>
      <p className="top-margin-double">
        Tell us about who you are and what you need in a friend, and we’ll find
        a person for you to chat with and be happy Enter your email below to
        start your journey now
      </p>
      <button id="cta" className="top-margin-double" onClick={HandleCTAClick}>
        Find connection
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="Hawkins-Icon Hawkins-Icon-Standard"
          data-name="ChevronRight"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.29297 19.2928L14.5859 12L7.29297 4.70706L8.70718 3.29285L16.7072 11.2928C16.8947 11.4804 17.0001 11.7347 17.0001 12C17.0001 12.2652 16.8947 12.5195 16.7072 12.7071L8.70718 20.7071L7.29297 19.2928Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </>
  );
};
