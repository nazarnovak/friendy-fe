import { useEffect } from 'react';

import Header from "src/components/Header/Header.tsx";

import { BE_URL } from "src/consts.tsx";

const Event = () => {
  useEffect(() => {
    fetch(BE_URL + "/track", {
          method: "POST",
          //credentials: "include",
         body: JSON.stringify({event: 3})
        }, ).then((response) => response.text())
        .then(body => console.log(body)) // you can use response body here
  }, []);

  return (
    <>
      <Header />
      <div>Sending MixPanel event on page load</div>
    </>
  );
};

export default Event;
