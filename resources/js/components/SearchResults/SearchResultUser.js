// global dependencies
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// libs
import { customFetch } from "../../libs/customFetch"

function SearchResultUser({
    userId,
    friendId,
    username,
    picture,
    relationship,
    requestFrom
}) {
    const navigate = useNavigate();
    const [userRequestFrom, setUserRequestFrom] = useState(requestFrom)
    const [userRelationship, setUserRelationship] = useState(relationship)

    const removeFriend = () => {
        customFetch('/friend/remove-friend', 'POST', JSON.stringify({friendId}))
        .then(data => data.json())
        setUserRelationship('request')
        setUserRequestFrom(friendId)
    }

    const sendRequest = () => {
        customFetch('/friend/send-request', 'POST', JSON.stringify({friendId}))
        .then(data => data.json())
        setUserRelationship('request')
        setUserRequestFrom(userId)
    }

    const acceptRequest = () => {
        customFetch('/friend/accept-request', 'POST', JSON.stringify({friendId}))
        .then(data => data.json())
        setUserRelationship('friend')
    }

    const declineRequest = () => {
        customFetch('/friend/decline-friend', 'POST', JSON.stringify({friendId}))
        .then(data => data.json())
        setUserRelationship('no')
    }

    const cancelRequest = () => {
        customFetch('/friend/cancel-request', 'POST', JSON.stringify({friendId}))
        .then(data => data.json())
        setUserRelationship('no')
    }

    const goToMessages = () => {
        customFetch(`/chat/check/${friendId}`, 'POST')
        .then(data => data.json())
        .then(data => {
            if (data.error) {
                return console.log(data.error)
            }

            if (data.url) {
                navigate(data.url)
            }
        })
        setUserRelationship('no')
    }
    
    if (userRelationship === 'friend') {
        return (
            <li className='searchResultUser'>
                <span onClick={goToMessages} className='userInfo'>
                    <img src={picture}/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button onClick={removeFriend} className='btnRemove'>remove</button>
                </span>
            </li>
        )
    }

    if (userRelationship === 'no') {
        return (
            <li className='searchResultUser'>
                <span onClick={goToMessages} className='userInfo'>
                    <img src={picture}/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button onClick={sendRequest} className='btnAdd'>add</button>
                </span>
            </li>
        )
    }

    if (userRelationship === 'request' && userRequestFrom !== userId) {
        return (
            <li className='searchResultUser'>
                <span onClick={goToMessages} className='userInfo'>
                    <img src={picture}/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button onClick={acceptRequest} className='btnAccept'>accept</button>
                    <button onClick={declineRequest} className='btnDecline'>decline</button>
                </span>
            </li>
        )
    }

    if (userRelationship === 'request' && userRequestFrom === userId) {
        return (
            <li className='searchResultUser'>
                <span onClick={goToMessages} className='userInfo'>
                    <img src={picture}/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    <button onClick={cancelRequest} className='btnCancel'>cancel</button>
                </span>
            </li>
        )
    }

    return (
        <div className="error">error</div>
    )
}

export default SearchResultUser