import Aside from "./aside/Aside"
import Blog from "./blog/Blog"

const Main = (props) => {
    return (
        <div className='main'>
            <div className='container'>
                <Blog blogs={props.blogs} />
                <Aside />
            </div>
        </div>
    )
}

export default Main