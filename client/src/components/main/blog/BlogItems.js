import BlogItem from './BlogItem'
const BlogItems = (props) => {
    const blogs = props.blogs
    return (
        <div class="blog-card-group">
            {blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)}
            <button class="btn load-more">Load More</button>
        </div>
    )
}

export default BlogItems