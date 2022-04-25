// styles
import './NewGroupchat.scss'
// global dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
// recoil atoms
import { searchResultChatMembersState } from '../../../recoil/SearchAtom'
import { newChatMembersIdsState, newChatPictureFileState } from '../../../recoil/NewChatAtom'
import { currentLanguageAtom } from '../../../recoil/LanguageAtom'
// components
import Search from '../../Search/Search.js'
import SearchResults from '../../SearchResults/SearchResults.js'
import UploadPicture from '../../UploadPicture/UploadPicture.js'

// for creating new chat
function NewGroupchat() {
    const currentLanguage = useRecoilValue(currentLanguageAtom)
    const navigate = useNavigate()
    const [chatName, setChatName] = useState('')
    const [users, setUsers] = useRecoilState(searchResultChatMembersState)
    const [chatMembers, setChatMembers] = useRecoilState(newChatMembersIdsState)
    const [pictureFile, setPictureFile] = useRecoilState(newChatPictureFileState)

    const makeNewChat = () => {
        const newChatData = new FormData()
        if (pictureFile) newChatData.append('picture', pictureFile)
        newChatData.append('name', chatName)
        newChatData.append('chatMembers', chatMembers)

        fetch('/new-groupchat', {
            method: "POST",
            headers: {
                'X-CSRF-Token': document.querySelector('meta[name="_token"]').getAttribute('content'),
                // "Content-Type": "multipart/form-data",
                "Accept": 'application/json;charset=utf-8',
                "type": "formData"
            },
            body: newChatData
        })
        .then(response => response.json())
        .then((response) => {
            if (response.error) {
                console.log(response.error)
                return
            }
            if (response.url) {
                navigate(response.url)
                setPictureFile('')
            }
        })
    }
    
    return (
        <div className="page newGroupchatPage">
            <div className="mainInfo">
                <UploadPicture recoilState={newChatPictureFileState} />
                <input type="text" placeholder={currentLanguage.keys?.chatName} value={chatName} onChange={e => setChatName(e.target.value)} />
            </div>
            <Search searchType='friends'/>
            <SearchResults searchResults={users} type='chatMembers' />
            <button onClick={makeNewChat}>{currentLanguage.keys?.ok}</button>
        </div>
    )
}

export default NewGroupchat