import { redirect } from "react-router-dom"
import BlogForm from "../components/utils/BlogForm"

const NewBlog = () => {
    return (
        <BlogForm />
    )
}

export async function postBlog({ request, params }) {
    const data = await request.formData();
    const blog = {
        title: data.get('title'),
        picture: data.get('picture'),
        description: data.get('description'),
        link: data.get('link')
    }
    console.log("Error", blog)
    const token = localStorage.getItem('TOKEN')
    const response = await fetch('http://localhost:3080/blogs/newblog',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blog)

        })
    const responseData = await response.json()
    return redirect('/profile')
}

export default NewBlog