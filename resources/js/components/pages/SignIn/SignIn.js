// styles
import './SignIn.scss'
// global dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

// home page
function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = () => {
        if (
            password.length >= 8 &&
            email != ''
        ) {
            const userData = {
                email,
                password
            }
            fetch('/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content')
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then((response) => {
                if (response.url) {
                    navigate(response.url);
                }
            })
        }
    }
    return (
        <div className="page loginPage">
            <div className="loginPage__signIn">
                <h1>sign in</h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
            </div>
            <button onClick={signIn}>ok</button>
        </div>
    )
}

export default SignIn