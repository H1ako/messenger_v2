// styles
import './SignIn.scss'
// global dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
// recoil atoms
import { userInfoState } from '../../../recoil/UserAtom';
import { currentLanguageAtom } from '../../../recoil/LanguageAtom';
// libs
import { customFetch } from '../../../libs/customFetch';

// home page
function SignIn() {
    const currentLanguage = useRecoilValue(currentLanguageAtom)
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)

    const signIn = async () => {
        if (
            password.length >= 8 &&
            email != ''
        ) {
            const userData = {
                email,
                password
            }
            
            await customFetch('/sign-in', 'POST', JSON.stringify(userData))
            .then(response => response.json())
            .then((response) => {
                if (response.error) {
                    console.log(response.error)
                    return
                }
                if (response.url) {
                    if (response.user) {
                        setUserInfo(response.user)
                    }
                    
                    navigate(response.url);
                }
            })
        }
    }
    return (
        <div className="page loginPage">
            <div className="loginPage__signIn">
                <h1>{currentLanguage.keys?.signIn}</h1>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={currentLanguage.keys?.email} />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={currentLanguage.keys?.password} />
            </div>
            <button onClick={signIn}>{currentLanguage.keys?.ok}</button>
        </div>
    )
}

export default SignIn