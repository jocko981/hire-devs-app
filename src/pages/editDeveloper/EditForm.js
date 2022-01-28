import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
// consts
import { NATIVE_LANGUAGES, DEVELOPERS_TECHNOLOGIES } from "../../constants";
// hooks
import { useFirestore } from "../../hooks/useFirestore";

export default function EditForm({ developer, id }) {
    const navigate = useNavigate()
    const { updateDocument, response } = useFirestore("developers")
    // form fields
    const [name, setName] = useState(developer.name)
    const [email, setEmail] = useState(developer.email)
    const [phoneNumber, setPhoneNumber] = useState(developer.phoneNumber)
    const [location, setLocation] = useState(developer.location)
    const [profilePictureURL, setProfilePictureURL] = useState(developer.profilePictureURL)
    const [pricePerHour, setPricePerHour] = useState(developer.pricePerHour)
    const [technology, setTechnology] = useState({ value: developer.technology, label: developer.technology })
    const [description, setDescription] = useState(developer.description)
    const [yearsOfExperience, setYearsOfExperience] = useState(developer.yearsOfExperience)
    const [nativeLanguage, setNativeLanguage] = useState({ value: developer.nativeLanguage, label: developer.nativeLanguage })
    const [linkedinProfile, setLinkedinProfile] = useState(developer.linkedinProfile)
    // form errors

    const handleSubmit = async (e) => {
        e.preventDefault()

        const developer = {
            name,
            email,
            phoneNumber,
            location,
            profilePictureURL,
            pricePerHour,
            technology: technology.value,
            description,
            yearsOfExperience,
            nativeLanguage: nativeLanguage.value,
            linkedinProfile,
            hiredDueDate: ""
        }
        await updateDocument(developer, id)
        if (!response.error) {
            navigate("/developers")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <span>Name:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
            </label>
            <label>
                <span>Email:</span>
                <input
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Phone Number:</span>
                <input
                    required
                    type="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                />
            </label>
            <label>
                <span>Location:</span>
                <input
                    required
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                />
            </label>
            <label>
                <span>(optional) Profile picture URL:</span>
                <input
                    type="test"
                    onChange={(e) => setProfilePictureURL(e.target.value)}
                    value={profilePictureURL}
                />
            </label>
            <label>
                <span>Price per Hour:</span>
                <input
                    required
                    type="number"
                    onChange={(e) => setPricePerHour(e.target.value)}
                    value={pricePerHour}
                />
            </label>
            <label>
                <span>Technology:</span>
                <Select
                    value={technology}
                    options={DEVELOPERS_TECHNOLOGIES}
                    onChange={(option) => setTechnology(option)}
                />
            </label>
            <label>
                <span>(optional) Description:</span>
                <textarea
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                ></textarea>
            </label>
            <label>
                <span>Years of experience:</span>
                <input
                    required
                    type="number"
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                    value={yearsOfExperience}
                />
            </label>
            <label>
                <span>Native language:</span>
                <Select
                    value={nativeLanguage}
                    options={NATIVE_LANGUAGES}
                    onChange={(option) => setNativeLanguage(option)}
                />
            </label>
            <label>
                <span>(optional) Linkedin profile Link:</span>
                <input
                    type="text"
                    onChange={(e) => setLinkedinProfile(e.target.value)}
                    value={linkedinProfile}
                />
            </label>

            {!response.isPending
                ? <button className="btn">Submit</button>
                : <button className="btn" disabled>Pending...</button>
            }
        </form>
    )
}
