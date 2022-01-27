// hooks
import { useCollection } from "../../hooks/useCollection";

export default function Dashboard() {
    const { documents, error } = useCollection("records")

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className="error">{error}</p>}
            <p>All hire Records</p>
            {documents && console.log(documents)}
        </div>
    )
}
