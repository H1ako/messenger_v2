// styles
import './Selector.scss'
// global dependencies
import { useRecoilState, useRecoilValue } from 'recoil'
// recoil atoms
import { chatTypeState, userTypeState } from '../../recoil/SelectorAtom'
import { currentLanguageAtom } from '../../recoil/LanguageAtom'

// home page
function Selector({type}) {
    const currentLanguage = useRecoilValue(currentLanguageAtom)
    const [chatType, setChatType] = useRecoilState(chatTypeState)
    const [userType, setUserType] = useRecoilState(userTypeState)

    if (type === 'users') {
        return (
            <div className="selector">
                <button onClick={() => setUserType('all')} className={userType === 'all' ? 'active' : ''}>
                    {currentLanguage.keys?.all}
                </button>
                <button onClick={() => setUserType('friends')} className={userType === 'friends' ? 'active' : ''}>
                    {currentLanguage.keys?.friends}
                </button>
                <button onClick={() => setUserType('requests')} className={userType === 'requests' ? 'active' : ''}>
                    {currentLanguage.keys?.requests}
                </button>
            </div>
        )
    }
    
    if (type === 'chats') {
        return (
            <div className="selector">
                <button onClick={() => setChatType('all')} className={chatType === 'all' ? 'active' : ''}>
                    {currentLanguage.keys?.all}
                </button>
                <button onClick={() => setChatType('dialogs')} className={chatType === 'dialogs' ? 'active' : ''}>
                    {currentLanguage.keys?.dialogs}
                </button>
                <button onClick={() => setChatType('groupchats')} className={chatType === 'groupchats' ? 'active' : ''}>
                    {currentLanguage.keys?.groupchats}
                </button>
            </div>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default Selector