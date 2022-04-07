// global dependencies
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
// recoil atoms
import { userInfoState } from '../../recoil/UserAtom';
// libs
import { customFetch } from "../../libs/customFetch"


function SearchResultUser({
    friendId,
    username,
    picture,
    relationship,
    requestFrom
}) {
    const navigate = useNavigate()
    const userInfo = useRecoilValue(userInfoState)
    const [userRequestFrom, setUserRequestFrom] = useState(requestFrom)
    const [userRelationship, setUserRelationship] = useState(relationship)

    const removeFriend = () => {
        customFetch('/friend/remove-friend', 'POST', JSON.stringify({friendId}))
        setUserRelationship('request')
        setUserRequestFrom(friendId)
    }

    const sendRequest = () => {
        customFetch('/friend/send-request', 'POST', JSON.stringify({friendId}))
        setUserRelationship('request')
        setUserRequestFrom(userInfo.id)
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
    }

    useEffect(() => {
        setUserRelationship(relationship)
    }, [relationship])

    useEffect(() => {
        setUserRequestFrom(requestFrom)
    }, [requestFrom])

    if (!userInfo.id) {
        return (
            <li className='searchResultUser notLoaded'>
                <span className='userInfo'>
                    <img />
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                    
                </span>
            </li>
        )
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

    else if (userRelationship === 'no') {
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

    else if (userRelationship === 'request' && userRequestFrom !== userInfo.id) {
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

    else if (userRelationship === 'request' && userRequestFrom === userInfo.id) {
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

    else return (
        <div className="error">error</div>
    )
}

export default SearchResultUser