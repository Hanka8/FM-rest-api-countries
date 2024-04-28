import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

interface DarkmodeBtnProps {
    darkmode: boolean;
    toggleDarkmode: () => void;
}

function DarkmodeBtn({darkmode,toggleDarkmode}: DarkmodeBtnProps): JSX.Element {
    return (
        <button onClick={() => toggleDarkmode()}>
            {darkmode ? 
                <><MdOutlineDarkMode /> Dark mode</> : 
                <><MdOutlineLightMode /> Light mode</>
                }
        </button>
    )
}

export default DarkmodeBtn;