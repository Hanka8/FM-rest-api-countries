import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

function BackBtn(): JSX.Element {
  return (
    <Link to="/">
    <button className="back-btn">
        <IoIosArrowRoundBack size={32} />
        Back
    </button>
    </Link>
  );
}

export default BackBtn;