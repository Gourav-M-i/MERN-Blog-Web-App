import { useState } from "react"
import { Form, useParams, useSubmit } from "react-router-dom";

const BlogForm = ({ blog }) => {
    const params = useParams()
    const submit = useSubmit()
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')

    const postBlogHandler = (e) => {
        e.preventDefault();
        const method = blog ? 'PATCH' : 'POST'
        const action = blog ? '/blogs/new' : `blogs/${params.BlogId}/edit`
        const newBlog = blog ? blog : { title: title, picture: image, description: description, link: link };
        submit(newBlog, { method: method, action: action })
    }
    return (
        <div className="container">
            <Form className="blog-form" action="#" method="post" enctype="multipart/form-data">
                <div className="form-group">
                    <label for="title">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={(e) => setTitle(e.target.value)} defaultValue={blog ? blog.title : ""} />
                </div>
                <div className="form-group">
                    <label for="image">Image</label>
                    <input type="text" className="form-control" id="image" name="picture" onChange={(e) => setImage(e.target.value)} defaultValue={blog ? blog.picture : ""} />
                </div>
                <div className="form-group">
                    <label for="description">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="1000" onChange={(e) => setDescription(e.target.value)} defaultValue={blog ? blog.description : ""}></textarea>
                </div>
                <div className="form-group">
                    <label for="link">Link</label>
                    <input className="form-control" id="link" name="link" onChange={(e) => setLink(e.target.value)} defaultValue={blog ? blog.link : ""} />
                </div>
                <button type="submit" className="btn btn-primary" onSubmit={postBlogHandler}>Submit</button>
            </Form>
        </div>
    )
}

export default BlogForm