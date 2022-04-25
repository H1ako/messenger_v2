// styles
import './FriendActionBtns.scss'
// global dependencies
import { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// recoil atoms
import { newChatMembersIdsState } from '../../recoil/NewChatAtom'
import { currentLanguageAtom } from '../../recoil/LanguageAtom'
// libs
import { customFetch } from '../../libs/customFetch'

function FriendActionBtns({ friendId, userId, requestFrom, relationship, type='friend' }) {
    const currentLanguage = useRecoilValue(currentLanguageAtom)
    const [userRequestFrom, setUserRequestFrom] = useState(requestFrom)
    const [userRelationship, setUserRelationship] = useState(relationship)
    const [chatMembers, setChatMembers] = useRecoilState(newChatMembersIdsState)

    const handleChange = () => {
        if (chatMembers.includes(friendId)) {
            const arrayWithoutUserId = [...chatMembers].filter(el => el != friendId)
            setChatMembers(arrayWithoutUserId)
            return
        }
        setChatMembers([...chatMembers, friendId])
    }

    const removeFriend = () => {
        customFetch('/friend/remove-friend', 'POST', JSON.stringify({friendId}))
        setUserRelationship('request')
        setUserRequestFrom(friendId)
    }

    const sendRequest = () => {
        customFetch('/friend/send-request', 'POST', JSON.stringify({friendId}))
        setUserRelationship('request')
        setUserRequestFrom(userId)
    }

    const acceptRequest = () => {
        customFetch('/friend/accept-request', 'POST', JSON.stringify({friendId}))
        setUserRelationship('friend')
    }

    const declineRequest = () => {
        customFetch('/friend/decline-friend', 'POST', JSON.stringify({friendId}))
        setUserRelationship('no')
    }

    const cancelRequest = () => {
        customFetch('/friend/cancel-request', 'POST', JSON.stringify({friendId}))
        setUserRelationship('no')
    }

    useEffect(() => {
        setUserRelationship(relationship)
    }, [relationship])

    useEffect(() => {
        setUserRequestFrom(requestFrom)
    }, [requestFrom])

    if (type === 'chatMember') {
        return (
            <div className="friendActionBtns">
                <input checked={chatMembers.includes(friendId) ? true : false} onChange={handleChange} type="checkbox" id={`user-${friendId}`} />
                <label htmlFor={`user-${friendId}`} />
            </div>
        )
    }
    
    if (userRelationship === 'friend') {
        return (
            <div className="friendActionBtns">
                <button onClick={removeFriend} className='btnRemove'>{currentLanguage.keys?.remove}</button>
            </div>
        )
    }

    else if (userRelationship === 'no') {
        return (
            <div className="friendActionBtns">
                <button onClick={sendRequest} className='btnAdd'>{currentLanguage.keys?.add}</button>
            </div>
        )
    }

    else if (userRelationship === 'request' && userRequestFrom !== userId) {
        return (
            <div className="friendActionBtns">
                <button onClick={acceptRequest} className='btnAccept'>{currentLanguage.keys?.accept}</button>
                <button onClick={declineRequest} className='btnDecline'>{currentLanguage.keys?.decline}</button>
            </div>
        )
    }

    else if (userRelationship === 'request' && userRequestFrom === userId) {
        return (
            <div className="friendActionBtns">
                <button onClick={cancelRequest} className='btnCancel'>{currentLanguage.keys?.cancel}</button>
            </div>
        )
    }

    else return (
        <div className="error">error</div>
    )
}

export default FriendActionBtns