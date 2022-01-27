// styles
import "./Navbar.css";
// assets
import ClipboardIcon from "../../assets/icons/clipboard_icon.svg";

export default function Navbar() {
    return (
        <div className="navbar">
            <ul>
                <li className="logo">
                    <img src={ClipboardIcon} alt="app logo" />
                    <span>Hire devs App</span>
                </li>

                <li>
                    <button className="btn">maybe darkmode here</button>
                </li>
            </ul>
        </div>
    )
}
