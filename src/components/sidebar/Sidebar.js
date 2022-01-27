import { NavLink } from "react-router-dom";
// styles
import "./Sidebar.css";
// assets
import DashboardIcon from "../../assets/icons/dashboard_icon.svg";
import UsersIcon from "../../assets/icons/users_icon.svg";
import AddIcon from "../../assets/icons/add_icon.svg";

export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="user">
                    Welcome!
                </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink to="/">
                                {/* exact property on NavLink if need */}
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/developers">
                                {/* exact property on NavLink if need */}
                                <img src={UsersIcon} alt="developers icon" />
                                <span>Developers</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New hire record</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
