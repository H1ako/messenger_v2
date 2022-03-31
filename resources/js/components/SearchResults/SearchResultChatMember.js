function SearchResultChatMember({
    userId,
    username,
    picture,
}) {

    return (
        <li className='searchResultUser'>
            <span className='userInfo'>
                <img src={picture} alt="user pic"/>
                <h2>{username}</h2>
            </span>
            <span className="btns">
                <input type="checkbox" id={`user-${userId}`} />
                <label htmlFor={`user-${userId}`} />
            </span>
        </li>
    )
}

export default SearchResultChatMember