import { useState, useEffect, useCallback } from "react";
// styles
import "./Developers.css";
// hooks
import { useCollection } from "../../hooks/useCollection";
// firestore
import { timestamp } from "../../firebase/config";
// components
import DevelopersList from "../../components/developersList/DevelopersList";

export default function Developers() {
    const { documents, error } = useCollection("developers")
    const [selected, setSelected] = useState(3)
    const [developers, setDevelopers] = useState(documents)
    const todayTimestamp = timestamp.fromDate(new Date())

    useEffect(() => {
        setDevelopers(documents)
    }, [documents])

    const filterAvailable = useCallback(() => {
        setDevelopers(documents.filter(dev => todayTimestamp > dev.hiredDueDate))
        setSelected(1)
    }, [documents, todayTimestamp])

    const filterHired = useCallback(() => {
        setDevelopers(documents.filter(dev => todayTimestamp <= dev.hiredDueDate))
        setSelected(2)
    }, [documents, todayTimestamp])

    const filterAll = useCallback(() => {
        setDevelopers(documents)
        setSelected(3)
    }, [documents])


    if (error) {
        return <div className="error">{error}</div>
    }
    if (!document) {
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="developers">
            <h2 className="page-title">Developers</h2>
            <ul className="filters">
                <li className={selected === 1 ? "filtered" : ""} onClick={filterAvailable}>Available</li>
                <li className={selected === 2 ? "filtered" : ""} onClick={filterHired}>Hired</li>
                <li className={selected === 3 ? "filtered" : ""} onClick={filterAll}>Show All</li>
            </ul>
            {error && <p className="error">{error}</p>}
            {developers && <DevelopersList developers={developers} />}
        </div>
    )
}
