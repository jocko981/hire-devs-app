import { useParams } from "react-router-dom";
// hooks
import { useDocument } from "../../hooks/useDocument";

export default function DeveloperProfile() {
    const { id } = useParams()
    const { document, error } = useDocument("developers", id)

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="developer-details">
            <div className="developer-summary">
                <h2 className="page-title">{document.name}</h2>

                <p className="details">
                    {document.details}
                </p>

            </div>
        </div>
    )
}
