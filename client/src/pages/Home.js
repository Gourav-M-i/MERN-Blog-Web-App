import { useEffect, useState } from 'react'
import Main from '../components/main/Main'

const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const getBlogs = async () => {
        const response = await fetch('http://localhost:3080/blogs/')
        const responseData = await response.json();
        setBlogs(responseData)
    }
    useEffect(() => {
        getBlogs()
    }, [])
    return (
        <>
            <Main blogs={blogs} />
        </>
    )
}


export default HomePage