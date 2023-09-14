import { useParams, Link, useLoaderData } from "react-router-dom"
import BlogImage from '../components/assets/images/blog-4.png'
const BlogPage = () => {
    const params = useParams()
    const blog = useLoaderData()
    const title = blog.title;
    const picture = blog.picture
    const description = blog.description
    const author = blog.owner.firstName + ' ' + blog.owner.lastName
    const owner_id = blog.owner._id
    const blogId = blog._id

    const deleteBlogHandler = async () => {
        const token = localStorage.getItem('TOKEN')
        const response = await fetch(`http://localhost:3080/blogs/${params.BlogId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
        const responseData = await response.json()
        console.log('delete', responseData)
    }
    return (
        <div className='container'>
            <div className="blog-post">
                <h2 className="blog-post-title">{title}</h2>
                <p className="blog-post-meta">April 15, 2023 by <Link to={'/user/' + owner_id}>{author}</Link></p>
                <img src={picture} alt="Blog Post" />
                <p className="blog-post-description">{description}</p>
                <Link className="edit" to={'/blogs/' + blogId + '/edit'}>Edit</Link>
                <Link className="delete" to='/' onClick={deleteBlogHandler}>Delete</Link>
            </div>
        </div>
    )
}

export async function loadBlogData({ request, params }) {
    const blogId = params.BlogId
    const response = await fetch(`http://localhost:3080/blogs/blog/${blogId}`)
    const responseData = await response.json();
    return responseData
}

export default BlogPage