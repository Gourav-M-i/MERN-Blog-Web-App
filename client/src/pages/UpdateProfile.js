import { useState } from "react"
import { Form, useNavigate, redirect, useLoaderData, useSubmit } from "react-router-dom"
import axios from 'axios'
import NameAndImage from "../components/header/NameAndImage"
const UpdateProfile = () => {
    const userData = useLoaderData()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState()

    const avatarHandler = (event) => {
        setAvatar(event.target.files[0])
    }
    const uploadAvatarHandler = async () => {
        const formData = new FormData()
        formData.append('avatar', avatar)
        const token = localStorage.getItem('TOKEN')
        const response = await axios.post('http://localhost:3080/users/upload', formData, {
            headers: {
                'Content-Type': 'image/png',
                'Authorization': `Bearer ${token}`
            }
        })
        navigate('/profile')
    }
    return (
        <>
            <NameAndImage />
            <div class='main'>
                <div class="update-profile-container">
                    <h2 class="h2">Update Profile</h2>
                    <div>
                        <Form class='update-profile' method="PATCH" action="/profile/update">
                            <label htmlFor="firstName">First Name:</label>
                            <input type="text" id="firstName" name="firstName" required defaultValue={userData.firstName} />

                            <label htmlFor="lastName">Last Name:</label>
                            <input type="text" id="lastName" name="lastName" required defaultValue={userData.lastName} />

                            <label htmlFor="specialization">Specialization:</label>
                            <input type="text" id="specialization" name="specialization" defaultValue={userData.specialization} />

                            <label htmlFor="role">Role:</label>
                            <input type="text" id="role" name="role" defaultValue={userData.role} />

                            <label htmlffor="facebookLink">Facebook Link:</label>
                            <input type="url" id="facebookLink" name="facebook" defaultValue={userData.facebook} />

                            <label htmlFor="instagramLink">Instagram Link:</label>
                            <input type="url" id="instagramLink" name="instagram" defaultValue={userData.instagram} />

                            <label htmlFor="linkedinLink">LinkedIn Link:</label>
                            <input type="url" id="linkedinLink" name="linkedin" defaultValue={userData.linkedin} />

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" />

                            <input type="submit" value="Update" />
                        </Form>

                    </div>
                </div>
                <div class="update-profile-container">
                    <h2>Change avatar</h2>
                    <Form class="update-profile">
                        <label for="avatar">Avatar</label>
                        <input type="file" id="avatar" name="avatar" onChange={avatarHandler} />
                        <input type="submit" onClick={uploadAvatarHandler} value="Upload" />
                    </Form>
                </div>
            </div>
        </>
    )
}

export async function updateAction({ request }) {
    console.log('hahahah')
    const data = await request.formData()
    const updatedData =
    {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        specialization: data.get('specialization'),
        role: data.get('role'),
        instagram: data.get('instagram'),
        facebook: data.get('facebook'),
        linkedin: data.get('linkedin'),
        password: data.get('password')
    }
    const token = localStorage.getItem('TOKEN')
    const response = await fetch('http://localhost:3080/users/update',
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedData)
        })
    if (response.status === 401) {
        return redirect('/signup')
    }
    return redirect('/profile')

}

export default UpdateProfile