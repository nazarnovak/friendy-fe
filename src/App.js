import { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

import { sendTracking } from "./utils";

import { Header } from "./Header";
import { Landing } from "./Landing";

import { Payment } from "./Payment";

import { Welcome } from "./Welcome";
import { Profile } from "./Profile";
import { YourValues } from "./YourValues";
import { FriendValues } from "./FriendValues";

import { Searching } from "./Searching";
import { Chat } from "./Chat";

const App = () => {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route exact path="/sign-in" element={<SignIn />} />

          {/* Marketing flow */}
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/sign-up" element={<SignUp />} />
          <Route exact path="/payment" element={<Payment />} />

          {/* Product flow */}
          <Route exact path="/welcome" element={<Welcome />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/your-values" element={<YourValues />} />
          <Route exact path="/friend-values" element={<FriendValues />} />
          <Route exact path="/searching" element={<Searching />} />
          <Route exact path="/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const NotFound = () => {
  return <h1>Not found! :(</h1>;
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
  useEffect(() => {
    sendTracking(2);
  }, []);

  const toPayment = () => {
    window.location.href = "/payment";
  };

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
      <input name="collaborate" type="checkbox" />
      <label htmlFor="collaborate">
        I want to work together with the founder to improve the platform
      </label>
      <button onClick={toPayment}>Next</button>
    </div>
  );
};

export default App;
