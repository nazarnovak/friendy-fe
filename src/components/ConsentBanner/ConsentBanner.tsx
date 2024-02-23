import { useEffect, useState } from "react";

import "./ConsentBanner.css";

const CONSENT_COOKIE_NAME = "consent";
const CONSENT_EXPIRY_DAYS = 180;

const ConsentBanner = () => {
  const [consentGiven, setConsentGiven] = useState(false);

  const setCookie = (name: string, value: boolean, daysToLive: number) => {
    let cookie = name + "=" + encodeURIComponent(value);
    if (typeof daysToLive === "number") {
      cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
      document.cookie = cookie;
    }
  };

  const getCookie = (name: string) => {
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return cookiePair[1];
      }
    }

    return null;
  };

  useEffect(() => {
    const existingConsent = getCookie(CONSENT_COOKIE_NAME);
    if (existingConsent) {
      setConsentGiven(true);
    }
  }, []);

  const onConsentAgree = () => {
    setCookie(CONSENT_COOKIE_NAME, true, CONSENT_EXPIRY_DAYS);
    setConsentGiven(true);
  };

  if (consentGiven) {
    return null;
  }

  return (
    <div id="consent-wrapper">
      <div id="consent-text">
        We use cookies to store your X, Y, and Z
      </div>
      <div id="consent-agree-wrapper">
        <button id="consent-agree" onClick={onConsentAgree}>
          I understand
        </button>
      </div>
    </div>
  );
};

export default ConsentBanner;