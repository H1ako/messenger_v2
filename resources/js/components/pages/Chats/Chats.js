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
    const user = useRecoilValue(userInfoState)

    useEffect(() => {
        customFetch(`/api/chats-get/${chatType}`, 'POST')
        .then(data => data.json())
        .then(data => {
            if (data) {
                setChats(data)
            }
        })
    }, [chatType])
    
    useEffect(() => {
        if (!user.id) return
        Echo.private(`chats.${user.id}`)
        .listen('ChatUpdate', (e) => {
            if (chatType === e.chat.chat_type || chatType === 'all') {
                const updatedChats = cloneDeep(chats)

                updatedChats.map(el => {
                    if (el.id == e.chat.id) {
                        el.last_message = e.chat?.last_message
                        el.last_message_sender = e.chat?.last_message_sender
                        el.updated_at = e.chat?.updated_at
                        el.created_at = e.chat?.created_at
                        el.status = e.chat?.status
                        el.name = e.chat?.name
                        el.picture = e.chat?.picture
                    }
                })
                setChats(updatedChats)
            }
        })
    }, [user.id])

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