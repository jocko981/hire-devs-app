import React from "react";
import { Link } from "react-router-dom";

// components
import Avatar from "../avatar/Avatar";
// styles
import "./DevelopersList.css";

export default function ProjectList({ developers }) {
    console.log(developers);
    return (
        <div className="developers-list">
            {developers.length < 1
                ? <p>No developers in the sistem...</p>
                : developers.map(developer => (
                    <div className="developer" key={developer.id}>
                        <Link to={`/developers/${developer.id}`}>
                            <Avatar src={developer.photoURL} />
                            <h4>{developer.name}</h4>
                        </Link>
                        <ul>
                            <li>
                                {developer.location}
                            </li>
                            <li>
                                {developer.email}
                            </li>
                            <li>
                                {developer.phoneNumber}
                            </li>
                        </ul>
                    </div>
                ))
            }
        </div>
    )
}
