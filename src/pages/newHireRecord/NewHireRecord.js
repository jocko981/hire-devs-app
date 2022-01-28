import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// styles
import "./NewHireRecord.css";
// consts
import { RECORD_CATEGORIES } from "../../constants";
// hooks
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
// firebase
import { timestamp } from "../../firebase/config";


export default function NewHireRecord() {
    const today = new Date()
    const tomorrow = new Date().setDate(today.getDate() + 1)

    const navigate = useNavigate()
    const { addDocument, response } = useFirestore("records")
    const { updateDocument } = useFirestore("developers")
    const { documents } = useCollection("developers")
    const [developers, setDevelopers] = useState([])
    // form fields
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [category, setCategory] = useState("")
    const [assignedDevelopers, setAssignedDevelopers] = useState([])
    const [startDate, setStartDate] = useState(tomorrow)
    const [endDate, setEndDate] = useState(null)
    // form errors
    const [formError, setFormError] = useState(null)
    const [formCaughtErrorOnce, setFormCaughtErrorOnce] = useState(false)

    useEffect(() => {
        if (documents) {
            const options = documents.map(developer => {
                return { value: developer, label: developer.name }
            })
            setDevelopers(options)
        }
    }, [documents])

    useEffect(() => {
        if (formCaughtErrorOnce) {
            if (category && assignedDevelopers.length) {
                setFormError(null)
                return
            }
        }
    }, [formCaughtErrorOnce, category, assignedDevelopers.length])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category && !assignedDevelopers.length) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select Category and Assign at least 1 Developer")
            return
        }
        if (!category) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select a Category")
            return
        }
        if (!assignedDevelopers.length) {
            setFormCaughtErrorOnce(true)
            setFormError("Please Assign at least 1 Developer")
            return
        }

        const assignedDevelopersList = assignedDevelopers.map((developer) => {
            const dev = developer.value
            return { ...dev, hiredDueDate: timestamp.fromDate(new Date(endDate)) }
        })

        const record = {
            title,
            details,
            category,
            startDate: timestamp.fromDate(new Date(startDate)),
            endDate: timestamp.fromDate(new Date(endDate)),
            assignedDevelopersList
        }

        const handleUpdatingHiredDevelopers = async () => {
            assignedDevelopersList.forEach((developer) => updateDocument(developer, developer.id))
        }

        await handleUpdatingHiredDevelopers()
        if (!response.error) {
            await addDocument(record)
            if (!response.error) {
                navigate("/")
            }
        }

    }

    return (
        <div className="add-hire-record">
            <h2 className="page-title">New hire Record</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>

                <label>
                    <span>Category:</span>
                    <Select
                        options={RECORD_CATEGORIES}
                        onChange={(option) => setCategory(option.value)}
                    />
                </label>
                <label>
                    <span>Assign to:</span>
                    <Select
                        options={developers}
                        onChange={(option) => setAssignedDevelopers(option)}
                        isMulti
                    />
                </label>
                <label>
                    <span>Start Date:</span>
                    <DatePicker
                        placeholderText="Select..."
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={startDate}
                        maxDate={endDate}
                        isClearable
                        dateFormat="dd/MM/yyyy"
                    />
                </label>

                <label>
                    <span>End Date:</span>
                    <DatePicker
                        placeholderText="Select..."
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        minDate={startDate}
                        isClearable
                        dateFormat="dd/MM/yyyy"
                    />
                </label >

                {formError && <div className="error">{formError}</div>
                }
                <button className="btn">Create</button>
            </form >
        </div >
    )
}
