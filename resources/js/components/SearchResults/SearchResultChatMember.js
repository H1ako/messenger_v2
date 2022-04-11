// components
import FriendActionBtns from "../FriendActionBtns/FriendActionBtns"

function SearchResultChatMember({
    friendId,
    username,
    picture,
}) {
    if (!friendId || !username) {
        return (
            <li className='searchResultUser notLoaded'>
                <span className='userInfo'>
                    <img/>
                    <h2>{username}</h2>
                </span>
                <span className="btns">
                </span>
            </li>
        )
    }

    return (
        <li className='searchResultUser'>
            <span className='userInfo'>
                <img src={picture}/>
                <h2>{username}</h2>
            </span>
            <span className="btns">
                <FriendActionBtns
                    type={'chatMember'}
                    friendId={friendId}
                />
            </span>
        </li>
    )
}

export default SearchResultChatMember