import { useEffect, useState } from "react"
import { Form, redirect, useSubmit, useLoaderData } from "react-router-dom"
import NameAndImage from "../components/header/NameAndImage"

const AddSkillsPage = () => {
    const userId = useLoaderData()._id

    const submit = useSubmit()
    const [skills, setSkills] = useState([])
    const [skillName, setSkillName] = useState()
    const [skillValue, setSkillValue] = useState(50)
    const getSkills = async () => {
        const response = await fetch(`http://localhost:3080/users/skills/${userId}`)
        const skills = await response.json()
        setSkills(skills.skills)
    }
    useEffect(() => {
        getSkills()
    }, [])

    const skillHandler = (e) => {
        setSkillName(e.target.value)
    }
    const difficultyHandler = (e) => {
        setSkillValue(e.target.value)
    }
    const addSkillsHandler = (e) => {
        e.preventDefault()
        setSkills(prev => [...prev, { skill: skillName, rating: Number.parseInt(skillValue) }])
    }
    const deleteSkillHandler = (e) => {
        console.log(e.target)
        setSkills(prev => prev.filter(item => item._id !== e.target.id))
    }
    const saveSkillsHandler = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('skills', JSON.stringify(skills))
        submit(formData, { method: 'PUT', action: '/profile/addskills' })
    }
    return (
        <>
            <NameAndImage />
            <div className='container skill-area'>
                <Form className='add-skills' method="PUT" action="/profile/addskills">
                    <h2 className='h2'>Add Skills</h2>

                    <input type="text" id="skill" name="skill" placeholder="Enter a skill..." onChange={skillHandler} />

                    <div className="range-slider">
                        <input className="range-slider__range" type="range" name="rating" min="1" max="100" defaultValue={50} onChange={difficultyHandler} />
                        <span className="range-slider__value">{skillValue}</span>
                    </div>

                    <button onClick={addSkillsHandler}>Add</button>
                    <button type="submit" onClick={saveSkillsHandler}>Save</button>
                </Form>
                <div className='skills-list'>
                    {skills && skills.map((skill, index) => <p key={skill._id ? skill._id : index} id={skill._id} onClick={deleteSkillHandler}>{skill.skill}:{skill.rating}</p>)}
                </div>
            </div>
        </>
    )
}

export async function saveSkillsAction({ request }) {
    const data = await request.formData()
    const skills = { skills: JSON.parse(data.get('skills')) }
    const token = localStorage.getItem('TOKEN')
    await fetch('http://localhost:3080/users/addskills', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(skills)
    })
    return redirect('/profile/')
}

export default AddSkillsPage