import { useEffect, useState } from "react";

import "./FeedbackModal.css";

import { default as svgX } from 'src/assets/x.svg';
import { default as svgGreenTick } from 'src/assets/green-tick.svg';

import { BE_URL } from "src/consts.tsx";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const FeedbackModal: React.FC<Props> = (props) => {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    if (!props.open) {
        return;
    }

    setTopic("");
    setEmail("");
    setMessage("");
    setLoading(false);
    setFeedbackSent(false);

    document.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === "Escape") { props.onClose(); }});
  }, [props]);

  if (!props.open) {
      return null;
  }

  const handleSend = () => {
    if (!topic || !email || !message) {
      console.log("Please fill in all the input fields before sending feedback");
      return;
    }

    setLoading(true);

    fetch(BE_URL + "/feedback", {
      method: "POST",
//       credentials: "include",
      body: JSON.stringify({ email, topic, message }),
    })
    .then((response) => {
      if (!response.ok) {
        console.log("Something went wrong when submitting contact us");
        return;
      }

      setFeedbackSent(true);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  // Hack stop the scroll in the background
  document.body.style.overflow = "hidden";

  return (
    <div className="backdrop" onClick={props.onClose}>
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-header">
          <div className="modal-header-side"></div>
          <div className="modal-header-title">Feedback</div>
          <div className="modal-header-side">
            <img src={svgX} id="modal-x" alt="Close" onClick={props.onClose} />
          </div>
        </div>
        {feedbackSent && <div className="modal-body success-body">
            <img src={svgGreenTick} id="tick" alt="Success" />Thank you for taking your time and sharing your feedback
          </div>
        }
        {!feedbackSent &&
          <div className="modal-body">
            Your opinion is very important to us, and helps us get better
            <label className="input-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="hello@friendy.me"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setEmail(target.value);
              }}
              disabled={loading ? true : false}
            />

            <label className="input-label">Topic</label>
            <select
              name="topic"
              id="topic"
              onChange={(e) => {
                const target = e.target as HTMLSelectElement;
                setTopic(target.value);
              }}
              disabled={loading ? true : false}
              defaultValue=""
            >
              <option value="" disabled hidden>Choose your topic</option>
              <option value="ideas">Ideas</option>
              <option value="technical-difficulty">Technical difficulties</option>
              <option value="question">Question</option>
              <option value="payment">Payment</option>
              <option value="other">Other</option>
            </select>

            <label className="input-label" htmlFor="contact-message">Tell us what you think</label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder="Please share anything that's on your mind"
              maxLength={5000}
              onChange={(e) => {
                const target = e.target as HTMLTextAreaElement;
                setMessage(target.value);
              }}
              disabled={loading ? true : false}
            ></textarea>
          </div>
        }

        {feedbackSent && <button id="close" className="modal-footer" onClick={props.onClose}>Close</button>}
        {!feedbackSent &&
        <button
          id="send"
          className="modal-footer"
          disabled={!topic || !email || !message || loading ? true : false}
          onClick={() => {
            handleSend();
          }}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        }
      </div>
    </div>
  );
}

export default FeedbackModal;