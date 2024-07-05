import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../ThemeContext.tsx"

function Navbar (): JSX.Element {

    const { darkmode, toggleDarkmode } = useTheme();

    return (
        <nav className="navbar">
            <h1 className="navbar-h1">Where in the world?</h1>
            <button 
                className="navbar-btn"
                onClick={() => toggleDarkmode()}>
                {darkmode ? 
                    <><MdOutlineDarkMode /> Dark mode</> : 
                    <><MdOutlineLightMode /> Light mode</>
                }
            </button>
        </nav>
    )
}

export default Navbar;