import { useParams } from "react-router-dom";
// hooks
import { useDocument } from "../../hooks/useDocument";
import EditForm from "./EditForm";

export default function EditDeveloper() {
    const { id } = useParams()
    const { document, error } = useDocument("developers", id)


    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="add-developer">
            <h2 className="page-title">Edit Developer</h2>
            <EditForm developer={document} id={id} />
        </div>
    )
}
