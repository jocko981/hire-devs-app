import React from "react";
// components
import Avatar from "../avatar/Avatar";
// styles
import "./RecordsList.css";

export default function RecordsList({ records }) {
    return (
        <div className="records-list">
            {records.length < 1
                ? <p>No records for now!</p>
                : records.map(record => (
                    <div className="record" key={record.id}>
                        <div className="record-info">
                            <h4>{record.title}</h4>
                            <p>Due by: {record.endDate.toDate().toDateString()}</p>
                        </div>
                        <div className="assigned-to">
                            <ul>
                                {record.assignedDevelopersList.map(developer => (
                                    <li key={developer.id}>
                                        <Avatar src={developer.photoURL} />
                                        <span>{developer.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
