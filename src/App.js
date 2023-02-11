import './App.css';
import React, { useState } from 'react';
import { Mixpanel } from './Mixpanel.js';

import { Link, Route, Routes, BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
        <Header />
        <Status />
        <BrowserRouter>
            <Routes>
                <Route exact path="/you" element={<You />} />
                <Route exact path="/friends" element={<Friends />} />
                <Route exact path="/search" element={<Search />} />
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
        <div id="logo">friendy.me</div>
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

const Status = () => {
    return (
        <div id="status">
            Your values
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
