import "./App.css";
import { Link, Route, Routes, BrowserRouter } from "react-router-dom";

// import { Mixpanel } from './Mixpanel.js';
// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise, stripeOptions } from "./Stripe";

import { Header } from "./Header";
import { Landing } from "./Landing";

const App = () => {
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
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/" element={<Landing />} />
          </Routes>
        </Elements>
      </BrowserRouter>
    </div>
  );
};

const You = () => {
  //    Mixpanel.identify(1);

  //    Mixpanel.track('Opened the page');

  //    const onClickedRadio = () => {
  //        Mixpanel.track('Pressed radiobutton');
  //    };

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
    </div>
  );
};

const SignIn = () => {
  return (
    <div>
      <h1>Sign in</h1>
      <input
        name="email"
        type="text"
        placeholder="prefilled.email@from.previous.page"
      />
      <input name="password" type="password" />
      <div>
        New to Friendy? <a href="/sign-up">Sign up now</a>
      </div>
    </div>
  );
};

// TODO: Pass email here from Landing somehow. Maybe split code, cus hard to see
// anything here already
const SignUp = () => {
  return (
    <div>
      <h1>Create a password</h1>
      <h2>
        An account helps you keep conversations going and use the platform any
        time from any device. It will be worth it :)
      </h2>
      <input
        name="email"
        type="text"
        placeholder="prefilled.email@from.previous.page"
      />
      <input name="password" type="password" />
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
