import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// styles
import "./AddDeveloper.css";
// hooks
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
// firebase
import { timestamp } from "../../firebase/config";

const categories = [
    { value: "development", label: "Development" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "marketing", label: "Marketing" }
]
const devs = [
    { value: "Morko", label: "Frontend" },
    { value: "Dorko", label: "BE" },
    { value: "Zorko", label: "QA" },
    { value: "Pavle", label: "PM" }
]

export default function CreateDeveloper() {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore("developers")
    const { documents } = useCollection("developers")
    const [developers, setDevelopers] = useState([])
    // form fields
    const [name, setName] = useState("")
    const [details, setDetails] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [category, setCategory] = useState("")
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const [formCaughtErrorOnce, setFormCaughtErrorOnce] = useState(false)

    useEffect(() => {
        if (documents) {
            const options = documents.map(user => {
                return { value: user, label: user.displayName }
            })
            setDevelopers(options)
        }
    }, [documents])

    useEffect(() => {
        if (formCaughtErrorOnce) {
            if (category && assignedUsers.length) {
                setFormError(null)
                return
            }
        }
    }, [formCaughtErrorOnce, category, assignedUsers.length])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category && !assignedUsers.length) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select your project Category and Assign at least 1 user")
            return
        }
        if (!category) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select your project Category")
            return
        }
        if (!assignedUsers.length) {
            setFormCaughtErrorOnce(true)
            setFormError("Please Assign at least 1 user to the project")
            return
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                user: u
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            // assignedUsers:
            comments: [],
            assignedUsersList: assignedUsersList
        }

        await addDocument(project)
        if (!response.error) {
            navigate("/")
        }

        console.log(name, details, dueDate, category.value, assignedUsers)
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Create project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Name of a Project:</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>
                <label>
                    <span>Project details:</span>
                    <textarea
                        required
                        type="text"
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>
                <label>
                    <span>Due date:</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                    />
                </label>

                <label>
                    <span>Project category:</span>
                    <Select
                        options={categories}
                        onChange={(option) => setCategory(option)}
                    />
                </label>
                <label>
                    <span>Assign project to:</span>
                    <Select
                        options={devs}
                        onChange={(option) => setAssignedUsers(option)}
                        isMulti
                    />
                </label>
                {formError && <div className="error">{formError}</div>}
                <button className="btn">Add project</button>
            </form>
        </div>
    )
}
