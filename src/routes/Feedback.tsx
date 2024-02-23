import { useState } from "react";

import Header from "src/components/Header/Header.tsx";

import FeedbackModal from "src/components/FeedbackModal/FeedbackModal.tsx";

const Feedback = () => {
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  const handleFeedbackClick = () => {
    setFeedbackModalOpen(true);
  }

  return (
    <>
      <FeedbackModal open={feedbackModalOpen} onClose={() => setFeedbackModalOpen(false)} />
      <Header />
      <button onClick={handleFeedbackClick}>Feedback</button>
    </>
  );
};

export default Feedback;
