// hooks
import RecordsList from "../../components/recordsList/RecordsList";
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard() {
    const { documents, error } = useCollection("records")

    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div>
            <h2 className="page-title">All hire Records</h2>
            {error && <p className="error">{error}</p>}
            {documents && <RecordsList records={documents} />}
        </div>
    )
}
