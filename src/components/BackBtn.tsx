import { IoIosArrowRoundBack } from "react-icons/io";

function BackBtn(): JSX.Element {
  return (
    <button className="back-btn" onClick={() => window.history.back()}>
        <IoIosArrowRoundBack size={32} />
        Back
    </button>
  );
}

export default BackBtn;