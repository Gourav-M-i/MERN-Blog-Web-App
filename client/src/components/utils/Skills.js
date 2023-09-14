import { useLoaderData } from "react-router-dom"

const Skills = () => {
    const skills = useLoaderData().skills
    return (
        <div className='skills-section'>
            <div className='container'>
                <div className="wra">
                    <div className="shape-1"></div>
                    <div className="shape-2"></div>
                    <div className="cont">
                        <h2>Skills </h2>
                        {skills && skills.map(skill => <div className="skills" key={skill._id}>
                            <div className="details">
                                <span>{skill.skill}</span>
                                <span>{skill.rating}%</span>
                            </div>
                            <div className="bar">
                                <div id="html-bar" style={{ '--from-width': '0%', '--to-width': `${skill.rating}%` }}></div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Skills