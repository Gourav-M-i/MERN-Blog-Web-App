import { Link, json, Form, redirect } from 'react-router-dom'
const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="form">
                <div className="login">
                    <div className="login-header">
                        <h3>LOGIN</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <Form className="login-form" method='POST' action='/login'>
                    <input type="text" name="email" placeholder="username" />
                    <input type="password" name="password" placeholder="password" />
                    <button type="submit">Login</button>
                    <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
                </Form>
            </div>
        </div>
    )
}

export async function action({ request, params }) {
    const data = await request.formData()
    const loginData = {
        email: data.get('email'),
        password: data.get('password')
    }
    try {
        const response = await fetch('http://localhost:3080/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
        if (response.status === 401) {
            return json({ message: 'Invalid credentials' }, { status: 404 })
        }
        else {
            const responseData = await response.json()
            localStorage.setItem('TOKEN', responseData.token)
            return redirect('/profile/')
        }
    }
    catch (e) {

    }
}

export default LoginPage