import { Link } from 'react-router-dom'
import BlogImage from '../../assets/images/blog-1.png'
import BlogAuthor from '../../assets/images/Gourav.png'
const BlogItem = (props) => {
    const title = props.blog.title;
    const picture = props.blog.picture
    const description = props.blog.description
    const link = props.blog.link
    const author_id = props.blog.owner._id
    const name = props.blog.owner.firstName + ' ' + props.blog.owner.lastName
    const blog_id = props.blog._id
    return (
        <div class="blog-card">

            <div class="blog-card-banner">
                <img src={picture} alt="Building microservices with Dropwizard, MongoDB & Docker"
                    width="250" class="blog-banner-img" />
            </div>

            <div class="blog-content-wrapper">

                <button class="blog-topic text-tiny">Database</button>

                <h3>
                    <Link to={"/blogs/" + blog_id} class="h3">
                        {title}
                    </Link>
                </h3>

                <p class="blog-text">
                    {description}
                </p>

                <div class="wrapper-flex">

                    <div class="profile-wrapper">
                        <img src={'http://localhost:3080/users/avatar/' + author_id} alt="Julia Walker" width="50" />
                    </div>

                    <div class="wrapper">
                        <Link to={'/user/' + author_id} class="h4">{name}</Link>

                        <p class="text-sm">
                            <time dateTime="2022-01-17">Jan 17, 2022</time>
                            <span class="separator"></span>
                            <ion-icon name="time-outline"></ion-icon>
                            {/* <time dateTime="PT3M">3 min</time> */}
                        </p>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default BlogItem