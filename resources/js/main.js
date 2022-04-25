// global dependencies
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'
// recoil atoms
import { userInfoState } from './recoil/UserAtom.js'
import { currentLanguageAtom } from './recoil/LanguageAtom.js'
// components
import Sidebar from './components/Sidebar/Sidebar.js'
import Home from './components/pages/Home/Home.js'
import Chats from './components/pages/Chats/Chats.js'
import Chat from './components/pages/Chat/Chat.js'
import NewGroupchat from './components/pages/NewGroupchat/NewGroupchat.js'
import SignIn from './components/pages/SignIn/SignIn.js'
import SignUp from './components/pages/SignUp/SignUp.js'
import User from './components/pages/User/User.js'
// libs
import { customFetch } from './libs/customFetch.js'
// localization
import russian from '../localization/ru.js'
import english from '../localization/en.js'

function Main() {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState)
    const [currentLanguage, setCurrentLanguage] = useRecoilState(currentLanguageAtom)
    const language = russian

    useEffect(async () => {
        setCurrentLanguage(language)
        
        await customFetch('/api/user', 'POST')
        .then(data => data.json())
        .then(data => {
            if (data.error) {
                return console.log(data.error)
            }
            if (data.data) {
                setUserInfo(data.data)
            }
        })
    }, [])
    
    return (
        <>
            <Sidebar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/chats/:chatId" element={<Chat />} />
                    <Route path="/new-groupchat" element={<NewGroupchat />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/user/:userId" element={<User />} />
                </Routes>
            </main>
        </>
    )
}

export default Main