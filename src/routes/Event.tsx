import { useEffect, useState } from "react";

import Header from "src/components/Header/Header.tsx";
import FeedbackModal from "src/components/FeedbackModal/FeedbackModal";

import { BE_URL } from "src/consts.tsx";

const Event = () => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  useEffect(() => {
    fetch(BE_URL + "/track", {
      method: "POST",
      //credentials: "include",
      body: JSON.stringify({ event: 3 }),
    })
      .then((response) => response.text())
      .then((body) => console.log(body)); // you can use response body here
  }, []);

  return (
    <>
      <FeedbackModal
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />

      <Header openFeedbackModal={() => setFeedbackModalOpen(true)} />
      <div>Sending MixPanel event on page load</div>
    </>
  );
};

export default Event;
