import { useParams } from "react-router-dom";
import Avatar from "../../components/avatar/Avatar";
// hooks
import { useDocument } from "../../hooks/useDocument";

export default function DeveloperProfile() {
    const { id } = useParams()
    const { document, error } = useDocument("developers", id)
    console.log(document);

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="developer-details">
            <div className="developer-summary">
                <Avatar src={document.profilePictureURL} />
                <h2 className="page-title">{document.name}</h2>

                <p className="details"><b>email - </b> {document.email}</p>
                <p className="details"><b>phone number - </b>{document.phoneNumber}</p>
                <p className="details"><b>location - </b>{document.location}</p>
                {document.profilePictureURL && <p className="details"><b>Profile picture URL - </b>{document.profilePictureURL}</p>}
                <p className="details"><b>Price per Hour - </b>{document.pricePerHour}</p>
                <p className="details"><b>Technology - </b>{document.technology}</p>
                {document.description && <p className="details"><b>Description - </b>{document.description}</p>}
                <p className="details"><b>Years of Experience - </b>{document.yearsOfExperience}</p>
                <p className="details"><b>Native Language - </b>{document.nativeLanguage}</p>
                {document.linkedinProfile && <p className="details"><b>Description - </b>{document.linkedinProfile}</p>}

            </div>
        </div>
    )
}
