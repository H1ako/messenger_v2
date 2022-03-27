//styles
import './Login.scss'
// global dependencies
import { Route, Routes } from 'react-router-dom'
// components
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

// home page
function Login() {
    return (
        <div className="page loginPage">
            <Routes>
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
            </Routes>
            <button>ok</button>
        </div>
    )
}

export default Login