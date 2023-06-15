import React from "react";

export const Header: React.Component = () => {
  return (
    <React.Fragment>
      <header>
        <div id="logo">friendy</div>
        {/* <SignInButton /> */}
        <ContactUsButton />
      </header>
    </React.Fragment>
  );
};

// const SignInButton = () => {
//   const handleClick = () => {
//     window.location.href = "/sign-in";
//   };

//   return (
//     <button id="sign-in" onClick={handleClick}>
//       Sign in
//     </button>
//   );
// };

const ContactUsButton = () => {
  const handleClick = () => {
    window.location.href = "/contact-us";
  };

  return (
    <button class="menu-button" onClick={handleClick}>
      Contact us
    </button>
  );
};

// const ContactUsModal = ({ isOpen, closeModal }) => {
//   if (!isOpen) {
//     return null;
//   }

//   return <div id="contact-us-modal" onClick={closeModal}></div>;
// };

// const Status = ({ text }) => {
//   return <div id="status">{text}</div>;
// };

// let statusText = "Make a friend";
//  if (window.location.pathname == 'you') {
//    statusText = 'Your values';
//  }

// <Status text={statusText} />
