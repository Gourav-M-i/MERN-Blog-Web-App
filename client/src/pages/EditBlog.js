import { redirect, useLoaderData } from "react-router-dom"
import BlogForm from "../components/utils/BlogForm"

const EditBlog = () => {
    const blog = useLoaderData();
    return (
        <BlogForm blog={blog} />
    )
}

export async function editBlog({ request, params }) {
    const blogId = params.BlogId;
    const data = await request.formData();
    const blog = {
        title: data.get('title'),
        picture: data.get('picture'),
        description: data.get('description'),
        link: data.get('link')
    }
    const token = localStorage.getItem('TOKEN')
    const response = await fetch(`http://localhost:3080/blogs/edit/${blogId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(blog)

        })
    const responseData = await response.json()
    return redirect('/profile')
}

export default EditBlog