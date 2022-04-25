// styles
import './SignUp.scss'
// global dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { signUpPuctureFileState } from '../../../recoil/SignUpAtom'
// recoil atoms
import { userInfoState } from '../../../recoil/UserAtom'
import { currentLanguageAtom } from '../../../recoil/LanguageAtom'
// components
import UploadPicture from "../../UploadPicture/UploadPicture"

// sign up page
function SignUp() {
    const currentLanguage = useRecoilValue(currentLanguageAtom)
    const navigate = useNavigate()
    const [pictureFile, setPictureFile] = useRecoilState(signUpPuctureFileState)
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const signUp = async () => {
        if (
            password.length >= 8 &&
            password === passwordAgain &&
            email != '' &&
            name != '' &&
            surname != ''
        ) {
            const newUserData = new FormData()
            if (pictureFile) newUserData.append('picture', pictureFile)
            newUserData.append('name', name)
            newUserData.append('surname', surname)
            newUserData.append('email', email)
            newUserData.append('password', password)

            await fetch('/sign-up', {
                method: "POST",
                headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content'),
                    // "Content-Type": "multipart/form-data",
                    "Accept": 'application/json;charset=utf-8',
                    "type": "formData"
                },
                body: newUserData
            })
            .then(response => response.json())
            .then((response) => {
                console.log(response)
                if (response.error) {
                    console.log(response.error)
                    return
                }
                if (response.url) {
                    if (response.user) {
                        setPictureFile('')
                        setUserInfo(response.user)
                    }
                    
                    navigate(response.url);
                }
            })
        }
    }

    return (
        <div className="page loginPage">
            <div className="loginPage__signUp">
                <h1>{currentLanguage.keys?.signUp}</h1>
                <div className="signUp__info">
                    <UploadPicture  recoilState={signUpPuctureFileState} />
                    <div className="info__main">
                        <input required value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder={currentLanguage.keys?.name} />
                        <input required value={surname} onChange={(e) => setSurname(e.target.value)} type="text" placeholder={currentLanguage.keys?.surname} />
                        <input required value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder={currentLanguage.keys?.email} />
                    </div>
                </div>
                <div className="signUp__passwords">
                    <input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder={currentLanguage.keys?.password} />
                    <input required value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} type="password" placeholder={currentLanguage.keys?.passwordAgain} />
                </div>
            </div>
            <button onClick={signUp}>{currentLanguage.keys?.ok}</button>
        </div>
    )
}

export default SignUp