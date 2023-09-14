import { useLoaderData } from 'react-router-dom'
// import image from '../assets/images/Gourav.png'
const NameAndImage = () => {
    const user = useLoaderData()
    return (
        <div className="hero">

            <div className="container">

                <div className="left">

                    <h1 className="h1">
                        Hi, I'm <b>{user.firstName}&nbsp;{user.lastName}</b>.
                        {user.role && <span>{user.role}</span>}
                    </h1>

                    {user.specialization && <p className="h3">
                        {user.specialization}
                    </p>}

                    <div className="btn-group">
                        <a href="/" className="btn btn-primary">Contact Me</a>
                        <a href="/profile" className="btn btn-secondary">About Me</a>
                    </div>

                </div>

                <div className="right">

                    <div className="pattern-bg"></div>
                    {user.avatar && <div className="img-box">
                        <img src={'http://localhost:3080/users/avatar/' + user._id} alt="Julia Walker" className="hero-img" />
                        <div className="shape shape-1"></div>
                        <div className="shape shape-2"></div>
                    </div>}

                </div>

            </div>

        </div>
    )
}

export default NameAndImage