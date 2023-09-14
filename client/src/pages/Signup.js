import { Link, Form, redirect } from 'react-router-dom'
const SignupPage = () => {
    return (
        <div className="login-page">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>SIGNUP</h3>
                    </div>
                </div>
                <Form className="login-form" method='POST' action='/signup'>
                    <input type="text" name="fname" placeholder="First Name" />
                    <input type="text" name="lname" placeholder="Last Name" />
                    <input type="text" name="email" placeholder="Email" />
                    <input type="password" name="password" placeholder="Password" />
                    <button>Signup</button>
                    <p className="message">Already have account? <Link to="/login">Login</Link></p>
                </Form>
            </div>
        </div>
    )
}

export async function action({ request, params }) {
    const data = await request.formData()
    const signupData = {
        fname: data.get('fname'),
        lname: data.get('lname'),
        email: data.get('email'),
        password: data.get('password')
    }
    try {
        const response = await fetch('http://localhost:3080/auth/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupData)
            })
        if (!response.ok) {
            return redirect('/signup')
        }
        const responseData = await response.json()
        localStorage.setItem('TOKEN', responseData.token)
        return redirect('/profile/')
    }
    catch (e) {

    }
}

export default SignupPage