// styles
import "./Avatar.css";
// assets
import UserCircleIcon from "../../assets/icons/user-circle_icon.svg";

export default function Avatar({ src }) {
    return (
        <div className="avatar">
            {src
                ? <img src={src} alt="user avatar" />
                : <img src={UserCircleIcon} alt="user avatar" />
            }
        </div>
    )
}
