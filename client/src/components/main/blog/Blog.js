import BlogItems from "./BlogItems"

const Blog = (props) => {
    return (
        <div class='blog'>
            <h2 class="h2">Latest Blog Post</h2>
            <BlogItems blogs={props.blogs} />
        </div>
    )
}

export default Blog