
import { redirect, useLoaderData } from "react-router-dom"
import Main from "../components/main/Main"
import Skills from "../components/utils/Skills"
import { useEffect, useState } from "react"
import NameAndImage from "../components/header/NameAndImage"
// import { redirect } from "react-router-dom"

const ProfilePage = () => {

    const skillsData = useLoaderData().skills
    const userId = useLoaderData()._id
    const [blogs, setBlogs] = useState([])
    const getBlogs = async () => {
        const response = await fetch('http://localhost:3080/blogs/' + userId)
        const responseData = await response.json()
        setBlogs(responseData)
    }
    useEffect(() => {
        getBlogs()
    }, [])
    return (
        <>
            <NameAndImage />
            {skillsData.length !== 0 && <Skills />}
            <Main blogs={blogs} />
        </>
    )
}

export async function loadProfile({ request, params }) {
    const token = localStorage.getItem('TOKEN')
    const response = await fetch(`http://localhost:3080/users/me`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
    if (response.status === 401) {
        return redirect('/signup')
    }
    const profileData = await response.json()
    return profileData
}

export async function loadUserProfile({ params }) {
    const userId = params.userId
    const response = await fetch(`http://localhost:3080/users/${userId}`)
    const profileData = await response.json()
    return profileData
}


export default ProfilePage