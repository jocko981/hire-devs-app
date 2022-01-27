import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// firebase
import { projectFirestore, projectStorage } from "../firebase/config";
// hooks
import { useFirestore } from "./useFirestore";

export const useSignup = () => {
    const navigate = useNavigate()
    const { addDocument, response } = useFirestore("developers")
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const signupDeveloper = async (name, email, phoneNumber, location, profilePicture, pricePerHour, technology, description, yearsOfExperience, nativeLanguage, linkedinProfile) => {
        setError(null)
        setIsPending(true)

        try {
            // we need to upload and store the image before we update developers profile in developers collection
            // upload developers profilePicture img and handle folder structure
            const uploadProfilePicturePath = `profile_pictures/${email}/${profilePicture.name}`
            const imgUploadRes = await projectStorage.ref(uploadProfilePicturePath).put(profilePicture)
            if (!imgUploadRes) {
                throw new Error("Could not upload image")
            }
            const imgUrl = await imgUploadRes.ref.getDownloadURL()

            // create a developer document
            const developer = {
                name,
                email,
                phoneNumber,
                location,
                profilePictureURL: imgUrl,
                pricePerHour,
                technology,
                description,
                yearsOfExperience,
                nativeLanguage,
                linkedinProfile,
                hiredDueDate: null
            }
            await addDocument(developer)
            if (response.error) {
                setError(response.error)
            } else {
                navigate("/developers")
            }

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { signupDeveloper, error, isPending }
}