import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// firestore
import { useFirestore } from "../../hooks/useFirestore";
// components
import Avatar from "../avatar/Avatar";
import DeleteModal from "../modals/deleteModal/DeleteModal";
// styles
import "./DevelopersList.css";

export default function ProjectList({ developers }) {
    const { deleteDocument, response, isPending } = useFirestore("developers")
    const [isOpen, setIsOpen] = useState(false)
    const [selectedId, setSelectedId] = useState(null)

    const handleDeleteClick = (id) => {
        setIsOpen(true);
        setSelectedId(id);
    }

    const handleDeleteDocument = () => {
        deleteDocument(selectedId);
        setSelectedId(null);
    }

    const closeModal = () => {
        setIsOpen(false);
        setSelectedId(null);
    }

    useEffect(() => {
        if (response.success) {
            setIsOpen(false);
            setSelectedId(null);
        }
    }, [response.success])

    return (
        <div className="developers-list">
            {developers.length < 1
                ? <p>No developers in the sistem...</p>
                : developers.map(developer => (
                    <div className="developer" key={developer.id}>
                        <div className="info">
                            <Link to={`/developers/${developer.id}`}>
                                <Avatar src={developer.profilePictureURL} />
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

                        <div>
                            <ul className="actions-list">
                                <Link to={`/developers/edit/${developer.id}`}><li>EDIT</li> </Link>
                                <li onClick={() => handleDeleteClick(developer.id)}>DELETE</li>
                            </ul>
                        </div>
                    </div>
                ))
            }
            {isOpen && <DeleteModal
                closeModal={closeModal}
                handleDeleteDocument={handleDeleteDocument}
                isPending={isPending}
            />}
        </div>
    )
}
