import { useEffect, useState } from "react";
import Select from "react-select";
// styles
import "./AddDeveloper.css";
// consts
import { NATIVE_LANGUAGES, DEVELOPERS_TECHNOLOGIES } from "../../constants";
// hooks
import { useSignup } from "../../hooks/useSignup";

export default function AddDeveloper() {
    const { signupDeveloper, isPending, error } = useSignup()
    // form fields
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [location, setLocation] = useState("")
    const [profilePicture, setProfilePicture] = useState(null)
    const [pricePerHour, setPricePerHour] = useState("")
    const [technology, setTechnology] = useState("")
    const [description, setDescription] = useState("")
    const [yearsOfExperience, setYearsOfExperience] = useState("")
    const [nativeLanguage, setNativeLanguage] = useState("")
    const [linkedinProfile, setLinkedinProfile] = useState("")
    // form errors
    const [profilePictureError, setProfilePictureError] = useState("")
    const [formError, setFormError] = useState(null)
    const [formCaughtErrorOnce, setFormCaughtErrorOnce] = useState(false)

    useEffect(() => {
        if (formCaughtErrorOnce) {
            if (technology && nativeLanguage) {
                setFormError(null)
                return
            }
        }
    }, [formCaughtErrorOnce, technology, nativeLanguage])

    const handleFileChange = (e) => {
        setProfilePicture(null)
        let selectedFile = e.target.files[0]

        if (!selectedFile) {
            setProfilePictureError("Please select your Profile Picture c:")
            return
        }
        if (!selectedFile.type.includes("image")) {
            setProfilePictureError("File must be an image :D")
            return
        }
        if (selectedFile.size > 500000) {
            setProfilePictureError("Hey, sorry, image must be less than 0.5MB")
            return
        }

        setProfilePictureError("")
        setProfilePicture(selectedFile)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!nativeLanguage) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select developers Native language")
            return
        }
        if (!technology) {
            setFormCaughtErrorOnce(true)
            setFormError("Please select Technology that the developer is using")
            return
        }

        const developer = {
            name,
            email,
            phoneNumber,
            location,
            profilePicture,
            pricePerHour,
            technology,
            description,
            yearsOfExperience,
            nativeLanguage,
            linkedinProfile,
            hiredDueDate: null
        }

        await signupDeveloper(name, email, phoneNumber, location, profilePicture, pricePerHour, technology, description, yearsOfExperience, nativeLanguage, linkedinProfile)

        // console.log(name, description)
    }

    return (
        <div className="create-form">
            <h2 className="page-title">Add new Developer</h2>
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
                    <span>(optional) Profile picture:</span>
                    <input
                        type="file"
                        onChange={handleFileChange}
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
                        options={DEVELOPERS_TECHNOLOGIES}
                        onChange={(option) => setTechnology(option.value)}
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
                        options={NATIVE_LANGUAGES}
                        onChange={(option) => setNativeLanguage(option.value)}
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

                {profilePictureError && <div className="error">{profilePictureError}</div>}
                {formError && <div className="error">{formError}</div>}
                <button className="btn">Add project</button>
            </form>
        </div>
    )
}
