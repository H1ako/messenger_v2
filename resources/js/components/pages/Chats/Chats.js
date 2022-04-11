// global dependencies
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { cloneDeep } from 'lodash'
// recoil atoms
import { chatTypeState } from '../../../recoil/SelectorAtom.js'
import { searchResultChatsState } from '../../../recoil/SearchAtom.js'
import { userInfoState } from '../../../recoil/UserAtom.js'
// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'
// libs
import { customFetch } from '../../../libs/customFetch';

// chats page
function Chats(props) {
    const chatType = useRecoilValue(chatTypeState)
    const [chats, setChats] = useRecoilState(searchResultChatsState)
    const [user, setUser] = useRecoilState(userInfoState)

    useEffect(async () => {
        await customFetch(`/api/chats-get/${chatType}`, 'POST')
        .then(data => data.json())
        .then(data => {
            if (data) {
                setChats(data)
            }
        })
    }, [chatType])
    
    useEffect(async () => {
        if (!user.id) return
        
        const channel = await Echo.private(`chats.${user.id}`)
        .listen('ChatUpdate', (e) => {
            if (chatType === e.chat.chat_type || chatType === 'all') {
                setChats(state => {
                    const chatsClone = cloneDeep(state)
                    const updatedChats = chatsClone.filter((el, index) => el.id != e.chat.id)
                    e.chat.isNew = true
                    return [e.chat, ...updatedChats]
                })
            }
        })

        return () => {
            Echo.leaveChannel(channel)
        }
    }, [user])

    return (
        <div className="page chatsPage">
            <Search searchType='chats'/>
            <div className="pageRow">
                <Selector type='chats'/>
                <Link to='/new-groupchat'>new groupchat</Link>
            </div>
            <SearchResults searchResults={chats} type='chats'/>
        </div>
    )
}

export default Chats