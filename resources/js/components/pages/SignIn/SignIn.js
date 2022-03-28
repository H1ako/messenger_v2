// styles
import './SignIn.scss'
// global dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// libs
import { customFetch } from '../../../libs/customFetch';

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
            
            customFetch('/sign-in', 'POST', JSON.stringify(userData))
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    console.log(response.error)
                    return
                }
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