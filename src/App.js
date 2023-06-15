import { useEffect, useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
    <>
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
    </>
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
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    sendTracking(2);
    console.log(location.state);
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const emailChange = (e) => {
    setEmail(e.target.value);
  };

  const passChange = (e) => {
    setPass(e.target.value);
  };

  const handleSignUp = () => {
    let url = "https://friendy-fe-kkrep.ondigitalocean.app/api/sign-up";

    if (process.env.REACT_APP_STAGE === "dev") {
      url = "http://localhost:8080/sign-up";
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log("Something went wrong with signing up");
        }
      })
      .catch((err) => console.log(err));

    navigate("/payment");
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
        placeholder="email"
        value={email}
        onChange={emailChange}
        readOnly={location.state && location.state.email ? true : false}
      />
      <input
        name="password"
        type="password"
        value={pass}
        onChange={passChange}
      />
      <button onClick={handleSignUp}>Next</button>
    </div>
  );
};

export default App;
