import './App.css';
import React, { useState } from 'react';
// import { Mixpanel } from './Mixpanel.js';

import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';

// import videoFile from './1920restaurant.mp4';

const App = () => {
  let statusText = 'Make a friend';
//  if (window.location.pathname == 'you') {
//    statusText = 'Your values';
//  }

  return (
    <div className="App">
        <Header />
        <Status text={statusText} />
        <BrowserRouter>
            <Routes>
                <Route exact path="/you" element={<You />} />
                <Route exact path="/friends" element={<Friends />} />
                <Route exact path="/search" element={<Search />} />
                <Route exact path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
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
  }

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

const ContactUsButton = ({handleClick}) => {
    return (
        <button id="contact-us" onClick={handleClick}>Contact us</button>
    );
};

const ContactUsModal = ({isOpen, closeModal}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div id="contact-us-modal" onClick={closeModal}></div>
  );
}

const Status = ({text}) => {
    return (
        <div id="status">
            {text}
        </div>
    );
};

const Landing = () => {
  const handleCTAClick = async () => {
    // In prod this is /api/test
    let url = 'https://friendy-fe-kkrep.ondigitalocean.app/api/test';

    if (process.env.REACT_APP_STAGE === 'dev') {
      url = 'http://localhost:8080/api/test';
    }

    let params = {
      Msg: 'hehehe',
    };

    console.log('URL:', url);
    let json;
    try {
      let response = await fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include',
        body: JSON.stringify(params)
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
  }

  const onWSClose = () => {
    console.log("WebSocket connection closed");
  }

  const onWSMessage = () => {
    return (e) => {
      console.log("WebSocket message received:", e);
    }
  }

  const connectToWs = async () => {
      // Connect to WS
      let ws;
      let wsUrl = 'wss://friendy.me/api/ws';

      if (process.env.REACT_APP_STAGE === 'dev') {
        wsUrl = 'ws://localhost:8080/wss';
      }

      console.log(process.env.REACT_APP_STAGE);
      console.log(wsUrl);

      try {
        ws = await new WebSocket(wsUrl);
        if (ws === undefined) {
          throw new Error("Could not connect to ws");
        }
      } catch (err) {
        console.log(err);
        return false;
      }

      ws.binaryType = "arraybuffer";

      ws.onopen = onWSOpen;
      ws.onclose = onWSClose;
      ws.onmessage = onWSMessage();

      setTimeout(function() {
        ws.send("TESTERING HERE");
      }, 3000);
      return true;
    }

    connectToWs();

// TODO: Is this (video) cool or what!?
//      <video id="video" autoPlay loop muted>
//          <source src={videoFile} type='video/mp4' />
//      </video>

  return (
    <div id="content">
      <h1>Find likedminded people. Talk about what's important to you. Make lifelong friends</h1>
      <div>
        Are you tired of how hard it is to find quality friends online? Do you feel like you
      don’t know where to search for them? Maybe you find people that seem cool, but eventually
      you lose interest or get ghosted?
      </div>

      <div id="how-does-it-work">
      <h1>
        How does it work
      </h1>
      <div className="showcase-screenshot"></div>
      <div className="body-bold">1. Tell us about yourself</div>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
      a galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting</div>

      <div className="showcase-screenshot"></div>
      <div className="body-bold">1. Tell us about yourself</div>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
      a galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting</div>

      <div className="showcase-screenshot"></div>
      <div className="body-bold">1. Tell us about yourself</div>
      <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s, when an unknown printer took
      a galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting</div>
      </div>

      <div className="centered-content">
        <button id="cta" onClick={handleCTAClick}>Make a best friend</button>
      </div>
    </div>
  );
}

const You = () => {
//    Mixpanel.identify(1);

//    Mixpanel.track('Opened the page');

//    const onClickedRadio = () => {
//        Mixpanel.track('Pressed radiobutton');
//    };
    const DOFunctionTest = (e) => {
        e.preventDefault();
        // curl "https://do-go-test-5b2nm.ondigitalocean.app/sample/hello?browser=safari"
         fetch('https://do-go-test-5b2nm.ondigitalocean.app/sample/hello?browser=localhost')
                .then(response => console.log(response));
    };

    return (
        <div id="content">
            <p>You</p>
            <p>Scenario 1</p>
            <div>
              <input type="radio" id="scenario11" name="scenario1" value="1" /*onClick={onClickedRadio}*/ />
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
            <a href="#" onClick={DOFunctionTest}>DigitalOcean func test</a>
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
