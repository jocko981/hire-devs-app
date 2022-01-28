// hooks
import { useCollection } from "../../hooks/useCollection";
// components
import DevelopersList from "../../components/developersList/DevelopersList";

export default function Developers() {
    const { documents, error } = useCollection("developers")

    return (
        <div>
            <h2 className="page-title">Developers</h2>
            {error && <p className="error">{error}</p>}
            {documents && <DevelopersList developers={documents} />}
        </div>
    )
}
