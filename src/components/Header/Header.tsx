import "./Header.css";

interface Props {
  openFeedbackModal: () => void;
}

const Header = (props: Props) => {
  return (
    <header>
      <div></div>
      <div id="logo">friendy.app</div>
      <div id="buttons">
        <button id="feedback" onClick={props.openFeedbackModal}>
          Feedback
        </button>
      </div>
    </header>
  );
};

export default Header;
