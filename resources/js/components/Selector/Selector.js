// styles
import './Selector.scss'
// global dependencies
import { useRecoilState } from 'recoil'
// recoil atoms
import { chatTypeState, userTypeState } from '../../recoil/SelectorAtom'

// home page
function Selector({type}) {

    const [chatType, setChatType] = useRecoilState(chatTypeState)
    const [userType, setUserType] = useRecoilState(userTypeState)

    if (type === 'users') {
        return (
            <div className="selector">
                <button onClick={() => setUserType('all')} className={userType === 'all' ? 'active' : ''}>
                    all
                </button>
                <button onClick={() => setUserType('friends')} className={userType === 'friends' ? 'active' : ''}>
                    friends
                </button>
                <button onClick={() => setUserType('requests')} className={userType === 'requests' ? 'active' : ''}>
                    requests
                </button>
            </div>
        )
    }
    
    if (type === 'chats') {
        return (
            <div className="selector">
                <button onClick={() => setChatType('all')} className={chatType === 'all' ? 'active' : ''}>
                    all
                </button>
                <button onClick={() => setChatType('dialogs')} className={chatType === 'dialogs' ? 'active' : ''}>
                    dialogs
                </button>
                <button onClick={() => setChatType('groupchats')} className={chatType === 'groupchats' ? 'active' : ''}>
                    groupchats
                </button>
            </div>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default Selector