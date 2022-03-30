// global dependencies
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
// recoil atoms
import { chatTypeState } from '../../../recoil/SelectorAtom.js'
// components
import Search from '../../Search/Search.js'
import Selector from '../../Selector/Selector.js'
import SearchResults from '../../SearchResults/SearchResults.js'
// libs
import { customFetch } from '../../../libs/customFetch';

// chats page
function Chats(props) {

    const chatType = useRecoilValue(chatTypeState)
    const [chats, setChats] = useState([])

    useEffect(() => {
        customFetch(`/api/chats-get/${chatType}`, 'POST')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            if (data) {
                setChats(data)
            }
        })
    }, [chatType])
    

    return (
        <div className="page chatsPage">
            <Search/>
            <div className="pageRow">
                <Selector type='chats'/>
                <Link to='/new-groupchat'>new groupchat</Link>
            </div>
            <SearchResults searchResults={chats} type='chats'/>
        </div>
    )
}

export default Chats